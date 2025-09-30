import { useEffect, useRef, useState, useCallback } from "react";

import { supportTicketWebSocketService } from "@/lib/websocket/supportTicketWebSocketService";
import {
  supportsService,
  type TicketMessageItem,
  type TicketMessagesResponse,
} from "@/lib/api/supports";

export const useSupportTicketWebSocket = (
  ticketId: number | null,
  accessToken: string | null,
) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<TicketMessageItem[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const messageHandlers = useRef<Set<(msg: TicketMessageItem) => void>>(
    new Set(),
  );
  const hasEverConnected = useRef(false);

  // Add a message handler
  const addMessageHandler = useCallback(
    (handler: (msg: TicketMessageItem) => void) => {
      messageHandlers.current.add(handler);

      return () => {
        messageHandlers.current.delete(handler);
      };
    },
    [],
  );

  // Handle incoming messages
  useEffect(() => {
    const handleMessage = (incomingRaw: TicketMessageItem) => {
      // Coerce id to number if possible to avoid  "1" vs 1 mismatches
      const incoming: TicketMessageItem = {
        ...incomingRaw,
        id: Number((incomingRaw as any).id ?? incomingRaw.id),
      } as TicketMessageItem;

      setMessages((prev) => {
        // 1) Match by exact id
        const idxById = prev.findIndex(
          (m) => Number(m.id) === Number(incoming.id),
        );

        if (idxById !== -1) {
          // Optionally merge fields
          const copy = [...prev];

          copy[idxById] = { ...copy[idxById], ...incoming };

          return copy;
        }

        // 2) Fuzzy match by signature: ticket + sender.id + normalized message + time window
        const inTimeWindow = (a: string, b: string) => {
          const da = new Date(a).getTime();
          const db = new Date(b).getTime();

          return Math.abs(da - db) <= 60000; // 60s window to account for server/WS order
        };
        const norm = (s: string | null | undefined) => (s ?? "").trim();

        const idxBySig = prev.findIndex(
          (m) =>
            m.ticket === incoming.ticket &&
            m.sender?.id === incoming.sender?.id &&
            norm(m.message) === norm(incoming.message) &&
            inTimeWindow(m.created_at, incoming.created_at),
        );

        if (idxBySig !== -1) {
          const copy = [...prev];

          copy[idxBySig] = { ...copy[idxBySig], ...incoming };

          return copy;
        }

        // 3) Not found — append
        return [...prev, incoming];
      });
      messageHandlers.current.forEach((handler) => handler(incoming));
    };

    const cleanup =
      supportTicketWebSocketService.addMessageHandler(handleMessage);

    return () => cleanup();
  }, []);

  // Handle connection state changes
  useEffect(() => {
    const cleanup = supportTicketWebSocketService.onConnectionChange(
      (connected) => {
        setIsConnected(connected);
        if (connected) {
          hasEverConnected.current = true;
          setError(null);
        } else {
          // Only surface a disconnect message if we had a successful connection before.
          if (hasEverConnected.current) {
            setError(new Error("Connection lost. Trying to reconnect..."));
          }
        }
      },
    );

    return () => cleanup();
  }, []);

  // Reset on ticket change and ensure disconnect
  useEffect(() => {
    setMessages([]);
    // Clear any prior error and mark as not yet connected for the new ticket
    setError(null);
    hasEverConnected.current = false;
    if (ticketId && accessToken) {
      supportTicketWebSocketService.disconnect();
    }

    return () => {
      supportTicketWebSocketService.disconnect();
    };
  }, [ticketId, accessToken]);

  // Fetch initial messages and connect
  useEffect(() => {
    if (!ticketId || !accessToken) return;

    const fetchInitial = async () => {
      try {
        const response: TicketMessagesResponse =
          await supportsService.getTicketMessages(ticketId);

        setMessages(response.results);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to load support messages"),
        );
      }
    };

    const connectWs = async () => {
      try {
        await supportTicketWebSocketService.connect(ticketId, accessToken);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to connect to support ticket chat"),
        );
      }
    };

    fetchInitial()
      .then(connectWs)
      .catch(() => {});

    return () => {
      supportTicketWebSocketService.disconnect();
    };
  }, [ticketId, accessToken]);

  // Add a new message to local state (optimistic update)
  const addLocalMessage = useCallback((message: TicketMessageItem) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  // Replace a local message (by temp id) with the saved server message
  const replaceLocalMessage = useCallback(
    (tempId: number, newMessage: TicketMessageItem) => {
      setMessages((prev) => {
        const idxTemp = prev.findIndex((m) => m.id === tempId);
        const savedId = Number(newMessage.id);

        if (idxTemp !== -1) {
          // Replace temp, and remove any other entry that already has the saved id
          const next = prev
            .filter((_, i) => i !== idxTemp)
            .filter((m) => Number(m.id) !== savedId);

          return [...next, newMessage];
        }
        // If temp not found, ensure only one instance with saved id exists
        const withoutSavedDupes = prev.filter((m) => Number(m.id) !== savedId);

        return [...withoutSavedDupes, newMessage];
      });
    },
    [],
  );

  return {
    isConnected,
    messages,
    error,
    addMessageHandler,
    addLocalMessage,
    replaceLocalMessage,
  } as const;
};
