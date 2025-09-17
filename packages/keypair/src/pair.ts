import {
  Hex,
  KeyBytes,
  KeyPairError,
  SchnorrKeyPairObject
} from '@did-btcr2/common';
import { Secp256k1CompressedPublicKey } from './public.js';
import { Secp256k1SecretKey } from './secret.js';
import { MultibaseKeys, RawSchnorrKeyPair, SchnorrKeyPairParams } from './types.js';

/**
 * General KeyPair interface used by SchnorrKeyPair class.
 * @interface KeyPair
 * @type {KeyPair}
 */
export interface KeyPair {
  /**
   * @type {Secp256k1CompressedPublicKey} The public key associated with the SchnorrKeyPair (required).
   */
  readonly public: Secp256k1CompressedPublicKey;

  /**
   * @type {Secp256k1SecretKey} The secret key associated with the SchnorrKeyPair (optional).
   * @throws {KeyPairError} If the secret key is not available.
   */
  readonly secret?: Secp256k1SecretKey;

  /**
   * JSON representation of the SchnorrKeyPair object.
   * @returns {SchnorrKeyPairObject} The SchnorrKeyPair as a JSON object.
   */
  json(): SchnorrKeyPairObject;
}

/**
 * Encapsulates a Secp256k1CompressedPublicKey and a Secp256k1SecretKey object as a single SchnorrKeyPair object.
 * @class SchnorrKeyPair
 * @type {SchnorrKeyPair}
 */
export class SchnorrKeyPair implements KeyPair {
  /** @type {Secp256k1SecretKey} The secret key object */
  private _secretKey?: Secp256k1SecretKey;

  /** @type {Secp256k1CompressedPublicKey} The public key object */;
  private _publicKey: Secp256k1CompressedPublicKey;

  /** @type {string} The public key in multibase format */
  private _publicKeyMultibase: string;

  /** @type {string} The secret key in multibase format */
  private _secretKeyMultibase: string;

  /**
   * Creates an instance of Keys. Must provide a at least a secret key.
   * Can optionally provide both a secret and public key, but must be a valid pair.
   * @param {SchnorrKeyPairParams} params The parameters to initialize the Keys object.
   * @param {Secp256k1CompressedPublicKey | KeyBytes} params.public The public key object or bytes
   * @param {Secp256k1SecretKey | KeyBytes} [params.secret] The secret key object or bytes
   * @throws {KeyPairError} If neither a public key or secret key is provided.
   * @throws {KeyPairError} If the public key is not a valid pair with the secret key.
   */
  constructor(params: SchnorrKeyPairParams = {}) {
    // If no secret key or public key, throw an error
    if (!params.public && !params.secret) {
      throw new KeyPairError('Argument missing: must at least provide a public', 'CONSTRUCTOR_ERROR');
    }

    // Set the secret key
    if(params.secret instanceof Uint8Array) {
      this._secretKey = new Secp256k1SecretKey(params.secret);
    } else if (params.secret instanceof Secp256k1SecretKey) {
      this._secretKey = params.secret;
    }

    // Set the public key
    if(params.public instanceof Secp256k1CompressedPublicKey) {
      this._publicKey = params.public;
    } else if (params.public instanceof Uint8Array) {
      this._publicKey = new Secp256k1CompressedPublicKey(params.public);
    } else {
      this._publicKey = new Secp256k1CompressedPublicKey(this._secretKey!.computePublicKey());
    }

    this._publicKeyMultibase = this._publicKey.multibase.encoded;
    this._secretKeyMultibase = this._secretKey ? this._secretKey.multibase : '';
  }

  /**
   * Get the Secp256k1SecretKey.
   * @returns {Secp256k1SecretKey} The Secp256k1SecretKey object
   * @throws {KeyPairError} If the secret key is not available
   */
  get secret(): Secp256k1SecretKey {
    // If the secret key is not available, throw an error
    if(!this._secretKey) {
      throw new KeyPairError('Secret key not available', 'SECRET_KEY_ERROR');
    }
    // If the secret key is not valid, throw an error
    if(!this._secretKey.isValid()) {
      throw new KeyPairError('Secret key is not valid', 'SECRET_KEY_ERROR');
    }
    // Return a copy of the secret key
    const secret = this._secretKey;
    return secret;
  }

  /**
   * Set the Secp256k1CompressedPublicKey.
   * @param {Secp256k1CompressedPublicKey} pub The Secp256k1CompressedPublicKey object
   * @throws {KeyPairError} If the public key is not a valid pair with the secret key.
   */
  set public(pub: Secp256k1CompressedPublicKey) {
    // If the public key is not a valid pair with the secret key, throw an error
    if(this.secret && !this.secret.hasValidPublicKey(pub)) {
      throw new KeyPairError('Public key is not a valid pair with the secret key', 'PUBLIC_KEY_ERROR');
    }
    this._publicKey = pub;
    this._publicKeyMultibase = pub.multibase.encoded;
    this._secretKeyMultibase = this._secretKey ? this._secretKey.multibase : '';
  }

