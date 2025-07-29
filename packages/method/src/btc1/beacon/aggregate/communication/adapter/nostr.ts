import { KeyBytes, Logger, Maybe } from '@did-btc1/common';
import { PublicKey, SchnorrKeyPair } from '@did-btc1/keypair';
import { nonceGen } from '@scure/btc-signer/musig2';
import { Event, Filter, finalizeEvent, nip44 } from 'nostr-tools';
import { SimplePool, } from 'nostr-tools/pool';
import { Btc1Identifier } from '../../../../../utils/identifier.js';
import {
  BEACON_COHORT_ADVERT,
  BEACON_COHORT_AGGREGATED_NONCE,
  BEACON_COHORT_AUTHORIZATION_REQUEST,
  BEACON_COHORT_NONCE_CONTRIBUTION,
  BEACON_COHORT_OPT_IN,
  BEACON_COHORT_OPT_IN_ACCEPT,
  BEACON_COHORT_READY,
  BEACON_COHORT_REQUEST_SIGNATURE,
  BEACON_COHORT_SIGNATURE_AUTHORIZATION
} from '../../cohort/messages/constants.js';
import { AggregateBeaconMessage, AggregateBeaconMessageType } from '../../cohort/messages/index.js';
import { CommunicationAdapterError } from '../error.js';
import {
  CommunicationService,
  MessageHandler,
  ServiceAdapter,
  ServiceAdapterIdentity
} from '../service.js';

export const DEFAULT_NOSTR_RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.snort.social',
  'wss://nostr-pub.wellorder.net',
];
export const DEFAULT_NOSTR_FILTERS: Filter[] = [{ kinds: [1, 1059] }];

