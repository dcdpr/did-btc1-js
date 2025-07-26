import {
  Btc1KeyManagerError,
  HashBytes,
  Hex,
  SchnorrKeyPairObject,
  Logger,
  MULTIBASE_URI_PREFIX,
  KeyBytes,
  SignatureBytes
} from '@did-btc1/common';
import { SchnorrMultikey } from '@did-btc1/cryptosuite';
import { SchnorrKeyPair, PublicKey } from '@did-btc1/keypair';
import { sha256 } from '@noble/hashes/sha2';
import { KeyValueStore, MemoryStore } from '@web5/common';
import { KeyIdentifier } from '@web5/crypto';
import { Did } from '@web5/dids';
import { Multibase } from 'multiformats';
import { AvailableNetworks } from '../../bitcoin/index.js';
import { BitcoinSigner, Btc1KeyManagerOptions, CryptoSigner, KeyManager, KeyManagerParams } from './interface.js';

export interface Btc1Signer {
  multikey: SchnorrMultikey;
  network: keyof AvailableNetworks;
};

/**
 * Class for managing cryptographic keys for the Btc1 DID method.
 * @class Btc1KeyManager
 * @type {Btc1KeyManager}
 */
export class Btc1KeyManager implements KeyManager, CryptoSigner, BitcoinSigner  {
  /**
   * Singleton instance of the Btc1KeyManager.
   * @private
   * @type {Btc1KeyManager}
   */
  static #instance?: Btc1KeyManager;

  /**
   * The `activeKeyUri` property is a string that represents the URI of the currently active key.
   * It is used to identify the key that will be used for signing and verifying operations.
   * This property is optional and can be set to a specific key URI when initializing the
   * `Btc1KeyManager` instance. If not set, the key manager will use the default key URI.
   * @type {KeyIdentifier}
   */
  public activeKeyUri?: KeyIdentifier;

  /**
   * The `_store` private variable in `Btc1KeyManager` is a `KeyValueStore` instance used for
   * storing and managing cryptographic keys. It allows the `Btc1KeyManager` class to save,
   * retrieve, and handle keys efficiently within the local Key Management System (KMS) context.
   * This variable can be configured to use different storage backends, like in-memory storage or
   * persistent storage, providing flexibility in key management according to the application's
   * requirements.
   * @private
   * @readonly
   * @type {KeyValueStore<KeyIdentifier, SchnorrKeyPair>} The key store for managing cryptographic keys.
   */
  private readonly _store: KeyValueStore<KeyIdentifier, SchnorrMultikey>;

  /**
   * Creates an instance of Btc1KeyManager.
   * @param {?KeyManagerParams} params The parameters to initialize the key manager.
   * @param {KeyValueStore<KeyIdentifier, SchnorrMultikey>} params.store An optional property to specify a custom
   * `KeyValueStore` instance for key management. If not provided, {@link Btc1KeyManager} uses a default `MemoryStore`
   * instance. This store is responsible for managing cryptographic keys, allowing them to be retrieved, stored, and
   * managed during cryptographic operations.
   * @param {KeyIdentifier} params.keyUri An optional property to specify the active key URI for the key manager.
   */
  constructor({ store, keyUri, keys }: KeyManagerParams = {}) {
    // Set the default key store to a MemoryStore instance
    this._store = store ?? new MemoryStore<KeyIdentifier, SchnorrMultikey>();

    // Import the keys into the key store
    if (keyUri && keys) {
      void this.importKey(keys, keyUri).then(() => {
        this.activeKeyUri = keyUri;
      });
    }
  }

  /**
   * Gets the singleton instance of the Btc1KeyManager.
   * @returns {Btc1KeyManager} The singleton instance of the Btc1KeyManager.
   */
  public static get instance(): Btc1KeyManager {
    // Check if the Btc1KeyManager instance is initialized
    if (!Btc1KeyManager.#instance) {
      throw new Btc1KeyManagerError('Btc1KeyManager not initialized. Call initialize() first.', 'KEY_MANAGER_NOT_INITIALIZED');
    }
    // Return the singleton instance
    const instance = Btc1KeyManager.#instance;
    return instance;
  }

  /**
   * Signs a transaction using the key associated with the key URI.
   * @param {Hex} txHex The transaction hex to sign.
   * @param {KeyIdentifier} keyUri The URI of the key to sign the transaction with.
   * @returns {Promise<Hex>} A promise resolving to the signed transaction hex.
   */
  signTransaction(txHex: Hex, keyUri?: KeyIdentifier): Promise<Hex> {
    throw new Error('Method not implemented.' + txHex + keyUri);
  }

  /**
   * Gets the key pair from the key store and returns a PublicKey.
   * @param {KeyIdentifier} keyUri The URI of the key to get the public key for.
   * @returns {Promise<PublicKey>} The public key associated with the key URI.
   */
  public async getPublicKey(keyUri?: KeyIdentifier): Promise<PublicKey> {
    // Use the active key URI if not provided
    const key = await this.getKey(keyUri);

    // Check if the key exists and has a public key
    if (!key?.publicKey) {
      throw new Btc1KeyManagerError(`Key not found for URI: ${keyUri}`, 'KEY_NOT_FOUND');
    }

    // Return the public key
    return key.publicKey;
  }

