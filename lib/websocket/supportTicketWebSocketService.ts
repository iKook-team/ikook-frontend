import { TicketMessageItem } from "@/lib/api/supports";

type MessageHandler = (message: TicketMessageItem) => void;
type ConnectionChangeHandler = (isConnected: boolean) => void;

export class SupportTicketWebSocketService {
  private static instance: SupportTicketWebSocketService;
  private socket: WebSocket | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();
  private connectionChangeHandlers: Set<ConnectionChangeHandler> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private maxReconnectDelay = 30000;
  private connectionPromise: Promise<void> | null = null;
  private connectionResolve: (() => void) | null = null;
  private connectionReject: ((reason?: any) => void) | null = null;
  private isConnected = false;
  private ticketId: number | null = null;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): SupportTicketWebSocketService {
    if (!SupportTicketWebSocketService.instance) {
      SupportTicketWebSocketService.instance =
        new SupportTicketWebSocketService();
    }

    return SupportTicketWebSocketService.instance;
  }

  public connect(ticketId: number, accessToken: string): Promise<void> {
    if (this.connectionPromise) return this.connectionPromise;

    this.ticketId = ticketId;
    this.accessToken = accessToken;

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        const wsProtocol = apiBaseUrl.startsWith("https") ? "wss:" : "ws:";
        const baseUrl = apiBaseUrl
          .replace(/^https?:\/\//, "")
          .replace(/\/$/, "");
        const wsUrl = `${wsProtocol}//${baseUrl}/ws/supports/tickets/${ticketId}/?token=${accessToken}`;

        this.socket = new WebSocket(wsUrl);
        // Bind
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;

        // Store resolvers for use in lifecycle handlers
        this.connectionResolve = resolve;
        this.connectionReject = reject;
      } catch (error) {
        reject(error as any);
      }
    });

    return this.connectionPromise;
  }

  private onOpen = () => {
    this.reconnectAttempts = 0;
    this.isConnected = true;
    this.notifyConnectionChange(true);
    if (this.connectionResolve) {
      this.connectionResolve();
    }
    this.connectionResolve = null;
    this.connectionReject = null;
  };

  private onMessage = (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data) as TicketMessageItem;

      this.notifyMessageHandlers(message);
    } catch (error) {
      // Swallow parse errors in production and emit a generic system message if needed
    }
  };

  private onClose = () => {
    this.isConnected = false;
    this.notifyConnectionChange(false);
    this.attemptReconnect();
    this.connectionPromise = null;
    this.connectionResolve = null;
    this.connectionReject = null;
  };

  private onError = (_error: Event) => {
    if (this.connectionReject) {
      this.connectionReject(_error);
    }
    this.socket?.close();
  };

  private attemptReconnect() {
    if (
      this.reconnectAttempts >= this.maxReconnectAttempts ||
      !this.ticketId ||
      !this.accessToken
    ) {
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
      this.maxReconnectDelay,
    );

    setTimeout(() => {
      if (this.ticketId && this.accessToken) {
        this.connect(this.ticketId, this.accessToken).catch(() => {});
      }
    }, delay);
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
      this.isConnected = false;
      this.connectionPromise = null;
      this.notifyConnectionChange(false);
    }
  }

  public addMessageHandler(handler: MessageHandler): () => void {
    this.messageHandlers.add(handler);

    return () => this.messageHandlers.delete(handler);
  }

  public onConnectionChange(handler: ConnectionChangeHandler): () => void {
    this.connectionChangeHandlers.add(handler);

    return () => this.connectionChangeHandlers.delete(handler);
  }

  private notifyMessageHandlers(message: TicketMessageItem) {
    this.messageHandlers.forEach((handler) => handler(message));
  }

  private notifyConnectionChange(isConnected: boolean) {
    this.connectionChangeHandlers.forEach((handler) => handler(isConnected));
  }

  public get connected(): boolean {
    return this.isConnected;
  }
}

export const supportTicketWebSocketService =
  SupportTicketWebSocketService.getInstance();
