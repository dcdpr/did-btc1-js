import { Btc1KeyManagerError, HashBytes, Hex, Logger, MULTIBASE_URI_PREFIX, SignatureBytes } from '@did-btc1/common';
import { KeyPair, KeyPairUtils, PublicKey } from '@did-btc1/key-pair';
import { schnorr } from '@noble/curves/secp256k1';
import { sha256 } from '@noble/hashes/sha256';
import { KeyValueStore, MemoryStore } from '@web5/common';
import { KeyIdentifier } from '@web5/crypto';
import { randomBytes } from 'crypto';
import { Multibase } from 'multiformats';
import { Btc1KeyManagerOptions, KeyManager, KeyManagerParams } from './interface.js';

/**
 * Class for managing cryptographic keys for the Btc1 DID method.
 * @class Btc1KeyManager
 * @type {Btc1KeyManager}
 */
export class Btc1KeyManager implements KeyManager {
  public activeKeyUri?: KeyIdentifier;

  /**
   * The `_keyStore` private variable in `Btc1KeyManager` is a `KeyValueStore` instance used for
   * storing and managing cryptographic keys. It allows the `Btc1KeyManager` class to save,
   * retrieve, and handle keys efficiently within the local Key Management System (KMS) context.
   * This variable can be configured to use different storage backends, like in-memory storage or
   * persistent storage, providing flexibility in key management according to the application's
   * requirements.
   * @private
   * @type {KeyValueStore<KeyIdentifier, KeyPair>} The key store for managing cryptographic keys.
   */
  private _keyStore: KeyValueStore<KeyIdentifier, KeyPair>;

  /**
   * Creates an instance of Btc1KeyManager.
   * @param {?KeyManagerParams} params The parameters to initialize the key manager.
   * @param {KeyValueStore<KeyIdentifier, MultikeyPair>} params.keyStore An optional property to specify a custom
   * `KeyValueStore` instance for key management. If not provided, {@link Btc1KeyManager} uses a default `MemoryStore`
   * instance. This store is responsible for managing cryptographic keys, allowing them to be retrieved, stored, and
   * managed during cryptographic operations.
   * @param {KeyIdentifier} params.keyUri An optional property to specify the active key URI for the key manager.
   */
  constructor(params?: KeyManagerParams) {
    // Set the default key store to a MemoryStore instance
    this._keyStore = params?.keyStore ?? new MemoryStore<KeyIdentifier, KeyPair>();
    // Set the active key URI if provided
    this.activeKeyUri = params?.keyUri;
    // If keys are provided, import them into the key store
    if(params?.keys) {
      // Set the active key URI to the computed key URI
      if(!this.activeKeyUri) {
        this.activeKeyUri = Btc1KeyManager.computeKeyUri(params.keys);
      }
      // Import the keys into the key store
      this._keyStore.set(this.activeKeyUri, params.keys).then(console.log);
    }
  }

  /**
   * Gets the key pair from the key store and returns a PublicKey.
   * @param {?KeyIdentifier} keyUri The URI of the key to get the public key for.
   * @returns {Promise<PublicKey>} The public key associated with the key URI.
   */
  public async getPublicKey(keyUri?: KeyIdentifier): Promise<PublicKey> {
    // Use the active key URI if not provided
    keyUri ??= this.activeKeyUri;

    // Get the key from the key store
    const { publicKey } = await this.getKey(keyUri) ?? {};
    if (!publicKey) {
      throw new Btc1KeyManagerError(`Key not found for URI: ${keyUri}`, 'KEY_NOT_FOUND');
    }

    // Return the public key
    return publicKey;
  }

  /**
   * Signs the given data using the key associated with the key URI.
   * @param {Hex} data The data to sign.
   * @param {?KeyIdentifier} keyUri The URI of the key to sign the data with.
   * @returns {Promise<SignatureBytes>} A promise resolving to the signature of the data.
   */
  public async sign(data: Hex, keyUri?: KeyIdentifier): Promise<SignatureBytes> {
    // Use the active key URI if not provided
    keyUri ??= this.activeKeyUri;

    // Get the multikey from the key store
    const { privateKey } = await this.getKey(keyUri) ?? {};
    if (!privateKey) {
      throw new Btc1KeyManagerError(`Key not found for URI: ${keyUri}`, 'KEY_NOT_FOUND');
    }

    // Sign the data using the multikey
    return schnorr.sign(data, privateKey.bytes, randomBytes(32));
  }

  /**
   * Verifies a signature using the key associated with the key URI. See {@link KeyManager.verify} for more details.
   * @param {KeyIdentifier} keyUri The URI of the key to verify the signature with.
   * @param {SignatureBytes} signature The signature to verify.
   * @param {Hex} data The data to verify the signature with.
   * @returns {Promise<boolean>} A promise resolving to a boolean indicating the verification result.
   */
  public async verify(signature: SignatureBytes, data: Hex, keyUri?: KeyIdentifier): Promise<boolean> {
    // Set the active key URI if not provided
    keyUri ??= this.activeKeyUri;

    // Get the multikey from the key store
    const { publicKey } = await this.getKey(keyUri) ?? {};
    if (!publicKey) {
      throw new Btc1KeyManagerError(`Key not found for URI: ${keyUri}`, 'KEY_NOT_FOUND');
    }

    // Verify the signature using the multikey
    return schnorr.verify(signature, data, publicKey.x);
  }

