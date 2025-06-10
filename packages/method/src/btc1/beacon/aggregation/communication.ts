export interface CommunicationService {
  start(): Promise<void>;
  registerHandler(messageType: string, handler: (msg: any) => Promise<void>): void;
  sendMessage(message: object, recipient: string, sender: string): Promise<void>;
  generateIdentity(): Promise<string>;
}