import { KeyBytes, Logger, Maybe } from '@did-btc1/common';
import { RawKeyPair, SchnorrKeyPair } from '@did-btc1/keypair';
// import { nonceGen } from '@scure/btc-signer/musig2';
import { Event, Filter, /*nip44*/ } from 'nostr-tools';
import { SimplePool, } from 'nostr-tools/pool';
import { Btc1Identifier } from '../../../../../utils/identifier.js';
import {
  /*
  BEACON_COHORT_AGGREGATED_NONCE,
  BEACON_COHORT_AUTHORIZATION_REQUEST,
  BEACON_COHORT_REQUEST_SIGNATURE,
  BEACON_COHORT_SIGNATURE_AUTHORIZATION,
  BEACON_COHORT_NONCE_CONTRIBUTION,
  */
  BEACON_COHORT_ADVERT,
  BEACON_COHORT_INVITE,
  BEACON_COHORT_OPT_IN,
  BEACON_COHORT_READY,
  BEACON_COHORT_SUBSCRIBE,
  BEACON_COHORT_SUBSCRIBE_ACCEPT
} from '../../cohort/messages/constants.js';
import { AggregateBeaconMessage, AggregateBeaconMessageType } from '../../cohort/messages/index.js';
import { CommunicationService, MessageHandler, ServiceAdapter, ServiceAdapterConfig, ServiceAdapterConfigType } from '../service.js';

/**
 * NostrKeys defines the structure for Nostr public and secret keys.
 * It is used to store the key pair for communication over the Nostr protocol.
 * @type {NostrKeys}
 */
export type NostrKeys = {
  public: KeyBytes;
  secret: KeyBytes;
}

/**
 * NostrAdapterConfig is a configuration class for the NostrAdapter.
 * It holds the necessary parameters to connect to Nostr relays and manage keys.
 * @class NostrAdapterConfig
 * @implements {ServiceAdapterConfig}
 * @type {NostrAdapterConfig}
 */
export class NostrAdapterConfig implements ServiceAdapterConfig {
  public relays: string[];
  public keys: RawKeyPair;
  public components: {
    idType: string;
    version: number;
    network: string;
  };
  public did: string;
  public coordinatorDids: string[];

  /**
   * Constructs a new NostrAdapterConfig instance.
   * @param {Partial<ServiceAdapterConfig>} [config] Optional configuration parameters to initialize the adapter.
   * @constructor
   * @type {NostrAdapterConfig}
   */
  constructor(config?: Partial<ServiceAdapterConfig>) {
    this.relays = config?.relays || ['wss://relay.damus.io'];
    this.keys = config?.keys || SchnorrKeyPair.generate().raw,
    this.components = config?.components || {
      version : 1,
      idType  : 'KEY',
      network : 'mutinynet'
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
  public config: NostrAdapterConfig;

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
      onclose : (reasons: string[]) => console.log('Subscription to kind 1 closed', reasons),
      onevent : this.onEvent.bind(this),
      oneose  : () => { Logger.info('EOSE kinds 1'); }
    });

    // this.pool.subscribe(this.config.relays, { kinds: [1059] } as Filter, {
    //   onclose : (reasons: string[]) => console.log('Subscription to kind 1059 closed for reasons:', reasons),
    //   onevent : this.onEvent.bind(this),
    //   oneose  : () => { Logger.info('EOSE kinds 1059'); }
    // });

