import { PrivateKey } from './private-key.js';
import { PublicKey } from './public-key.js';
import { Hex,
  KeyPairJSON,
  PrefixBytes,
  PrivateKeyBytes,
  PrivateKeyJSON,
  PrivateKeyPoint,
  PrivateKeySecret,
  PublicKeyBytes,
  PublicKeyJSON,
  PublicKeyMultibaseBytes
} from '@did-btc1/common';

/**
 * Interface for the PrivateKey class.
 * @interface IPrivateKey
 * @type {IPrivateKey}
 */
export interface IPrivateKey {
  /**
   * Get the private key bytes.
   * @readonly @type {PrivateKeyBytes} The private key bytes.
   */
  bytes: PrivateKeyBytes;

  /**
   * Getter returns the private key bytes in secret form.
   * Setter allows alternative method of using a bigint secret to genereate the private key bytes.
   * @type {PrivateKeySecret} The private key secret.
   */
  secret: PrivateKeySecret;

  /**
   * Get the private key point.
   * @readonly @type {PrivateKeyPoint} The private key point.
   */
  point: PrivateKeyPoint;

  /**
   * Get the private key as a hex string.
   * @readonly @type {Hex} The private key as a hex string.
   */
  hex: Hex;

  /**
   * Checks if this private key is equal to another private key.
   *
   * @returns {boolean} True if the private keys are equal.
   */
  equals(other: PrivateKey): boolean;

  /**
   * Uses the private key to compute the corresponding public key.
   * @returns {PublicKeyBytes} A new PublicKey object.
   */
  computePublicKey(): PublicKeyBytes;

  /**
   * Checks if the private key is valid.
   * @returns {boolean} Whether the private key is valid.
   */
  isValid(): boolean;


  /**
   * JSON representation of a PrivateKey object.
   * @returns {PrivateKeyJSON} The PrivateKey as a JSON object.
   */
  json(): PrivateKeyJSON;
}


/**
 * Interface for the PublicKey class.
 * @interface IPublicKey
 * @type {IPublicKey}
 */
export interface IPublicKey {
  /**
   * Compressed public key getter.
   * @type {PublicKeyBytes} The 33 byte compressed public key [parity, x-coord].
   */
  bytes: PublicKeyBytes;

  /**
   * Uncompressed public key getter.
   * @readonly @type {PublicKeyBytes} The 65 byte uncompressed public key [0x04, x-coord, y-coord].
   */
  uncompressed: PublicKeyBytes;

  /**
   * Public key parity getter.
   * @readonly @type {number} The 1 byte parity (0x02 if even, 0x03 if odd).
   */
  parity: number;

  /**
   * Public key x-coordinate getter.
   * @readonly @type {PublicKeyBytes} The 32 byte x-coordinate of the public key.
   */
  x: PublicKeyBytes;

  /**
   * Public key y-coordinate getter.
   * @readonly @type {PublicKeyBytes} The 32 byte y-coordinate of the public key.
   */
  y: PublicKeyBytes;

  /**
   * Public key multibase getter.
   * @readonly @returns {string} The public key as a base58btc multibase string.
   */
  multibase: string;

  /**
   * Public key multibase prefix getter.
   * @readonly @type {PrefixBytes} The 2 byte multibase prefix.
   */
  prefix: PrefixBytes;

  /**
   * Public key hex string getter.
   * @readonly @type {Hex} The public key as a hex string.
   */
  hex: Hex;

  /**
   * Decode the base58btc multibase string to the compressed public key prefixed with 0x02.
   * @returns {PublicKeyMultibaseBytes} The public key as a 33-byte compressed public key with header.
   */
  decode(): PublicKeyMultibaseBytes;

  /**
   * Encode the PublicKey as an x-only base58btc multibase public key.
   * @returns {string} The public key formatted a base58btc multibase string.
   */
  encode(): string;

  /**
   * Public key equality check. Checks if `this` public key is equal to `other` public key.
   * @param {PublicKey} other The public key to compare.
   * @returns {boolean} True if the public keys are equal.
   */
  equals(other: PublicKey): boolean;

  /**
   * JSON representation of a PublicKey object.
   * @returns {PublicKeyJSON} The PublicKey as a JSON object.
   */
  json(): PublicKeyJSON;
}

/**
 * Interface for class KeyPair.
 * @interface IKeyPair
 * @type {IKeyPair}
 */
export interface IKeyPair {
  /**
   * @type {PublicKey} Get/set the public key associated with the key pair (required).
   */
  readonly publicKey: PublicKey;

  /**
   * @readonly
   * @type {PrivateKey} The private key associated with this key pair (optional).
   * @throws {KeyPairError} If the private key is not available.
   */
  readonly privateKey?: PrivateKey;


  /**
   * JSON representation of a KeyPair object.
   * @returns {KeyPairJSON} The key pair as a JSON object.
   */
  json(): KeyPairJSON;
}