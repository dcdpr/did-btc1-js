import { KeyBytes, Logger, Maybe } from '@did-btc1/common';
import { SchnorrKeyPair } from '@did-btc1/keypair';
import { Event, Filter, nip44 } from 'nostr-tools';
import { SimplePool, } from 'nostr-tools/pool';
import { Btc1Identifier } from '../../../../utils/identifier.js';
import { SUBSCRIBE_ACCEPT } from '../messages/constants.js';
import { CommunicationService, MessageHandler, ServiceAdapter, ServiceAdapterConfig } from './service.js';
import { AggregateBeaconMessage, AggregateBeaconMessageType, KeyGenMessageType } from '../messages/index.js';
import { nonceGen } from '@scure/btc-signer/musig2';

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
    this.pool.subscribe(this.config.relays, { kinds: [1] } as Filter, {
      onclose : (reasons: string[]) => console.log('Subscription to kind 1 closed for reasons:', reasons),
      onevent : this.onEvent.bind(this),
      oneose  : () => { Logger.info('EOSE kinds 1');}
    });
    this.pool.subscribe(this.config.relays, { kinds: [1059] } as Filter, {
      onclose : (reasons: string[]) => console.log('Subscription to kind 1059 closed for reasons:', reasons),
      onevent : this.onEvent.bind(this),
      oneose  : () => { Logger.info('EOSE kinds 1059');}
    });
    return this;
  }

  /**
   * Handles incoming Nostr events and dispatches them to the appropriate message handler.
   * @param {Event} event The Nostr event received from the relay.
   */
  private async onEvent(event: Event): Promise<void> {
    // Dispatch the event to the registered handler
    const titleTag = event.tags.find(([tag, _]) => tag === 'title');
    if(!titleTag) {
      Logger.warn(`Event ${event.id} does not have a title tag, skipping handler dispatch.`);
      return;
    }

    if(!AggregateBeaconMessage.isValidType(titleTag[1])) {
      Logger.warn(`Event ${event.id} has an invalid title tag: ${titleTag[1]}, skipping handler dispatch.`);
      return;
    }

    const handler = this.handlers.get(titleTag[1]);
    if (!handler) {
      Logger.warn(`No handler found for message type: ${titleTag[1]}`);
      return;
    }

    await handler(event);
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
  public async sendMessage(
    message: Maybe<AggregateBeaconMessageType>,
    recipient: string,
    sender: string
  ): Promise<void | Promise<string>[]> {
    Logger.info(`Sending message to ${recipient} from ${sender}:`, message);

    if(message.type === SUBSCRIBE_ACCEPT) {
      this.config.coordinatorDids.push(recipient);
    }

    if(AggregateBeaconMessage.isKeyGenMessageType(message.type)) {
      return this.pool?.publish(this.config.relays, {
        kind : 1,
        tags : [
          ['p', recipient],
          ['p', sender],
          ['title', message.type]
        ],
        content : JSON.stringify(message)
      } as Event);
    }

    if(AggregateBeaconMessage.isSignMessageType(message.type)) {
      const { publicKey, secretKey } = SchnorrKeyPair.generate();
      const content = nip44.encrypt(JSON.stringify(message), secretKey.bytes, nonceGen(publicKey.x).public);
      const event = {
        content,
        kind : 1059,
        tags : [
          ['p', recipient],
          ['p', sender],
          ['title', message.type]
        ],
      } as Event;
      return this.pool?.publish(this.config.relays, event);
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