import { Message } from '@/lib/api/chat';

type MessageHandler = (message: Message) => void;
type ConnectionChangeHandler = (isConnected: boolean) => void;

export class WebSocketService {
  private static instance: WebSocketService;
  private socket: WebSocket | null = null;
  private messageHandlers: Set<MessageHandler> = new Set();
  private connectionChangeHandlers: Set<ConnectionChangeHandler> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private maxReconnectDelay = 30000; // Max 30 seconds
  private connectionPromise: Promise<void> | null = null;
  private isConnected = false;
  private chatId: number | null = null;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(chatId: number, accessToken: string): Promise<void> {
    console.log('WebSocketService.connect called with chatId:', chatId);
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.chatId = chatId;
    this.accessToken = accessToken;

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        // Use the same base URL as the API but replace http(s) with ws(s)
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
        const wsProtocol = apiBaseUrl.startsWith('https') ? 'wss:' : 'ws:';
        const baseUrl = apiBaseUrl.replace(/^https?:\/\//, '');
        const wsUrl = `${wsProtocol}//${baseUrl.replace(/\/$/, '')}/ws/chats/${chatId}/?token=${accessToken}`;
        
        console.log('Creating new WebSocket connection to:', wsUrl);
        this.socket = new WebSocket(wsUrl);

        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onclose = this.onClose;
        this.socket.onerror = this.onError;
      } catch (error) {
        console.error('Error creating WebSocket connection:', error);
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  private onOpen = () => {
    console.log('WebSocket connected successfully');
    console.log('WebSocket URL:', this.socket?.url);
    console.log('WebSocket readyState:', this.socket?.readyState);
    this.reconnectAttempts = 0; // Reset retry count on successful connection
    this.isConnected = true;
    this.notifyConnectionChange(true);
    // Resolve the connection promise
    if (this.connectionPromise) {
      const resolve = (this.connectionPromise as any).resolve;
      if (resolve) resolve();
    }
  };

  private onMessage = (event: MessageEvent) => {
    console.log('Raw WebSocket message received:', event.data);
    try {
      const message = JSON.parse(event.data);
      console.log('Parsed WebSocket message:', message);
      this.notifyMessageHandlers(message as Message);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  private onClose = () => {
    console.log('WebSocket connection closed');
    this.isConnected = false;
    this.notifyConnectionChange(false);
    this.attemptReconnect();
    this.connectionPromise = null;
  };

  private onError = (error: Event) => {
    this.socket?.close();
  };

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts || !this.chatId || !this.accessToken) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1), this.maxReconnectDelay);
    
    console.log(`Attempting to reconnect in ${delay}ms...`);
    
    setTimeout(() => {
      if (this.chatId && this.accessToken) {
        this.connect(this.chatId, this.accessToken).catch(console.error);
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

  private notifyMessageHandlers(message: Message) {
    this.messageHandlers.forEach(handler => handler(message));
  }

  private notifyConnectionChange(isConnected: boolean) {
    this.connectionChangeHandlers.forEach(handler => handler(isConnected));
  }

  public get connected(): boolean {
    return this.isConnected;
  }
}

export const webSocketService = WebSocketService.getInstance();
