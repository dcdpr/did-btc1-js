import {
  Hex,
  KeyBytes,
  KeyPairError,
  SchnorrKeyPairObject
} from '@did-btc1/common';
import { PublicKey } from './public.js';
import { SecretKey } from './secret.js';

/**
 * Interface for KeyPair class.
 * @interface KeyPair
 * @type {KeyPair}
 */
export interface KeyPair {
  /**
   * @type {PublicKey} The PublicKey associated with the SchnorrKeyPair (required).
   */
  readonly publicKey: PublicKey;

  /**
   * @type {SecretKey} The SecretKey associated with the SchnorrKeyPair (optional).
   * @throws {KeyPairError} If the secret key is not available.
   */
  readonly secretKey?: SecretKey;

  /**
   * JSON representation of the SchnorrKeyPair object.
   * @returns {SchnorrKeyPairObject} The SchnorrKeyPair as a JSON object.
   */
  json(): SchnorrKeyPairObject;
}

type RawKeyPair = {
  public: KeyBytes;
  secret?: KeyBytes
}

interface MultibaseKeys {
  publicKeyMultibase: string;
  secretKeyMultibase: string
}
/**
 * Encapsulates a PublicKey and a SecretKey object as a single Keys object.
 * @class SchnorrKeyPair
 * @type {SchnorrKeyPair}
 */
export class SchnorrKeyPair implements KeyPair {
  /** @type {SecretKey} The secret key object */
  private _secretKey?: SecretKey;

  /** @type {PublicKey} The public key object */;
  private _publicKey: PublicKey;

  /** @type {string} The public key in multibase format */
  private _publicKeyMultibase: string;

  /** @type {string} The secret key in multibase format */
  private _secretKeyMultibase: string;

  /**
   * Creates an instance of Keys. Must provide a at least a secret key.
   * Can optionally provide both a private and public key, but must be a valid pair.
   * @param {SecretKey} secretKey The secret key object
   */
  constructor(secretKey?: SecretKey | KeyBytes, publicKey?: PublicKey | KeyBytes) {
    // If no secret key or public key, throw an error
    if (!publicKey && !secretKey) {
      throw new KeyPairError('Argument missing: must at least provide a publicKey', 'CONSTRUCTOR_ERROR');
    }

    // Set the secret key
    if(secretKey instanceof Uint8Array) {
      this._secretKey = new SecretKey(secretKey);
    } else if (secretKey instanceof SecretKey) {
      this._secretKey = secretKey;
    }

    // Set the public key
    if(publicKey instanceof PublicKey) {
      this._publicKey = publicKey;
    } else if (publicKey instanceof Uint8Array) {
      this._publicKey = new PublicKey(publicKey);
    } else {
      this._publicKey = new PublicKey(this._secretKey!.computePublicKey());
    }

    this._publicKeyMultibase = this._publicKey.multibase.address;
    this._secretKeyMultibase = this._secretKey ? this._secretKey.multibase : '';
  }

  /**
   * Get the SecretKey.
   * @returns {SecretKey} The SecretKey object
   * @throws {KeyPairError} If the secret key is not available
   */
  get secretKey(): SecretKey {
    // If the secret key is not available, throw an error
    if(!this._secretKey) {
      throw new KeyPairError('Secret key not available', 'SECRET_KEY_ERROR');
    }
    // If the secret key is not valid, throw an error
    if(!this._secretKey.isValid()) {
      throw new KeyPairError('Secret key is not valid', 'SECRET_KEY_ERROR');
    }
    // Return a copy of the secret key
    const secretKey = this._secretKey;
    return secretKey;
  }

  /**
   * Set the PublicKey.
   * @param {PublicKey} publicKey The PublicKey object
   * @throws {KeyPairError} If the public key is not a valid pair with the secret key.
   */
  set publicKey(publicKey: PublicKey) {
    // If the public key is not a valid pair with the secret key, throw an error
    if(this.secretKey && !this.secretKey.isValidPair(publicKey)) {
      throw new KeyPairError('Public key is not a valid pair with the secret key', 'PUBLIC_KEY_ERROR');
    }
    this._publicKey = publicKey;
    this._publicKeyMultibase = publicKey.multibase.address;
    this._secretKeyMultibase = this._secretKey ? this._secretKey.multibase : '';
  }

  /**
   * Get the PublicKey.
   * @returns {PublicKey} The PublicKey object
   */
  get publicKey(): PublicKey {
    const publicKey = this._publicKey;
    return publicKey;
  }

  /**
   * Get the Keys as a raw key pair.
   * @returns {RawKeyPair} The Keys as a raw key pair
   */
  get raw(): RawKeyPair {
    return {
      public : this.publicKey.x,
      secret : this.secretKey ? this.secretKey.bytes : undefined
    };
  }

