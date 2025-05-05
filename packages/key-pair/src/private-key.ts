import {
  BIP340_MULTIKEY_PREFIX,
  CURVE,
  Hex,
  PrivateKeyBytes,
  PrivateKeyError,
  PrivateKeyJSON,
  PrivateKeySecret,
  PrivateKeySeed,
  PublicKeyBytes
} from '@did-btc1/common';
import { getRandomValues } from 'crypto';
import { base58btc } from 'multiformats/bases/base58';
import * as tinysecp from 'tiny-secp256k1';
import { IPrivateKey } from './interface.js';
import { KeyPair } from './key-pair.js';
import { PublicKey } from './public-key.js';

/**
 * Encapsulates a secp256k1 private key
 * Provides get methods for different formats (raw, secret, point).
 * Provides helpers methods for comparison, serialization and publicKey generation.
 * @class PrivateKey
 * @type {PrivateKey}
 *
 */
export class PrivateKey implements IPrivateKey {
  /** @type {PrivateKeyBytes} The Uint8Array private key bytes */
  private _bytes?: PrivateKeyBytes;

  /** @type {PrivateKeySecret} The bigint private key secret */
  private _secret?: PrivateKeySecret;

  /** @type {PublicKey} Memoized version of the PublicKey object */
  private _computedPublicKey?: PublicKey;

  /** @type {string} The private key in privateKeyMultibase format */
  private _multibase: string;

  /**
   * Instantiates an instance of PrivateKey.
   * @param {PrivateKeySeed} seed bytes (Uint8Array) or secret (bigint)
   * @throws {PrivateKeyError} If seed is not provided, not a valid 32-byte private key or not a valid bigint secret
   */
  constructor(seed: PrivateKeySeed) {
    // If no bytes or secret, throw error
    const isBytes = seed instanceof Uint8Array;
    const isSecret = typeof seed === 'bigint';
    if(!isBytes && !isSecret) {
      throw new PrivateKeyError(
        'Invalid seed: must be 32-byte Uint8Array or bigint secret',
        'PRIVATE_KEY_CONSTRUCTOR_ERROR'
      );
    }

    // If bytes and bytes are not length 32
    if (isBytes && seed.length !== 32) {
      throw new PrivateKeyError(
        'Invalid seed: must be a valid 32-byte private key',
        'PRIVATE_KEY_CONSTRUCTOR_ERROR'
      );
    }

    // If secret and secret is not a valid bigint, throw error
    if (isSecret && (seed < 1n || seed >= CURVE.n)) {
      throw new PrivateKeyError(
        'Invalid seed: must must be a valid bigint secret',
        'PRIVATE_KEY_CONSTRUCTOR_ERROR'
      );
    }

    // Cast the seed as either bytes or secret
    const seedBytes = seed as PrivateKeyBytes;
    const seedSecret = seed as PrivateKeySecret;

    // Set the private key _bytes and _secret
    this._bytes = isSecret ? PrivateKeyUtils.toBytes(seedSecret) : seedBytes;
    this._secret = isBytes ? PrivateKeyUtils.toSecret(seedBytes) : seedSecret;

    // Set the private key multibase
    this._multibase = this.encode();
  }

  /**
   * Return the private key bytes.
   */
  get bytes(): Uint8Array {
    // Return a copy of the private key bytes
    const bytes = new Uint8Array(this._bytes!);
    return bytes;
  }

  /**
   * Return the private key secret.
   */
  get secret(): bigint {
    // Memoize the secret and return
    const secret = BigInt(this._secret!) as bigint;
    return secret;
  }

  /**
   * Return the private key point.
   * @returns {bigint} The private key point.
   * @throws {PrivateKeyError} If the public key is undefined or not compressed
   */
  get point(): bigint {
    // Multiply the generator point by the private key
    const publicKey = tinysecp.pointFromScalar(this.bytes, true);

    // If no public key, throw error
    if (!publicKey) {
      throw new PrivateKeyError(
        'Undefined publicKey: failed to compute public key',
        'PRIVATE_KEY_POINT_ERROR'
      );
    }

    // If not compressed point, throw error
    if (!tinysecp.isPointCompressed(publicKey)) {
      throw new PrivateKeyError(
        'Malformed publicKey: public key not compressed format',
        'PRIVATE_KEY_POINT_ERROR'
      );
    }

    // Extract the x-coordinate from the compressed public key, convert to hex, and return as bigint
    return BigInt('0x' + Buffer.from(publicKey.slice(1, 33)).toString('hex'));
  }

  /**
   * Returns the raw private key as a hex string.
   * @returns {Hex} The private key as a hex string
   */
  get hex(): Hex {
    // Convert the raw private key bytes to a hex string
    return Buffer.from(this.bytes).toString('hex');
  }


  /**
   * Encode the private key bytes as a privateKeyMultibase string.
   * @returns {string} The private key in base58btc multibase format
   */
  get multibase(): string {
    const multibase = this._multibase;
    return multibase;
  }

  public encode(): string {
    // Convert Uint8Array to Array
    const bytes = this.bytes.toArray();
    // Push the key bytes at the end of the prefix
    bytes.unshift(...BIP340_MULTIKEY_PREFIX);
    // Return the encoded keys
    return base58btc.encode(bytes.toUint8Array());
  }

  public static decode(privateKeyMultibase: string): PrivateKeyBytes {
    return base58btc.decode(privateKeyMultibase).slice(2);
  }

