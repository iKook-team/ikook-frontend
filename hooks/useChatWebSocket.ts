import { useEffect, useRef, useState, useCallback } from "react";

import { webSocketService } from "@/lib/websocket/websocketService";
import { Message, Message as MessageType } from "@/lib/api/chat";
import { chatService } from "@/lib/api/chat";

export const useChatWebSocket = (
  chatId: number | null,
  accessToken: string | null,
) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const messageHandlers = useRef<Set<(msg: MessageType) => void>>(new Set());

  // Add a message handler
  const addMessageHandler = useCallback(
    (handler: (msg: MessageType) => void) => {
      messageHandlers.current.add(handler);

      return () => {
        messageHandlers.current.delete(handler);
      };
    },
    [],
  );

  // Handle incoming messages
  useEffect(() => {
    const handleMessage = (message: Message) => {
      console.log("Received WebSocket message:", message);
      setMessages((prev) => {
        // Check if message already exists
        const messageExists = prev.some((msg) => msg.id === message.id);

        if (messageExists) {
          console.log("Message already exists, skipping:", message.id);

          return prev; // Skip if message already exists
        }
        const updatedMessages = [...prev, message];

        console.log(
          "Updated messages after WebSocket message:",
          updatedMessages,
        );

        return updatedMessages;
      });
      // Call all registered message handlers
      messageHandlers.current.forEach((handler) => handler(message));
    };

    console.log("Setting up WebSocket message handler");
    const cleanup = webSocketService.addMessageHandler(handleMessage);

    return () => {
      console.log("Cleaning up WebSocket message handler");
      cleanup();
    };
  }, []);

  // Handle connection state changes
  useEffect(() => {
    const handleConnectionChange = (connected: boolean) => {
      setIsConnected(connected);
      if (!connected) {
        setError(new Error("Disconnected from chat"));
      } else {
        setError(null);
      }
    };

    const cleanup = webSocketService.onConnectionChange(handleConnectionChange);

    return () => {
      cleanup();
    };
  }, []);

  // Clear messages and handle WebSocket when chatId changes
  useEffect(() => {
    console.log("Chat ID changed to:", chatId);
    setMessages([]);

    if (chatId && accessToken) {
      // Disconnect existing connection
      webSocketService.disconnect();
    }

    return () => {
      // Clean up on unmount or before next effect runs
      webSocketService.disconnect();
    };
  }, [chatId, accessToken]);

  // Fetch initial messages and connect to WebSocket when chatId or token changes
  useEffect(() => {
    if (!chatId || !accessToken) {
      console.log("No chatId or accessToken, skipping WebSocket setup");

      return;
    }

    console.log("Setting up WebSocket for chat:", chatId);

    const fetchInitialMessages = async () => {
      console.log("Fetching initial messages for chat:", chatId);
      try {
        const response = await chatService.getMessages(chatId);

        console.log("Initial messages received:", response.results);

        // Store initial messages, ensuring no duplicates
        setMessages((prev) => {
          const existingIds = new Set(prev.map((msg) => msg.id));
          const newMessages = response.results.filter(
            (msg) => !existingIds.has(msg.id),
          );
          const updatedMessages = [...prev, ...newMessages];

          console.log("Updated messages after initial fetch:", updatedMessages);

          return updatedMessages;
        });
      } catch (err) {
        console.error("Failed to fetch initial messages:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load messages"),
        );
      }
    };

    const connectWebSocket = async () => {
      console.log("Connecting to WebSocket...");
      try {
        await webSocketService.connect(chatId, accessToken);
        console.log("WebSocket connected successfully");
        setError(null);
      } catch (err) {
        console.error("Failed to connect to WebSocket:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to connect to chat"),
        );
      }
    };

    // Fetch initial messages first, then connect to WebSocket
    console.log("Starting message fetch and WebSocket setup...");
    fetchInitialMessages().then(connectWebSocket).catch(console.error);

    return () => {
      console.log("Cleaning up WebSocket connection for chat:", chatId);
      webSocketService.disconnect();
    };
  }, [chatId, accessToken]);

  // Add a new message to the local state
  const addLocalMessage = useCallback((message: MessageType) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  return {
    isConnected,
    messages,
    error,
    addMessageHandler,
    addLocalMessage,
  };
};