    return this;
  }

  /**
   * Handles incoming Nostr events and dispatches them to the appropriate message handler.
   * @param {Event} event The Nostr event received from the relay.
   */
  private async onEvent(event: Event): Promise<void> {
    Logger.debug('nostr.onEvent: event.tags', event.tags);
    // Dispatch the event to the registered handler
    const [type, value] = event.tags.find(([name, _]) => AggregateBeaconMessage.isValidType(name)) ?? [];
    Logger.debug('nostr.onEvent: event.tags.find => type, value', type, value);
    if(!type && !value) {
      Logger.warn(`Event ${event.id} does not have a valid tag, skipping handler dispatch.`);
      return;
    }

    // Logger.debug('nostr.onEvent: event', event);
    Logger.debug('nostr.onEvent: event.tags', event.tags);

    if(event.kind === 1 && !AggregateBeaconMessage.isKeyGenMessageValue(value)) {
      Logger.warn(`Event ${event.id} is not a key generation message type: ${value}, skipping handler dispatch.`);
      return;
    }

    if(event.kind === 1059 && !AggregateBeaconMessage.isSignMessageValue(value)) {
      Logger.warn(`Event ${event.id} has an invalid title tag: ${value}, skipping handler dispatch.`);
      return;
    }

    const handler = this.handlers.get(value);
    if (!handler) {
      Logger.warn(`No handler found for message with tag value: ${value}`);
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

    if(message.type === BEACON_COHORT_SUBSCRIBE_ACCEPT) {
      this.config.coordinatorDids.push(recipient);
    }

    const tags = [['p', recipient], ['p', sender]];

    if(AggregateBeaconMessage.isKeyGenMessageValue(message.type)) {
      switch(message.type) {
        case BEACON_COHORT_ADVERT:
          tags.push(['BEACON_COHORT_ADVERT', message.type]);
          break;
        case BEACON_COHORT_INVITE:
          tags.push(['BEACON_COHORT_INVITE', message.type]);
          break;
        case BEACON_COHORT_OPT_IN:
          tags.push(['BEACON_COHORT_OPT_IN', message.type]);
          break;
        case BEACON_COHORT_READY:
          tags.push(['BEACON_COHORT_READY', message.type]);
          break;
        case BEACON_COHORT_SUBSCRIBE:
          tags.push(['BEACON_COHORT_SUBSCRIBE', message.type]);
          break;
        case BEACON_COHORT_SUBSCRIBE_ACCEPT:
          tags.push(['BEACON_COHORT_SUBSCRIBE_ACCEPT', message.type]);
          break;
      }
      const event = { kind: 1, tags, content: JSON.stringify(message)} as Event;
      Logger.info(`Sending message kind 1 event ...`, event);
      return this.pool?.publish(this.config.relays, event);
    }

    // if(AggregateBeaconMessage.isSignMessageValue(message.type)) {
    //   switch(message.type) {
    //     case BEACON_COHORT_REQUEST_SIGNATURE:
    //       tags.push(['BEACON_COHORT_REQUEST_SIGNATURE', message.type]);
    //       break;
    //     case BEACON_COHORT_AUTHORIZATION_REQUEST:
    //       tags.push(['BEACON_COHORT_AUTHORIZATION_REQUEST', message.type]);
    //       break;
    //     case BEACON_COHORT_NONCE_CONTRIBUTION:
    //       tags.push(['BEACON_COHORT_NONCE_CONTRIBUTION', message.type]);
    //       break;
    //     case BEACON_COHORT_AGGREGATED_NONCE:
    //       tags.push(['BEACON_COHORT_AGGREGATED_NONCE', message.type]);
    //       break;
    //     case BEACON_COHORT_SIGNATURE_AUTHORIZATION:
    //       tags.push(['BEACON_COHORT_SIGNATURE_AUTHORIZATION', message.type]);
    //       break;
    //   }
    //   const { publicKey, secretKey } = SchnorrKeyPair.generate();
    //   const content = nip44.encrypt(JSON.stringify(message), secretKey.bytes, nonceGen(publicKey.x).public);
    //   const event = { content, tags, kind: 1059 } as Event;
    //   return this.pool?.publish(this.config.relays, event);
    // }

    Logger.error(`Unsupported message type: ${message.type}`);
  }

  /**
   * Generates a Nostr identity using the SecretKey and Btc1Identifier classes.
   * @param {NostrKeys} [keys] Optional Nostr keys to use for identity generation.
   * @returns {string} A Btc1 DID used for communication over the nostr protocol
   */
  public generateIdentity(keys?: NostrKeys): ServiceAdapterConfigType<NostrAdapterConfig> {
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