  /**
   * Checks if this private key is equal to another.
   * @see IPrivateKey.equals
   *
   * @param {PrivateKey} other The other private key
   * @returns {boolean} True if the private keys are equal, false otherwise
   */
  public equals(other: PrivateKey): boolean {
    // Compare the hex strings of the private keys
    return this.hex === other.hex;
  }

  /**
   * Computes the public key from the private key bytes.
   * @returns {PublicKey} The computed public key
   */
  public computePublicKey(): PublicKey {
    if (!this._computedPublicKey) {
      const publicKeyBytes = PrivateKeyUtils.computePublicKey(this.bytes);
      this._computedPublicKey = new PublicKey(publicKeyBytes);
    }
    return this._computedPublicKey;
  }


  /**
   * Checks if the private key is valid.
   * @returns {boolean} True if the private key is valid, false otherwise
   */
  public isValid(): boolean {
    return PrivateKeyUtils.isValid(this.bytes);
  }

  /**
   * Returns the private key as a JSON object.
   */
  public json(): PrivateKeyJSON {
    return {
      bytes  : this.bytes.toArray(),
      secret : this.secret.toString(),
      point  : this.point.toString(),
      hex    : this.hex,
    };
  }

  public static from(json: PrivateKeyJSON): PrivateKey {
    return new PrivateKey(new Uint8Array(json.bytes));
  }
}

/**
 * Utility class for creating and working with PrivateKey objects.
 * @class PrivateKeyUtils
 * @type {PrivateKeyUtils}
 */
export class PrivateKeyUtils {
  /**
   * Convert a PrivateKey or PrivateKeyBytes to a KeyPair.
   * @param {PrivateKeyBytes} bytes
   * @returns {KeyPair} The KeyPair object containing the public and private keys
   * @throws {PrivateKeyError} If the private key is not valid
   */
  public static toKeyPair(bytes: PrivateKeyBytes): KeyPair {
    // Create a new PrivateKey from the bytes
    const privateKey = new PrivateKey(bytes);

    // Compute the public key from the private key
    const publicKey = privateKey.computePublicKey();

    // Create a new KeyPair from the public key and private key
    return new KeyPair({ publicKey, privateKey });
  }

  /**
   * Convert a bigint secret to private key bytes.
   *
   * @param {PrivateKeyBytes} bytes The private key bytes
   * @returns {bigint} The private key bytes as a bigint secret
   */
  public static toSecret(bytes: PrivateKeyBytes): bigint {
    return bytes.reduce((acc, byte) => (acc << 8n) | BigInt(byte), 0n);
  }

  /**
   * Convert a private key bytes to a bigint secret.
   *
   * @param {bigint} secret The private key secret.
   * @returns {PrivateKeyBytes} The private key secret as private key bytes.
   */
  public static toBytes(secret: bigint): PrivateKeyBytes {
    // Ensure it’s a valid 32-byte value in [1, n-1] and convert bigint to Uint8Array
    const bytes = Uint8Array.from(
      { length: 32 },
      (_, i) => Number(secret >> BigInt(8 * (31 - i)) & BigInt(0xff))
    );

    // If bytes are not a valid secp256k1 private key, throw error
    if (!tinysecp.isPrivate(bytes)) {
      throw new PrivateKeyError(
        'Invalid private key: secret out of valid range',
        'SET_PRIVATE_KEY_ERROR'
      );
    }
    return new Uint8Array(bytes);
  }

  /**
   * Checks if the private key is valid.
   *
   * @param {PrivateKeyBytes} bytes The private key bytes
   * @returns {boolean} True if the private key is valid, false otherwise
   */
  public static isValid(bytes: PrivateKeyBytes): boolean {
    return tinysecp.isPrivate(bytes);
  }

  /**
   * Create a new PrivateKey object from a bigint secret.
   *
   * @param {bigint} secret The secret bigint
   * @returns {PrivateKey} A new PrivateKey object
   */
  public static fromSecret(secret: bigint): PrivateKey {
    // Convert the secret bigint to a hex string
    const hexsecret = secret.toString(16).padStart(64, '0');
    // Convert the hex string to a Uint8Array
    const privateKeyBytes = new Uint8Array(hexsecret.match(/.{2}/g)!.map(byte => parseInt(byte, 16)));
    // Return a new PrivateKey object
    return new PrivateKey(privateKeyBytes);
  }

  /**
   * Computes the public key bytes from a private key bytes.
   *
   * @param {PrivateKeyBytes} privateKeyBytes The private key bytes
   * @returns {PublicKeyBytes} The public key bytes
   * @throws {PrivateKeyError} If the public key is not compressed or not derived
   */
  public static computePublicKey(privateKeyBytes: PrivateKeyBytes): PublicKeyBytes {
    // Derive the public key from the private key
    const publicKeyBytes = tinysecp.pointFromScalar(privateKeyBytes, true);

    // If no public key, throw error
    if (!publicKeyBytes) {
      throw new PrivateKeyError(
        'Invalid compute: failed to derive public key',
        'COMPUTE_PUBLIC_KEY_ERROR'
      );
    }

    // If public key is not compressed, throw error
    if(publicKeyBytes.length !== 33) {
      throw new PrivateKeyError(
        'Invalid compute: public key not compressed format',
        'COMPUTE_PUBLIC_KEY_ERROR'
      );
    }

    return publicKeyBytes;
  }

  /**
   * Static method to generate random private key bytes.
   *
   * @returns {PrivateKeyBytes} Uint8Array of 32 random bytes.
   */
  public static randomBytes(): PrivateKeyBytes {
    // Generate empty 32-byte array
    const byteArray = new Uint8Array(32);

    // Use the getRandomValues function to fill the byteArray with random values
    return getRandomValues(byteArray);
  }
}