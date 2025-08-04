import {
  BIP340_PUBLIC_KEY_MULTIBASE_PREFIX,
  BIP340_PUBLIC_KEY_MULTIBASE_PREFIX_HASH,
  CURVE,
  Hex,
  KeyBytes,
  Maybe,
  MultibaseObject,
  PublicKeyError,
  PublicKeyObject
} from '@did-btc1/common';
import { sha256 } from '@noble/hashes/sha2';
import { base58btc } from 'multiformats/bases/base58';
import { SecretKey } from './secret.js';
import { bigintToBytes, bytesToBigint } from './utils.js';

export interface Point {
  x: KeyBytes;
  y: KeyBytes;
}

/**
 * Interface for the PublicKey class.
 * @interface IPublicKey
 * @type {IPublicKey}
 */
export interface IPublicKey {
  /**
   * Uncompressed public key getter.
   * @readonly @type {KeyBytes} The 65 byte uncompressed public key [0x04, x-coord, y-coord].
   */
  uncompressed: KeyBytes;

  /**
   * Compressed public key getter.
   * @readonly @type {KeyBytes} The 33 byte compressed public key [parity, x-coord].
   */
  compressed: KeyBytes;

  /**
   * PublicKey parity getter.
   * @readonly @type {number} The 1 byte parity (0x02 if even, 0x03 if odd).
   */
  parity: number;

  /**
   * PublicKey x-coordinate getter.
   * @readonly @type {KeyBytes} The 32 byte x-coordinate of the public key.
   */
  x: KeyBytes;

  /**
   * PublicKey y-coordinate getter.
   * @readonly @type {KeyBytes} The 32 byte y-coordinate of the public key.
   */
  y: KeyBytes;

  /**
   * PublicKey multibase getter.
   * @readonly @returns {MultibaseObject} The public key as MultibaseObject as a address string, key and prefix bytes.
   */
  multibase: MultibaseObject;

  /**
   * PublicKey hex string getter.
   * @readonly @type {Hex} The public key as a hex string.
   */
  hex: Hex;

  /**
   * Decode the base58btc multibase string to the compressed public key prefixed with 0x02.
   * @returns {KeyBytes} The public key as a 33-byte compressed public key with header.
   */
  decode(): KeyBytes;

  /**
   * Encode the PublicKey as an x-only base58btc multibase public key.
   * @returns {string} The public key formatted a base58btc multibase string.
   */
  encode(): string;

  /**
   * PublicKey key equality check. Checks if `this` public key is equal to `other` public key.
   * @param {PublicKey} other The public key to compare.
   * @returns {boolean} True if the public keys are equal.
   */
  equals(other: PublicKey): boolean;

  /**
   * JSON representation of a PublicKey object.
   * @returns {PublicKeyObject} The PublicKey as a JSON object.
   */
  json(): PublicKeyObject;
}

/**
 * Encapsulates a secp256k1 public key compliant to BIP-340 BIP schnorr signature scheme.
 * Provides get methods for different formats (compressed, x-only, multibase).
 * Provides helpers methods for comparison and serialization.
 * @class PublicKey
 * @type {PublicKey}
 */
export class PublicKey implements PublicKey {
  /** @type {KeyBytes} The public key bytes */
  private readonly _bytes: KeyBytes;

  /** @type {MultibaseObject} The public key as a MultibaseObject */
  private _multibase: MultibaseObject = {
    prefix  : BIP340_PUBLIC_KEY_MULTIBASE_PREFIX,
    key     : [],
    address : ''
  };

  /**
   * Creates a PublicKey instance.
   * @param {KeyBytes} bytes The public key byte array.
   * @throws {PublicKeyError} if the byte length is not 32 (x-only) or 33 (compressed)
   */
  constructor(bytes: KeyBytes) {
    // If the byte length is not 33, throw an error
    if(bytes.length !== 33) {
      throw new PublicKeyError(
        'Invalid argument: byte length must be 33 (compressed)',
        'CONSTRUCTOR_ERROR', { bytes }
      );
    }
    // Set the bytes
    this._bytes = bytes;

    // Set multibase
    this._multibase.address = this.encode();
    this._multibase.key = [...this._multibase.prefix, ...this.compressed];
  }

  /**
   * Get the compressed public key.
   * @returns {KeyBytes} The 33-byte compressed public key (0x02 or 0x03, x).
   */
  get compressed(): KeyBytes {
    const bytes = new Uint8Array(this._bytes);
    return bytes;
  };

  /**
   * Get the uncompressed public key.
   * @returns {Uint8Array} The 65-byte uncompressed public key (0x04, x, y).
   */
  get uncompressed(): KeyBytes {
    const uncompressed = new Uint8Array([0x04, ...this.x, ...this.y]);
    return uncompressed;
  }

  /**
   * Get the parity byte of the public key.
   * @returns {number} The parity byte of the public key.
   */
  get parity(): number {
    const parity = this.compressed[0];
    return parity;
  }

