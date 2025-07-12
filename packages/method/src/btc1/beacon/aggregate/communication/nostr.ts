import { KeyBytes, Maybe } from '@did-btc1/common';
import { SchnorrKeyPair } from '@did-btc1/keypair';
import { Event, Filter, nip44 } from 'nostr-tools';
import { SimplePool, } from 'nostr-tools/pool';
import { Btc1Identifier } from '../../../../utils/identifier.js';
import { CommunicationService, MessageHandler, ServiceAdapter, ServiceAdapterConfig } from './service.js';
import { SUBSCRIBE, SUBSCRIBE_ACCEPT } from '../messages/constants.js';
import { AggregateBeaconMessageType } from '../../types.js';

export type NostrKeys = {
  public: KeyBytes;
  secret: KeyBytes;
}
export interface NostrConfig extends Record<string, any> {
  relays: string[];
  keys: NostrKeys;
  components: {
    idType: string;
    version: number;
    network: string;
  };
  did: string;
}

export class NostrAdapterConfig implements NostrConfig {
  relays: string[];
  keys: NostrKeys;
  components: {
    idType: string;
    version: number;
    network: string;
  };
  did: string;
  coordinatorDids: string[];

  constructor(config?: Partial<NostrConfig>) {
    this.relays = config?.relays || ['wss://relay.damus.io'];
    this.keys = config?.keys || SchnorrKeyPair.generate().raw as NostrKeys,
    this.components = config?.components || {
      version : 1,
      idType  : 'KEY',
      network : 'signet'
    };
    this.did = config?.did || Btc1Identifier.encode(
      {
        ...this.components,
        genesisBytes : this.keys.public
      }
    );
    this.coordinatorDids = config?.coordinatorDids || [];
  }
}

/**
 * NostrAdapter implements the CommunicationService interface for Nostr protocol.
 * It handles message sending, receiving, and identity generation using Nostr relays.
 * @class NostrAdapter
 * @implements {CommunicationService}
 * @type {NostrAdapter}
 */
export class NostrAdapter implements CommunicationService {
  /**
   * The name of the communication service.
   * @type {string}
   */
  public name: string = 'nostr';

  /**
   * The configuration for the Nostr adapter.
   * @type {NostrAdapterConfig}
   */
  private config: NostrAdapterConfig;

  /**
   * A map of message handlers for different message types.
   * @type {Map<string, MessageHandler>}
   */
  private handlers: Map<string, MessageHandler> = new Map();

  /**
   * The SimplePool instance for managing Nostr subscriptions.
   * @type {SimplePool}
   */
  public pool?: SimplePool;

  /**
   * Constructs a new NostrAdapter instance with the provided configuration.
   * @param {NostrAdapterConfig} [config] The configuration for the Nostr adapter.
   */
  constructor(config: NostrAdapterConfig = {} as NostrAdapterConfig) {
    this.config = new NostrAdapterConfig(config);
  }

  /**
   * Starts the Nostr communication service by subscribing to relays.
   * @returns {ServiceAdapter<NostrAdapter>} Returns the NostrAdapter instance for method chaining.
   */
  public start(): ServiceAdapter<NostrAdapter> {
    this.pool = new SimplePool();
    this.pool.subscribe(this.config.relays, { kinds: [1, 1059] } as Filter, {
      onclose : (reasons: string[]) => console.log('Subscription closed for reasons:', reasons),
      onevent : async (event: Event) => {
        // const content = nip44.decrypt(event.content, this.config.keys.secret);
        // if(content.includes(SUBSCRIBE)) {
        //   this.handlers.get(SUBSCRIBE)?.(content);
        // } else {
        //   console.log(`Received message of unknown type from ${event.pubkey}:`, event.content);
        // }
        // if(event.tags.some(tag => tag[0] === 'p' && this.config.did.includes(tag[1]))) {
        //   console.log(`Received event from ${event.pubkey}:`, event);
        // }
        if(event.tags.length > 1) {
          console.log(`Received kind 1 event with ${event.tags.length} tags:`, event);
        }
      }
    });
    return this;
  }

  /**
   * Registers a message handler for a specific message type.
   * @param {string} messageType The type of message to handle.
   * @param {MessageHandler} handler The handler function that processes the message.
   */
  public registerMessageHandler(messageType: string, handler: MessageHandler): void {
    this.handlers.set(messageType, handler);
  }

  /**
   * Sends a message to a recipient using the Nostr protocol.
   * This method is a placeholder and should be implemented with actual Nostr message sending logic.
   * @param {Maybe<AggregateBeaconMessageType>} message The message to send, typically containing the content and metadata.
   * @param {string} recipient The public key or identifier of the recipient.
   * @param {string} sender The public key or identifier of the sender.
   * @returns {Promise<void>} A promise that resolves when the message is sent.
   */
  public async sendMessage(message: Maybe<AggregateBeaconMessageType>, recipient: string, sender: string): Promise<void> {
    // TODO: Implement message sending logic via Nostr
    console.log(`Sending message to ${recipient} from ${sender}:`, message);
    if(message.type === SUBSCRIBE_ACCEPT) {
      this.config.coordinatorDids.push(recipient);
    }
  }

  /**
   * Generates a Nostr identity using the SecretKey and Btc1Identifier classes.
   * @param {NostrKeys} [keys] Optional Nostr keys to use for identity generation.
   * @returns {string} A Btc1 DID used for communication over the nostr protocol
   */
  public generateIdentity(keys?: NostrKeys): ServiceAdapterConfig<NostrAdapterConfig> {
    this.config.keys = keys || SchnorrKeyPair.generate().raw as NostrKeys;
    this.config.did = Btc1Identifier.encode(
      {
        ...this.config.components,
        genesisBytes : this.config.keys.public
      }
    );
    return this.config;
  }
}