  /**
   * Gets the key pair from the key store. See {@link KeyManager.getKey} for more details.
   * @param {KeyIdentifier} keyUri The URI of the key to get.
   * @returns {Promise<KeyPair>} The key pair associated with the key URI.
   * @throws {Btc1KeyManagerError} If the key is not found in the key store.
   */
  private async getKey(keyUri?: KeyIdentifier): Promise<KeyPair | undefined> {
    // Use the active key URI if not provided
    keyUri ??= this.activeKeyUri;

    // Throw an error if no key URI is provided or active
    if (!keyUri) {
      throw new Btc1KeyManagerError('No key URI provided or active.', 'KEY_URI_NOT_FOUND');
    }

    // Get the key pair from the key store
    const key = await this._keyStore.get(keyUri);

    // Throw an error if the key is not found
    // if (!key) {
    //   throw new Btc1KeyManagerError(`Key not found for URI: ${keyUri}`, 'KEY_NOT_FOUND');
    // }

    return key;
  }

  /**
   * Exports the full multikeypair from the key store. See {@link KeyManager.exportKey} for more details.
   * @returns {Promise<KeyPair>} The key pair associated with the key URI.
   * @throws {Btc1KeyManagerError} If the key is not found in the key store.
   */
  public async exportKey(keyUri?: KeyIdentifier): Promise<KeyPair | undefined> {
    // Use the active key URI if not provided
    keyUri ??= this.activeKeyUri;

    // Get the key from the key store and return it
    return await this.getKey(keyUri);
  }


  /**
   * Imports a keypair into the key store. See {@link KeyManager.importKey} for more details.
   * @param {Btc1KeyManagerOptions} options The options to import the keypair.
   * @param {boolean} options.active A flag to set the key as active (optional, default: false).
   * @returns {Promise<KeyIdentifier>} The URI of the imported keypair.
   */
  public async importKey(keyPair: KeyPair, options: Btc1KeyManagerOptions = {}): Promise<KeyIdentifier> {
    // Compute the key URI if not provided
    const keyUri = Btc1KeyManager.computeKeyUri(keyPair);

    // Store the keypair in the key store
    await this._keyStore.set(keyUri, keyPair);

    // Set the key as active if required
    if (options.active) {
      this.activeKeyUri = keyUri;
    }

    // Return the key URI
    return keyUri;
  }

  /**
   * Computes the hash of the given data. See {@link KeyManager.digest} for more details.
   * @param {Uint8Array} data The data to hash.
   * @returns {HashBytes} The hash of the data.
   */
  public digest(data: Uint8Array): HashBytes {
    return sha256(data);
  }

  /**
   * Computes the key URI of a given keypair. See {@link KeyManager.computeKeyUri} for more details.
   * @param {KeyPair | PublicKey | Multibase<'z66p'>} data The keypair to compute the URI for/
   * @returns {KeyIdentifier} The URI of the keypair/
   */
  public static computeKeyUri(data: KeyPair | PublicKey | Multibase<'z66p'>): KeyIdentifier {
    const ending = data instanceof KeyPair
      ? data.publicKey.multibase
      : data instanceof PublicKey
        ? data.multibase
        : data;
    // Concat the URI prefix to the publicKeyMultibase
    return `${MULTIBASE_URI_PREFIX}${ending}`;
  }

  /**
   * Generates a new keypair and imports it into the key store. See {@link KeyManager.generateKey} for more details.
   * @public
   * @async
   * @param {Btc1KeyManagerOptions} options
   * @returns {Promise<KeyPair | KeyIdentifier>}
   */
  public async generateKey(options: Btc1KeyManagerOptions): Promise<KeyPair | KeyIdentifier> {
    // Set default values for the options
    options ??= { importKey: true, active: false };

    // Generate a new keypair
    const keyPair = KeyPairUtils.generate();

    // If "importKey" is true, import the key and return the key URI
    if(!options.importKey) {
      return keyPair;
    }

    // Return the key URI
    return await this.importKey(keyPair, options);
  }

  /**
   * Initializes a new Btc1KeyManager instance with the provided ID and controller.
   * @param {string} id The ID of the key manager.
   * @param {string} controller The controller of the key manager.
   * @param {KeyPair} keyPair The keypair used to initialize the key manager (optional).
   * @returns {Btc1KeyManager} A new Btc1KeyManager instance.
   * @throws {Btc1KeyManagerError} If the ID or controller is not provided.
   */
  public static async initialize(id: string, controller: string, keyPair?: KeyPair): Promise<Btc1KeyManager> {
    // Throw an error if ID or controller is not provided
    if (!id || !controller) {
      throw new Btc1KeyManagerError('ID and Controller are required to generate a key.', 'MISSING_PARAMS');
    }

    // Check if the keypair is provided
    if(!keyPair) {
      // Log a warning message if not provided
      console.warn('KeyPair not provided, generating ...');
    }

    // Generate a new keypair if not provided
    keyPair ??= KeyPairUtils.generate();


    // Initialize the key manager with the keypair
    const keyManager = new Btc1KeyManager();

    // Import the keypair into the key store
    const keyUri = await keyManager.importKey(keyPair, { active: true });

    // Set the active key URI
    keyManager.activeKeyUri = keyUri;

    // Log the active key URI
    Logger.info(`KeyManager initialized with Active Key URI: ${keyManager.activeKeyUri}`);

    // Return the key manager instance
    return keyManager;
  }


  /**
   * Retrieves a keypair from the key store using the provided key URI.
   * @public
   * @param {KeyIdentifier} keyUri The URI of the keypair to retrieve.
   * @returns {Promise<KeyPair | undefined>} The retrieved keypair, or undefined if not found.
   */
  public static async getKeyPair(keyUri: KeyIdentifier): Promise<KeyPair | undefined> {
    // Instantiate a new Btc1KeyManager with the default key store
    const km = new Btc1KeyManager({ keyStore: new MemoryStore<KeyIdentifier, KeyPair>(), keyUri });
    // Retrieve and return the keypair from the key store
    return await km.exportKey();
  }
}