export type NostrAdapterConfig = {
  keys?: ServiceAdapterIdentity<NostrKeys>;
  relays?: string[];
  filters?: Filter[]
}
export type Btc1Did = string;
export type NostrKeys = {
  public: KeyBytes;
  secret: KeyBytes;
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
   * The list of Nostr relays to connect to.
   * @type {string[]}
   */
  public relays: string[] = DEFAULT_NOSTR_RELAYS;

  /**
   * An array of filters to apply when subscribing to Nostr events.
   * @type {Filter[]}
   */
  public filters: Filter[] = DEFAULT_NOSTR_FILTERS;

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
   * The keys used for Nostr communication.
   * @type {ServiceAdapterIdentity<NostrKeys>}
   */
  public keys?: ServiceAdapterIdentity<NostrKeys>;


  /**
   * Constructs a new NostrAdapter instance with the provided configuration.
   * @param {NostrAdapterConfig} [config] The configuration for the NostrAdapter.
   * @param {ServiceAdapterIdentity<NostrKeys>} config.keys The keys used for Nostr communication, containing public and secret keys.
   * @param {string[]} [config.relays] The list of Nostr relays to connect to. Defaults to a predefined set of relays.
   * @param {Filter[]} [config.filters] The filters to apply when subscribing to Nostr
   */
  constructor({ keys, relays, filters }: NostrAdapterConfig = {}) {
    this.relays = relays ?? DEFAULT_NOSTR_RELAYS;
    this.filters = filters ?? DEFAULT_NOSTR_FILTERS;
    this.keys = keys;
  }

  /**
   * Starts the Nostr communication service by subscribing to relays.
   * @returns {ServiceAdapter<NostrAdapter>} Returns the NostrAdapter instance for method chaining.
   */
  public start(): ServiceAdapter<NostrAdapter> {
    this.pool = new SimplePool();

    this.pool.subscribe(this.relays, { kinds: [1, 1059] }, {
      onclose : (reasons: string[]) => console.log('Subscription to kind 1 closed', reasons),
      onevent : this.onEvent.bind(this),
    });

    return this;
  }

  /**
   * Sets the keys used for Nostr communication.
   * @param {ServiceAdapterIdentity<NostrKeys>} keys The keys to set.
   */
  public setKeys(keys: ServiceAdapterIdentity<NostrKeys>): void {
    this.keys = keys;
  }

  /**
   * Handles incoming Nostr events and dispatches them to the appropriate message handler.
   * @param {Event} event The Nostr event received from the relay.
   */
  private async onEvent(event: Event): Promise<void> {
    Logger.debug('NostrAdapter received event:', event);
    // Dispatch the event to the registered handler
    const tag = event.tags.find(
      ([tag, _]) => AggregateBeaconMessage.isValidType(tag)
    );

    if(!tag) {
      Logger.warn(`Event ${event.id} does not contain a valid agg beacon message type, skipping handler dispatch.`);
      return;
    }

    const [name, value] = tag;
    if(!name || !value) {
      Logger.warn(`Event ${event.id} does not contain a valid agg beacon message type, skipping handler dispatch.`);
      return;
    }

    if(event.kind === 1 && !AggregateBeaconMessage.isKeyGenMessageValue(value)) {
      Logger.warn(`Event ${event.id} is not a key generation message type: ${value}, skipping handler dispatch.`);
      return;
    }

    if(event.kind === 1059 && !AggregateBeaconMessage.isSignMessageValue(value)) {
      Logger.warn(`Event ${event.id} not a sign message type: ${value}, skipping handler dispatch.`);
      return;
    }

    const handler = this.handlers.get(value);
    if (!handler) {
      Logger.warn(`No handler found for message with message type: ${value}`);
      return;
    }

    await handler(event.content);
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
   * @param {Btc1Did} from The identifier of the sender.
   * @param {Btc1Did} [to] The identifier of the recipient.
   * @returns {Promise<void>} A promise that resolves when the message is sent.
   */
  public async sendMessage(message: Maybe<AggregateBeaconMessageType>, from: Btc1Did, to?: Btc1Did): Promise<void | Promise<string>[]> {
    // Check if the sender and recipient DIDs are valid Btc1 identifiers
    if(
      [from, to]
        .filter(did => !!did)
        .every(did => !Btc1Identifier.isValid(did!))
    ) {
      Logger.error(`Invalid Btc1 identifiers: sender ${from}, recipient ${to}`);
      throw new CommunicationAdapterError(
        `Invalid Btc1 identifiers: sender ${from}, recipient ${to}`,
        'SEND_MESSAGE_ERROR', { adapter: this.name }
      );
    }

    // Check if the secret key is available
    if(!this.keys?.secret) {
      Logger.error(`No secret key available for signing`);
      throw new CommunicationAdapterError(
        `No secret key available for signing`,
        'SEND_MESSAGE_ERROR', { adapter: this.name }
      );
    }
    // Decode the sender and recipient DIDs to get their genesis bytes in hex
    const sender = new PublicKey(Btc1Identifier.decode(from).genesisBytes).x.toHex();
    Logger.info(`Sending message from ${sender}:`, message);

    const tags = [['p', sender]];
    if(to) {
      const recipient = new PublicKey(Btc1Identifier.decode(to).genesisBytes).x.toHex();
      tags.push(['p', recipient]);
    }

    if(AggregateBeaconMessage.isKeyGenMessageValue(message.type)) {
      switch(message.type) {
        case BEACON_COHORT_ADVERT:
          tags.push(['BEACON_COHORT_ADVERT', message.type]);
          break;
        case BEACON_COHORT_OPT_IN:
          tags.push(['BEACON_COHORT_OPT_IN', message.type]);
          break;
        case BEACON_COHORT_OPT_IN_ACCEPT:
          tags.push(['BEACON_COHORT_OPT_IN_ACCEPT', message.type]);
          break;
        case BEACON_COHORT_READY:
          tags.push(['BEACON_COHORT_READY', message.type]);
          break;
      }
      const event = finalizeEvent({
        kind       : 1,
        created_at : Math.floor(Date.now() / 1000),
        tags,
        content    : JSON.stringify(message)
      } as Event, this.keys.secret);
      Logger.info(`Sending message kind 1 event ...`, event);
      return this.pool?.publish(this.relays, event);
    }

    if(AggregateBeaconMessage.isSignMessageValue(message.type)) {
      switch(message.type) {
        case BEACON_COHORT_REQUEST_SIGNATURE:
          tags.push(['BEACON_COHORT_REQUEST_SIGNATURE', message.type]);
          break;
        case BEACON_COHORT_AUTHORIZATION_REQUEST:
          tags.push(['BEACON_COHORT_AUTHORIZATION_REQUEST', message.type]);
          break;
        case BEACON_COHORT_NONCE_CONTRIBUTION:
          tags.push(['BEACON_COHORT_NONCE_CONTRIBUTION', message.type]);
          break;
        case BEACON_COHORT_AGGREGATED_NONCE:
          tags.push(['BEACON_COHORT_AGGREGATED_NONCE', message.type]);
          break;
        case BEACON_COHORT_SIGNATURE_AUTHORIZATION:
          tags.push(['BEACON_COHORT_SIGNATURE_AUTHORIZATION', message.type]);
          break;
      }
      const { publicKey, secretKey } = SchnorrKeyPair.generate();
      const content = nip44.encrypt(JSON.stringify(message), secretKey.bytes, nonceGen(publicKey.x).public);
      Logger.debug('NostrAdapter content:', content);
      const event = finalizeEvent({ content, tags, kind: 1059 } as Event, this.keys.secret);
      Logger.debug('NostrAdapter event:', event);
      return this.pool?.publish(this.relays, event);
    }

    Logger.error(`Unsupported message type: ${message.type}`);
  }
}