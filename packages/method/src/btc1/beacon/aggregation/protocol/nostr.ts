import { KeyPair, PrivateKey } from '@did-btc1/key-pair';
import { Filter, generateSecretKey, getPublicKey } from 'nostr-tools';
import { SimplePool, } from 'nostr-tools/pool';
import { Btc1Identifier } from '../../../../utils/identifier.js';
import { ProtocolService } from './service.js';

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
  public name: string = 'nostr';
  private config: NostrAdapterConfig;
  private handlers: Map<string, (msg: any) => Promise<void>> = new Map();

  constructor(config: NostrAdapterConfig = { keys: {}, components: {}, relays: ['wss://relay.damus.io'] }) {
    this.config = config;
    const keys = KeyPair.generate();
    this.config.keys = {
      secret : keys.privateKey.bytes,
      public : keys.publicKey.bytes
    };
    console.log('NostrAdapter', this.config);
    this.config.did = config.did || Btc1Identifier.encode({
      idType       : config.components.idType || 'KEY',
      version      : config.components.version || 1,
      network      : config.components.network || 'signet',
      genesisBytes : this.config.keys.public!
    });
  }

  async start(): Promise<void> {
    const pool = new SimplePool();
    pool.subscribe(this.config.relays, { kinds: [17]} as Filter, {
      onclose : (reasons: string[]) => console.log('Subscription closed for reasons:', reasons),
      onevent : async (event: any) => {
        console.log('Received event:', event);
      }
    });
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
   * Generates a Nostr identity using the PrivateKey and Btc1Identifier classes.
   * @returns {string} A Btc1 DID used for communication over the nostr protocol
   */
  async generateIdentity(): Promise<string> {
    this.config.keys.secret = PrivateKey.generate();
    this.config.keys.public = PrivateKey.getPublicKey(this.config.keys.secret);
    this.config.did = Btc1Identifier.encode(
      {
        idType       : this.config.components.idType  || 'KEY',
        version      : this.config.components.version || 1,
        network      : this.config.components.network || 'signet',
        genesisBytes : this.config.keys.public
      }
    );
    return this.config.did;
  }
}