  /**
   * Get the x-coordinate of the public key.
   * @returns {Uint8Array} The 32-byte x-coordinate of the public key.
   */
  get x(): KeyBytes {
    const x = this.compressed.slice(1, 33);
    return x;
  }

  /**
 * Get the y-coordinate of the public key.
 * If the key's original parity was odd (0x03), return `p - y` to normalize to even.
 * @returns {KeyBytes} The 32-byte y-coordinate of the public key.
 */
  get y(): KeyBytes {
    const y = this.uncompressed.slice(33, 65); // last 32 bytes of uncompressed
    if (this.parity === 0x03) {
      return this.negateY(y);
    }
    return y;
  }

  /**
   * Get the multibase public key.
   * @returns {MultibaseObject} An object containing the multibase bytes, address and prefix.
   */
  get multibase(): MultibaseObject {
    const multibase = this._multibase;
    return multibase;
  }

  /**
   * Returns the raw public key as a hex string.
   * @returns {Hex} The public key as a hex string.
   */
  get hex(): Hex {
    const hex = Buffer.from(this.compressed).toString('hex');
    return hex;
  }

  /**
   * Return the public key point.
   * @returns {Point} The public key point.
   */
  get point(): Point {
    return {
      x : this.x,
      y : this.y
    };
  }

  /**
   * Returns the point of the public key.
   * @param {Hex} pk The public key in hex (Uint8Array or string) format.
   * @returns {Point} The point of the public key.
   * @throws {PublicKeyError} If the public key is not a valid hex string or byte array.
   */
  static point(pk: Hex): Point {
    // If the public key is a hex string, convert it to a PublicKey object and return the point
    if(typeof pk === 'string' && /^[0-9a-fA-F]+$/.test(pk)) {
      const publicKey = new PublicKey(Buffer.fromHex(pk));
      return publicKey.point;
    }

    // If the public key is a byte array or ArrayBuffer, convert it to a PublicKey object and return the point
    if(pk instanceof Uint8Array || ArrayBuffer.isView(pk)) {
      const publicKey = new PublicKey(pk as KeyBytes);
      return publicKey.point;
    }

    // If the public key is neither a hex string nor a byte array, throw an error
    throw new PublicKeyError(
      'Invalid publicKey: must be a hex string or byte array',
      'POINT_ERROR', { publicKey: pk }
    );
  }

  /**
 * Negates a y-coordinate to produce the opposite parity (i.e., `p - y mod p`).
 * @param {KeyBytes} oddY The original y-coordinate
 * @returns {KeyBytes} The negated y-coordinate
 */
  private negateY(oddY: KeyBytes): KeyBytes {
    const y = bytesToBigint(oddY);
    const negated = (CURVE.p - y) % CURVE.p;
    return bigintToBytes(negated);
  }

  /**
   * Decodes the multibase string to the 35-byte corresponding public key (2 byte prefix + 32 byte public key).
   * @returns {KeyBytes} The decoded public key: prefix and public key bytes
   */
  public decode(): KeyBytes {
    // Decode the public key multibase string
    const decoded = base58btc.decode(this.multibase.address);

    // If the public key bytes are not 35 bytes, throw an error
    if(decoded.length !== 35) {
      throw new PublicKeyError(
        'Invalid argument: must be 35 byte publicKeyMultibase',
        'DECODE_MULTIBASE_ERROR'
      );
    }

    // Grab the prefix bytes
    const prefix = decoded.slice(0, 2);

    // Compute the prefix hash
    const prefixHash = Buffer.from(sha256(prefix)).toString('hex');

    // If the prefix hash does not equal the BIP340 prefix hash, throw an error
    if (prefixHash !== BIP340_PUBLIC_KEY_MULTIBASE_PREFIX_HASH) {
      throw new PublicKeyError(
        `Invalid prefix: malformed multibase prefix ${prefix}`,
        'DECODE_MULTIBASE_ERROR'
      );
    }

    // Return the decoded public key bytes
    return decoded;
  }

  /**
   * Encodes compressed secp256k1 public key from bytes to BIP340 multibase format.
   * @returns {string} The public key encoded in base-58-btc multibase format.
   */
  public encode(): string {
    // Convert public key bytes to an array
    const pk = this.compressed.toArray();

    // Ensure the public key is 33-byte secp256k1 compressed public key
    if (pk.length !== 33) {
      throw new PublicKeyError(
        'Invalid argument: must be 33-byte (compressed) public key',
        'ENCODE_MULTIBASE_ERROR'
      );
    }

    // Convert prefix to an array
    const publicKeyMultibase = BIP340_PUBLIC_KEY_MULTIBASE_PREFIX.toArray();

    // Push the public key bytes at the end of the prefix
    publicKeyMultibase.push(...pk);

    // Encode the bytes in base58btc format and return
    return base58btc.encode(publicKeyMultibase.toUint8Array());
  }