  /**
   * Signs the given data using the key associated with the key URI.
   * @param {Hex} data The data to sign.
   * @param {?KeyIdentifier} keyUri The URI of the key to sign the data with.
   * @returns {Promise<SignatureBytes>} A promise resolving to the signature of the data.
   */
  public async sign(data: Hex, keyUri?: KeyIdentifier): Promise<SignatureBytes> {
    // Get the key from the store
    const key = await this.getKey(keyUri);

    // Check if the key exists
    if (!key) {
      throw new Btc1KeyManagerError(`Key URI ${keyUri} not found`, 'KEY_NOT_FOUND');
    }

    // Check if the key can sign
    if(!key.signer) {
      throw new Btc1KeyManagerError(`Key URI ${keyUri} is not a signer`, 'KEY_NOT_SIGNER');
    }

    // Sign the data using the key and return the signature
    return key.sign(data);
  }

  /**
   * Verifies a signature using the key associated with the key URI.
   * @param {KeyIdentifier} keyUri The URI of the key to verify the signature with.
   * @param {SignatureBytes} signature The signature to verify.
   * @param {Hex} data The data to verify the signature with.
   * @returns {Promise<boolean>} A promise resolving to a boolean indicating the verification result.
   */
  public async verify(signature: SignatureBytes, data: Hex, keyUri?: KeyIdentifier): Promise<boolean> {
    // Get the key from the store
    const key = await this.getKey(keyUri);

    // Check if the key exists
    if (!key) {
      throw new Btc1KeyManagerError(`Key not found for URI: ${keyUri}`, 'KEY_NOT_FOUND');
    }

    // Verify the signature using the multikey
    return key.verify(signature, data);
  }

  /**
   * Gets the key pair from the key store.
   * @param {KeyIdentifier} keyUri The URI of the key to get.
   * @returns {Promise<SchnorrKeyPair>} The key pair associated with the key URI.
   * @throws {Btc1KeyManagerError} If the key is not found in the key store.
   */
  private async getKey(keyUri?: KeyIdentifier): Promise<SchnorrMultikey | undefined> {
    // Use the active key URI if not provided
    const uri = keyUri ?? this.activeKeyUri;

    // Throw an error if no key URI is provided or active
    if (!uri) {
      throw new Btc1KeyManagerError('No active key uri set.', 'ACTIVE_KEY_URI_NOT_SET');
    }

    // Get the key pair from the key store
    return await this._store.get(uri);
  }

  /**
   * Exports the full multikeypair from the key store.
   * @returns {Promise<SchnorrKeyPair>} The key pair associated with the key URI.
   * @throws {Btc1KeyManagerError} If the key is not found in the key store.
   */
  public async exportKey(keyUri?: KeyIdentifier): Promise<SchnorrMultikey | undefined> {
    // Get the key from the key store and return it
    return await this.getKey(keyUri);
  }

  /**
   * Imports a keypair to the store.
   * @param {SchnorrKeyPair} keys The keypair to import.
   * @param {KeyIdentifier} keyUri The URI of the key to import.
   * @param {Btc1KeyManagerOptions} options Relevant import options.
   * @param {boolean} options.active A flag to set the key as active (optional, default: false).
   * @returns {Promise<KeyIdentifier>} A promise that resolves to the key identifier of the imported key.
   */
  public async importKey(keys: SchnorrKeyPair, keyUri: string, options: Btc1KeyManagerOptions = {}): Promise<KeyIdentifier> {
    const parts = Did.parse(keyUri);
    if(!parts) {
      throw new Btc1KeyManagerError(
        'Invalid key URI: must be valid, parsable BTC1 identifier',
        'INVALID_KEY_URI',
        { keyUri, parts }
      );
    }

    if(!parts.id) {
      throw new Btc1KeyManagerError(
        'Invalid key URI: missing id part',
        'INVALID_KEY_URI',
        { keyUri, parts }
      );
    }

    if(!parts.fragment) {
      throw new Btc1KeyManagerError(
        'Invalid key URI: missing fragment part',
        'INVALID_KEY_URI',
        { keyUri, parts }
      );
    }
    // Instantiate a new SchnorrMultikey with the provided keys
    const multikey = new SchnorrMultikey({ controller: parts.uri, id: `#${parts.fragment}`, keys });

    // Store the keypair in the key store
    await this._store.set(keyUri, multikey);

    // Set the key as active if required
    if (options.active) {
      this.activeKeyUri = keyUri;
    }

    // Return the key URI
    return keyUri;
  }

  /**
   * Computes the hash of the given data.
   * @param {Uint8Array} data The data to hash.
   * @returns {HashBytes} The hash of the data.
   */
  public digest(data: Uint8Array): HashBytes {
    return sha256(data);
  }