  /**
   * Get the Keys in multibase format.
   * @returns {MultibaseKeys} The SecretKey in multibase format
   */
  get multibase(): MultibaseKeys {
    return {
      publicKeyMultibase  : this._publicKeyMultibase,
      secretKeyMultibase : this._secretKeyMultibase,
    };
  }

  /**
   * JSON representation of a Keys.
   * @returns {SchnorrKeyPairObject} The Keys as a JSON object
   */
  public json(): SchnorrKeyPairObject {
    return Object.json(this) as SchnorrKeyPairObject;
  }

  /**
   * Static method creates a new Keys from a JSON object.
   * @param {SchnorrKeyPairObject} keys The JSON object to initialize the Keys.
   * @returns {SchnorrKeyPair} The initialized Keys object.
   */
  public static fromJSON(keys: SchnorrKeyPairObject): SchnorrKeyPair {
    // Construct the secret key and public key from the JSON object
    const secretKey = SecretKey.fromJSON(keys.secretKey);
    const publicKey = PublicKey.fromJSON(keys.publicKey);
    if(!secretKey.isValid()) {
      throw new KeyPairError('Invalid secret key from JSON', 'FROM_JSON_ERROR', keys);
    }
    // Check that the keys are a valid pair
    if(!secretKey.isValidPair(publicKey)) {
      throw new KeyPairError(
        'Invalid key pair: secret key does not match public key',
        'FROM_JSON_ERROR', keys
      );
    }
    // Return a new SchnorrKeyPair object
    return new SchnorrKeyPair(secretKey, publicKey);
  }

  /**
   * Static method creates a new SchnorrKeyPair from a SecretKey object or secret key bytes.
   * @param {SecretKey | KeyBytes} data The secret key bytes
   * @returns {SchnorrKeyPair} A new SchnorrKeyPair object
   */
  public static fromPrivateKey(data: SecretKey | KeyBytes): SchnorrKeyPair {

    // If the secret key is a SecretKey object, get the raw bytes else use the bytes
    const bytes = data instanceof SecretKey ? data.bytes : data;

    // Throw error if the secret key is not 32 bytes
    if(bytes.length !== 32) {
      throw new KeyPairError('Invalid arg: must be 32 byte secret key', 'FROM_PRIVATE_KEY_ERROR');
    }

    // If pk Uint8Array, construct SecretKey object else use the object
    const secretKey = data instanceof Uint8Array ? new SecretKey(data) : data;

    // Return a new Keys object
    return new SchnorrKeyPair(secretKey);
  }

  /**
   * Static method creates a new Keys (SecretKey/PublicKey) bigint secret.
   * @param {bigint} secret The secret key secret
   * @returns {Keys} A new Keys object
   */
  public static fromSecret(secret: bigint): SchnorrKeyPair {
    const secretKey = SecretKey.fromSecret(secret);
    return new SchnorrKeyPair(secretKey);
  }

  /**
   * Converts key bytes to a hex string.
   * @param {KeyBytes} keyBytes The key bytes (private or public).
   * @returns {Hex} The key bytes as a hex string.
   */
  public static toHex(keyBytes: KeyBytes): Hex {
    return Buffer.from(keyBytes).toString('hex');
  }

  /**
   * Compares two Keys objects for equality.
   * @param {SchnorrKeyPair} keys The main keys.
   * @param {SchnorrKeyPair} otherKeys The other keys to compare.
   * @returns {boolean} True if the public key and secret key are equal, false otherwise.
   */
  public static equals(keys: SchnorrKeyPair, otherKeys: SchnorrKeyPair): boolean {
    // Deconstruct the public keys from the key pairs
    const pk = keys.publicKey;
    const otherPk = otherKeys.publicKey;

    // If publicKeys present, use to compare as hex strings.
    if(pk && otherPk) {
      return pk.hex === otherPk.hex;
    }

    // Deconstruct the private keys from the key pairs
    const sk = keys.secretKey;
    const otherSk = otherKeys.secretKey;
    if(sk && otherSk) {
      // Get the public key hex strings for both key pair publicKeys
      return sk.hex === otherSk.hex;
    }

    throw new KeyPairError('Cannot compare invalid key pair(s)', 'KEYPAIR_EQUALS_ERROR');
  }

  /**
   * Static method to generate a new random SchnorrKeyPair instance.
   * @returns {SchnorrKeyPair} A new SecretKey object.
   */
  public static generate(): SchnorrKeyPair {
    // Generate random secret key bytes
    const skBytes = SecretKey.random();

    // Construct a new SecretKey object
    const secretKey = new SecretKey(skBytes);

    // Return a new Keys object
    return new SchnorrKeyPair(secretKey);
  }
}