  /**
   * Get the Secp256k1CompressedPublicKey.
   * @returns {Secp256k1CompressedPublicKey} The Secp256k1CompressedPublicKey object
   */
  get publicKey(): Secp256k1CompressedPublicKey {
    const pub = this._publicKey;
    return pub;
  }

  /**
   * Get the raw bytes of each key in the SchnorrKeyPair.
   * @returns {RawSchnorrKeyPair} JSON object with the SchnorrKeyPair raw bytes.
   */
  get raw(): RawSchnorrKeyPair {
    return {
      public : this.public.x,
      secret : this.secret ? this.secret.bytes : undefined
    };
  }

  /**
   * Get the Keys in multibase format.
   * @returns {MultibaseKeys} The Secp256k1SecretKey in multibase format
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
    return {
      secret : this.secret.json(),
      public : this.public.json()
    };
  }

  /**
   * Static method creates a new Keys from a JSON object.
   * @param {SchnorrKeyPairObject} keys The JSON object to initialize the Keys.
   * @returns {SchnorrKeyPair} The initialized Keys object.
   */
  public static fromJSON(keys: SchnorrKeyPairObject): SchnorrKeyPair {
    return new SchnorrKeyPair({
      secret : Secp256k1SecretKey.fromJSON(keys.secret),
      public : Secp256k1CompressedPublicKey.fromJSON(keys.public)
    });
  }

  /**
   * Static method creates a new SchnorrKeyPair from a Secp256k1SecretKey object or secret key bytes.
   * @param {Secp256k1SecretKey | KeyBytes} data The secret key bytes
   * @returns {SchnorrKeyPair} A new SchnorrKeyPair object
   */
  public static fromPrivateKey(data: Secp256k1SecretKey | KeyBytes): SchnorrKeyPair {

    // If the secret key is a Secp256k1SecretKey object, get the raw bytes else use the bytes
    const bytes = data instanceof Secp256k1SecretKey ? data.bytes : data;

    // Throw error if the secret key is not 32 bytes
    if(bytes.length !== 32) {
      throw new KeyPairError('Invalid arg: must be 32 byte secret key', 'FROM_PRIVATE_KEY_ERROR');
    }

    // If pk Uint8Array, construct Secp256k1SecretKey object else use the object
    const secret = data instanceof Uint8Array ? new Secp256k1SecretKey(data) : data;

    // Return a new Keys object
    return new SchnorrKeyPair({
      secret : data instanceof Uint8Array ? new Secp256k1SecretKey(data) : data,
      public : secret.computePublicKey()
    });
  }

  /**
   * Static method creates a new Keys (Secp256k1SecretKey/Secp256k1CompressedPublicKey) from bigint entropy.
   * @param {bigint} entropy The entropy in bigint form
   * @returns {SchnorrKeyPair} A new SchnorrKeyPair object
   */
  public static fromEnt(entropy: bigint): SchnorrKeyPair {
    const secret = Secp256k1SecretKey.fromEnt(entropy);
    return new SchnorrKeyPair({ secret, public: secret.computePublicKey() });
  }

  /**
   * Converts key bytes to a hex string.
   * @param {KeyBytes} keyBytes The key bytes (secret or public).
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
    const pk = keys.public;
    const otherPk = otherKeys.public;

    // If publicKeys present, use to compare as hex strings.
    if(pk && otherPk) {
      return pk.hex === otherPk.hex;
    }

    // Deconstruct the secret keys from the key pairs
    const sk = keys.secret;
    const otherSk = otherKeys.secret;
    if(sk && otherSk) {
      // Get the public key hex strings for both key pair publicKeys
      return sk.hex === otherSk.hex;
    }

    throw new KeyPairError('Cannot compare invalid key pair(s)', 'KEYPAIR_EQUALS_ERROR');
  }

  /**
   * Static method to generate a new random SchnorrKeyPair instance.
   * @returns {SchnorrKeyPair} A new Secp256k1SecretKey object.
   */
  public static generate(): SchnorrKeyPair {
    // Generate random secret key bytes
    const skBytes = Secp256k1SecretKey.random();

    // Construct a new Secp256k1SecretKey object
    const secret = new Secp256k1SecretKey(skBytes);

    // Compute the public key from the secret key
    const pk = secret.computePublicKey();

    // Return a new Keys object
    return new SchnorrKeyPair({ secret, public: pk });
  }
}