  /**
   * Compares this public key to another public key.
   * @param {PublicKey} other The other public key to compare
   * @returns {boolean} True if the public keys are equal, false otherwise.
   */
  public equals(other: PublicKey): boolean {
    return this.hex === other.hex;
  }

  /**
   * JSON representation of a PublicKey object.
   * @returns {PublicKeyObject} The PublicKey as a JSON object.
   */
  public json(): PublicKeyObject {
    return {
      hex       : this.hex,
      multibase : this.multibase,
      point     : {
        x      : this.x.toArray(),
        y      : this.y.toArray(),
        parity : this.parity,
      },
    };
  }

  /**
   * Creates a PublicKey object from a JSON representation.
   * @param {PublicKeyObject} json The JSON object to initialize the PublicKey.
   * @returns {PublicKey} The initialized PublicKey object.
   */
  public static fromJSON(json: Maybe<PublicKeyObject>): PublicKey {
    json.x.unshift(json.parity);
    return new PublicKey(json.x.toUint8Array());
  }

  /**
   * Computes the deterministic public key for a given private key.
   * @param {PrivateKey | KeyBytes} sk The PrivateKey object or the private key bytes
   * @returns {PublicKey} A new PublicKey object
   */
  public static fromSecretKey(sk: SecretKey | KeyBytes): PublicKey {
    // If the private key is a PrivateKey object, get the raw bytes else use the bytes
    const bytes = sk instanceof SecretKey ? sk.bytes : sk;

    // Throw error if the private key is not 32 bytes
    if(bytes.length !== 32) {
      throw new PublicKeyError('Invalid arg: must be 32 byte private key', 'FROM_PRIVATE_KEY_ERROR');
    }

    // Compute the public key from the private key
    const privateKey = sk instanceof SecretKey ? sk : new SecretKey(sk);

    // Return a new PublicKey object
    return new PublicKey(privateKey.computePublicKey());
  }

  /**
   * Computes modular exponentiation: (base^exp) % mod.
   * Used for computing modular square roots.
   * @param {bigint} base The base value
   * @param {bigint} exp The exponent value
   * @param {bigint} mod The modulus value
   * @returns {bigint} The result of the modular exponentiation
   */
  public modPow(base: bigint, exp: bigint, mod: bigint): bigint {
    let result = 1n;
    while (exp > 0n) {
      if (exp & 1n) result = (result * base) % mod;
      base = (base * base) % mod;
      exp >>= 1n;
    }
    return result;
  };

  /**
   * Computes `sqrt(a) mod p` using Tonelli-Shanks algorithm.
   * This finds `y` such that `y^2 ≡ a mod p`.
   * @param {bigint} a The value to find the square root of
   * @param {bigint} p The prime modulus
   * @returns {bigint} The square root of `a` mod `p`
   */
  public sqrtMod(a: bigint, p: bigint): bigint {
    return this.modPow(a, (p + 1n) >> 2n, p);
  };

  /**
   * Lifts a 32-byte x-only coordinate into a full secp256k1 point (x, y).
   * @param xBytes 32-byte x-coordinate
   * @returns {Uint8Array} 65-byte uncompressed public key (starts with `0x04`)
   */
  public liftX(): Uint8Array {
    // Ensure x-coordinate is 32 bytes
    if (this.x.length !== 32) {
      throw new PublicKeyError('Invalid argument: x-coordinate length must be 32 bytes', 'LIFT_X_ERROR');
    }

    // Convert x from Uint8Array → BigInt
    const x = BigInt('0x' + Buffer.from(this.x).toString('hex'));
    if (x <= 0n || x >= CURVE.p) {
      throw new PublicKeyError('Invalid conversion: x out of range as BigInt', 'LIFT_X_ERROR');
    }

    // Compute y² = x³ + 7 mod p
    const ySquared = BigInt((x ** 3n + CURVE.b) % CURVE.p);

    // Compute y (do not enforce parity)
    const y = this.sqrtMod(ySquared, CURVE.p);

    // Convert x and y to Uint8Array
    const yBytes = Buffer.fromHex(y.toString(16).padStart(64, '0'));

    // Return 65-byte uncompressed public key: `0x04 || x || y`
    return new Uint8Array(Buffer.concat([Buffer.from([0x04]), Buffer.from(this.x), yBytes]));
  };

  /**
   * Static version of liftX method.
   * @param {KeyBytes} x The 32-byte x-coordinate to lift.
   * @returns {Uint8Array} The 65-byte uncompressed public key (0x04, x, y).
   */
  public static xOnly(x: KeyBytes): Uint8Array {
    // Ensure x-coordinate is 32 bytes
    if (x.length !== 32) {
      throw new PublicKeyError('Invalid argument: x-coordinate length must be 32 bytes', 'LIFT_X_ERROR');
    }

    // Create a PublicKey instance and lift the x-coordinate
    const publicKey = new PublicKey(x);
    return publicKey.x;
  }
}