  /**
   * Computes the key URI of a given keypair.
   * @param {string} fragment The fragment identifier (e.g. 'key-1').
   * @param {string} uri The DID uri (e.g. 'did:btc1:xyz').
   * @returns {KeyIdentifier} A full DID fragment URI (e.g. 'did:btc1:xyz#key-1')
   */
  public static computeKeyUri(uri: string, fragment: string): KeyIdentifier {
    // Concat the id to the controller and return
    return `${uri}${fragment.startsWith('#') ? fragment : `#${fragment}`}`;
  }

  /**
   * Computes a multibase-compliant URI from a key.
   * @param key A SchnorrKeyPair, PublicKey, or multibase string
   * @returns {string} A multibase URI (e.g. 'urn:mb:zQ3s...')
   */
  public static toMultibaseUri(data: SchnorrKeyPair | PublicKey | Multibase<'zQ3s'>): string {
    const multibase = data instanceof SchnorrKeyPair
      ? data.publicKey.multibase
      : data instanceof PublicKey
        ? data.multibase
        : data;

    return `${MULTIBASE_URI_PREFIX}${multibase}`;
  }

  /**
   * Initializes a singleton Btc1KeyManager instance.
   * @param {SchnorrKeyPair} keys The keypair used to initialize the key manager.
   * @param {KeyIdentifier} keyUri The URI of the keypair to be set as active.
   * Use Btc1KeyManager.computeKeyUri(uri, fragment) to compute the key URI.
   * @returns {Promise<Btc1KeyManager>} A promise that resolves to the initialized Btc1KeyManager instance.
   */
  public static async initialize(keys: SchnorrKeyPair | SchnorrKeyPairObject, keyUri: string): Promise<Btc1KeyManager> {
    if(!(keys instanceof SchnorrKeyPair)) {
      keys = SchnorrKeyPair.fromJSON(keys);
    }

    // Check if the Btc1KeyManager instance is already initialized
    if (Btc1KeyManager.#instance) {
      Logger.warn('Btc1KeyManager global instance is already initialized.');
      return Btc1KeyManager.#instance;
    }

    // Check if the keypair is provided
    if(!keys) {
      // Log a warning message if not provided
      Logger.warn('keys not provided, generating ...');
    }

    // Generate a new keypair if not provided
    keys ??= SchnorrKeyPair.generate();

    // Initialize the singleton key manager with the keypair
    Btc1KeyManager.#instance = new Btc1KeyManager({ keys });

    // Import the keypair into the key store
    await Btc1KeyManager.#instance.importKey(keys, keyUri, { active: true });

    // Set the active key URI
    Btc1KeyManager.#instance.activeKeyUri = keyUri;

    // Log the active key URI
    Logger.info(`KeyManager initialized with Active Key URI: ${Btc1KeyManager.#instance.activeKeyUri}`);

    // Return the singleton instance
    return Btc1KeyManager.#instance;
  }

  /**
   * Retrieves a keypair from the key store using the provided key URI.
   * @public
   * @param {KeyIdentifier} keyUri The URI of the keypair to retrieve.
   * @returns {Promise<SchnorrKeyPair | undefined>} The retrieved keypair, or undefined if not found.
   */
  public static async getKeyPair(keyUri?: KeyIdentifier): Promise<SchnorrMultikey | undefined> {
    // Use the active key URI if not provided
    keyUri ??= Btc1KeyManager.#instance?.activeKeyUri;
    // Instantiate a new Btc1KeyManager with the default key store
    return await Btc1KeyManager.#instance?.getKey(keyUri);
  }

  /**
   * Retrieves a key signer for the given key URI and network.
   * @param {KeyIdentifier} keyUri The URI of the key to retrieve the signer for.
   * @param {keyof AvailableNetworks} network The network for which the signer is required.
   * @throws {Btc1KeyManagerError} If the key is not found for
   * @returns {Promise<Signer>} A promise that resolves to a Signer instance for the specified key URI and network.
   */
  public async getKeySigner(keyUri: KeyIdentifier, network: keyof AvailableNetworks): Promise<Signer> {
    const multikey = await this.getKey(keyUri);
    if(!multikey) {
      throw new Btc1KeyManagerError(`Key not found for URI: ${keyUri}`, 'KEY_NOT_FOUND');
    }
    return new Signer({ multikey, network });
  }
}

/**
 * Represents a signer for a specific key and network.
 * @class Signer
 * @type {Signer}
 */
export class Signer {
  public multikey: SchnorrMultikey;
  public network: keyof AvailableNetworks;

  constructor(params: Btc1Signer) {
    this.multikey = params.multikey;
    this.network = params.network;
  }

  get publicKey(): KeyBytes {
    // Return the public key from the multikey
    return this.multikey.publicKey.compressed;
  }

  public sign(hash: Hex): SignatureBytes {
    return this.multikey.sign(hash, { scheme: 'ecdsa' });
  };

  public signSchnorr(hash: Hex): SignatureBytes {
    return this.multikey.sign(hash);
  }
}