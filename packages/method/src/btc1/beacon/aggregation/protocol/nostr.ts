import { Btc1Identifier } from '../../../../utils/identifier.js';
import { ProtocolService } from './service.js';
import { Relay, generateSecretKey, getPublicKey } from 'nostr-tools';

export interface NostrAdapterConfig {
  keys: {
    secret?: Uint8Array;
    public?: Uint8Array;
  };
  did?: string;
  components: {
    idType?: string;
    version?: number;
    network?: string;
  };
  relays: string[];
  [key: string]: any;
}

export class NostrAdapter implements ProtocolService {
  public name: string = 'Nostr';
  private config: NostrAdapterConfig;
  private handlers: Map<string, (msg: any) => Promise<void>> = new Map();

  constructor(config: NostrAdapterConfig = { keys: {}, components: {}, relays: ['wss://relay.damus.io'] }) {
    this.config = config;
    this.config.keys.secret = config.keys.secret || generateSecretKey();
    this.config.keys.public = config.keys.public || Buffer.fromHex(getPublicKey(this.config.keys.secret));
    this.config.did = config.did || Btc1Identifier.encode({
      idType       : config.components.idType || 'KEY',
      version      : config.components.version || 1,
      network      : config.components.network || 'signet',
      genesisBytes : this.config.keys.public
    });
  }

  async start(): Promise<void> {
    this.config.relays
      .map(Relay.connect)
      .map((connection: any) =>  console.log('Connected to relay:', connection));
  }

  registerHandler(messageType: string, handler: (msg: any) => Promise<void>): void {
    this.handlers.set(messageType, handler);
  }

  /**
   * Sends a message to a recipient using the Nostr protocol.
   * This method is a placeholder and should be implemented with actual Nostr message sending logic.
   * @param message
   * @param recipient
   * @param sender
   */
  async sendMessage(message: object, recipient: string, sender: string): Promise<void> {
    // TODO: Implement message sending logic via Nostr
    console.log(`Sending message to ${recipient} from ${sender}:`, message);
  }

  /**
   * Generates a Nostr identity using the Btc1Identifier utility.
   * This identity will be used as the DID for the protocol.
   * @returns A Nostr identity (DID) for the protocol
   */
  async generateIdentity(): Promise<string> {
    const identity = Btc1Identifier.generate();
    console.log(`Generated Nostr identity: ${identity.did}`);
    return identity.did;
  }
}
