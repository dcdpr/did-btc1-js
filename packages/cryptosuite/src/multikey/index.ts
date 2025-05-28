import { Hex, MULTIKEY_VERIFICATION_METHOD_ERROR, MultikeyError, SignatureBytes } from '@did-btc1/common';
import { KeyPair, PrivateKey, PublicKey } from '@did-btc1/key-pair';
import { schnorr, secp256k1 } from '@noble/curves/secp256k1';
import { DidVerificationMethod } from '@web5/dids';
import { randomBytes } from 'crypto';
import { base58btc } from 'multiformats/bases/base58';
import { Cryptosuite } from '../cryptosuite/index.js';
import { FromPrivateKey, FromPublicKey, FromPublicKeyMultibaseParams, IMultikey, MultikeyJSON, MultikeyParams } from './interface.js';

/**
 * Implements {@link https://dcdpr.github.io/data-integrity-schnorr-secp256k1/#multikey | 2.1.1 Multikey}
 * A Multikey is a secp256k1 compressed keypair that creates and verifies schnorr signatures.
 * The publicKeyMultibase is the Multikey public key encoded using base58btc algorithm with `z` identifier character.
 * @class Multikey
 * @type {Multikey}
 */
export class Multikey implements IMultikey {
  /** @type {string} The verification metod type */
  public static readonly type: string = 'Multikey';

  /** @type {string} The id references which key to use for various operations in the DID Document */
  public readonly id: string;

  /** @type {string} The controller is the DID that controls the keys and information in the DID DOcument */
  public readonly controller: string;

  /** @type {PrivateKeyBytes} The private key bytes for the multikey (optional) */
  // private readonly _privateKey?: PrivateKeyBytes;
  private readonly _keyPair: KeyPair;

  /**
   * Creates an instance of Multikey.
   *
   * @param {MultikeyParams} params The parameters to create the multikey
   * @param {string} params.id The id of the multikey (required)
   * @param {string} params.controller The controller of the multikey (required)
   * @param {KeyPair} params.keypair The keypair of the multikey (optional, required if no publicKey)
   * @param {PublicKeyBytes} params.keypair.publicKey The public key of the multikey (optional, required if no privateKey)
   * @param {PrivateKeyBytes} params.keypair.privateKey The private key of the multikey (optional)
   * @throws {MultikeyError} if neither a publicKey nor a privateKey is provided
   */
  constructor({ id, controller, keyPair }: MultikeyParams) {
    // If no keypair passed, throw an error
    if (!keyPair) {
      throw new MultikeyError('Argument missing: "keyPair" required', 'MULTIKEY_CONSTRUCTOR_ERROR');
    }

    // If the keypair does not have a public key, throw an error
    if(!keyPair.publicKey) {
      throw new MultikeyError('Argument missing: "keyPair" must contain a "publicKey"', 'MULTIKEY_CONSTRUCTOR_ERROR');
    }

    // Set the class variables
    this.id = id;
    this.controller = controller;
    this._keyPair = keyPair;
  }

  /** @type {KeyPair} @readonly Get the Multikey KeyPair. */
  get keyPair(): KeyPair {
    // Return a copy of the keypair
    const keyPair = this._keyPair;
    return keyPair;
  }

  /** @type {PublicKey} @readonly Get the Multikey PublicKey. */
  get publicKey(): PublicKey {
    // Create and return a copy of the keyPair.publicKey
    const publicKey = this.keyPair.publicKey;
    return publicKey;
  }

  /** @type {PrivateKey} @readonly Get the Multikey PrivateKey. */
  get privateKey(): PrivateKey {
    // Create and return a copy of the keyPair.privateKey
    const privateKey = this.keyPair.privateKey;
    // If there is no private key, throw an error
    if(!this.isSigner) {
      throw new MultikeyError('Cannot get: no privateKey', 'MULTIKEY_PRIVATE_KEY_ERROR');
    }
    return privateKey;
  }

  /**
   * Constructs an instance of Cryptosuite from the current Multikey instance.
   * @public
   * @param {('bip340-jcs-2025' | 'bip340-rdfc-2025')} [cryptosuite='bip340-rdfc-2025']
   * @returns {Cryptosuite}
   */
  public toCryptosuite(cryptosuite: 'bip340-jcs-2025' | 'bip340-rdfc-2025' = 'bip340-jcs-2025'): Cryptosuite {
    return new Cryptosuite({ cryptosuite, multikey: this });
  }

  /**
   * Produce a schnorr signature over arbitrary data.
   * @param {MessageBytes} data Data to be signed.
   * @returns {SignatureBytes} Signature byte array.
   * @throws {MultikeyError} if no private key is provided.
   */
  public sign(data: Hex): SignatureBytes {
    // If there is no private key, throw an error
    if (!this.isSigner) {
      throw new MultikeyError('Cannot sign: no privateKey', 'MULTIKEY_SIGN_ERROR');
    }
    // Sign the hashb and return it
    return schnorr.sign(data, this.privateKey.bytes, randomBytes(32));
  }

  /**
   * Produce an ecdsa signature over arbitrary data.
   * @param {MessageBytes} data Data to be signed.
   * @returns {SignatureBytes} Signature byte array.
   * @throws {MultikeyError} if no private key is provided.
   */
  public signEcdsa(data: Hex): SignatureBytes {
    // If there is no private key, throw an error
    if (!this.isSigner) {
      throw new MultikeyError('Cannot sign: no privateKey', 'MULTIKEY_SIGN_ERROR');
    }
    // Sign the hashb and return it
    return secp256k1.sign(data, this.privateKey.bytes, { lowS: true }).toCompactRawBytes();
  }

  /**
   * Verify a schnorr signature.
   * @param {SignatureBytes} signature Signature for verification.
   * @param {string} data Data for verification.
   * @returns {boolean} If the signature is valid against the public key.
   */
  public verify(signature: SignatureBytes, data: Hex): boolean {
    // Verify the signature and return the result
    return schnorr.verify(signature, data, this.publicKey.x);
  }

  /**
   * Verify an ecdsa signature.
   * @param {SignatureBytes} signature Signature for verification.
   * @param {string} data Data for verification.
   * @returns {boolean} If the signature is valid against the public key.
   */
  public verifyEcdsa(signature: SignatureBytes, data: Hex): boolean {
    // Verify the signature and return the result
    return secp256k1.verify(signature, data, this.publicKey.x);
  }

  /**
   * Get the full id of the multikey
   * @returns {string} The full id of the multikey
   */
  public fullId(): string {
    // If the id starts with "#", return concat(controller, id); else return id
    return `${this.controller}${this.id}`;
  }

  /**
   * Convert the multikey to a verification method.
   * @returns {DidVerificationMethod} The verification method.
   */
  public toVerificationMethod(): DidVerificationMethod {
    // Construct and return the verification method
    return {
      id                 : this.id,
      type               : Multikey.type,
      controller         : this.controller,
      publicKeyMultibase : this.publicKey.multibase
    };
  }

  /**
   * Convert a verification method to a multikey.
   * @param {DidVerificationMethod} verificationMethod The verification method to convert.
   * @returns {Multikey} Multikey instance.
   * @throws {MultikeyError}
   * if the verification method is missing required fields.
   * if the verification method has an invalid type.
   * if the publicKeyMultibase has an invalid prefix.
   */
  public fromVerificationMethod(verificationMethod: DidVerificationMethod): Multikey {
    // Destructure the verification method
    const { id, controller, publicKeyMultibase, type } = verificationMethod;

    // Check if the required field id is missing
    if (!id) {
      throw new MultikeyError(
        'Missing "id" in verificationMethod',
        MULTIKEY_VERIFICATION_METHOD_ERROR, { verificationMethod }
      );
    }

    // Check if the required field controller is missing
    if (!controller) {
      throw new MultikeyError(
        'Missing "controller" in verificationMethod',
        MULTIKEY_VERIFICATION_METHOD_ERROR, { verificationMethod }
      );
    }

    // Check if the required field publicKeyMultibase is missing
    if (!publicKeyMultibase) {
      throw new MultikeyError(
        'Missing "publicKeyMultibase" in verificationMethod',
        MULTIKEY_VERIFICATION_METHOD_ERROR, { verificationMethod }
      );
    }

    // Check if the type is not Multikey
    if (type !== 'Multikey') {
      throw new MultikeyError(
        'Invalid value: verificationMethod type is invalid',
        MULTIKEY_VERIFICATION_METHOD_ERROR, { verificationMethod }
      );
    }

    // Decode the public key multibase
    const decoded = this.publicKey.decode();

    // Get the 32 byte public key from the multibase
    const publicKey = decoded.slice(2, decoded.length);

    // Construct a new PublicKey from the publicKey and a new KeyPair from the PublicKey
    const keyPair = new KeyPair({ publicKey: new PublicKey(publicKey) });

    // Return a new Multikey instance
    return new Multikey({ id, controller, keyPair });
  }

  /** @type {boolean} @readonly Get signing ability of the Multikey (i.e. is there a valid privateKey). */
  get isSigner(): boolean {
    return !!this.keyPair.privateKey;
  }

  /**
   * Convert the multikey to a JSON object.
   * @returns {MultikeyJSON} The multikey as a JSON object.
   */
  public json(): MultikeyJSON {
    return {
      id                 : this.id,
      controller         : this.controller,
      fullId             : this.fullId(),
      isSigner           : this.isSigner,
      keyPair            : this.keyPair.json(),
      verificationMethod : this.toVerificationMethod()
    };
  }

  /**
   * Static convenience method to create a new Multikey instance.
   * @param {MultikeyParams} params The parameters to create the multikey
   * @param {string} params.id The id of the multikey (required)
   * @param {string} params.controller The controller of the multikey (required)
   * @param {KeyPair} params.keypair The keypair of the multikey (optional, required if no publicKey)
   * @param {PublicKeyBytes} params.keypair.publicKey The public key of the multikey (optional, required if no privateKey)
   * @param {PrivateKeyBytes} params.keypair.privateKey The private key of the multikey (optional)
   * @throws {MultikeyError} if neither a publicKey nor a privateKey is provided
   * @returns {Multikey} A new Multikey instance
   */
  public static initialize({ id, controller, keyPair }: MultikeyParams): Multikey {
    return new Multikey({ id, controller, keyPair });
  }
}

/**
 * A utility class for creating `Multikey` instances
 * @class MultikeyUtils
 * @type {MultikeyUtils}
 */
export class MultikeyUtils {
  /**
   * Creates a `Multikey` instance from a private key
   *
   * @param {FromPublicKey} params The parameters to create the multikey
   * @param {string} params.id The id of the multikey
   * @param {string} params.controller The controller of the multikey
   * @param {PrivateKeyBytes} params.privateKeyBytes The private key bytes for the multikey
   * @returns {Multikey} The new multikey instance
   */
  public static fromPrivateKey({ id, controller, privateKeyBytes }: FromPrivateKey): Multikey {
    // Create a new PrivateKey from the private key bytes
    const privateKey = new PrivateKey(privateKeyBytes);

    // Compute the public key from the private key
    const publicKey = privateKey.computePublicKey();

    // Create a new KeyPair from the private key
    const keyPair = new KeyPair({ publicKey, privateKey });

    // Return a new Multikey instance
    return new Multikey({ id, controller, keyPair });
  }

  /**
   * Creates a `Multikey` instance from a public key
   *
   * @param {FromPublicKey} params The parameters to create the multikey
   * @param {string} params.id The id of the multikey
   * @param {string} params.controller The controller of the multikey
   * @param {PublicKeyBytes} params.publicKeyBytes The public key bytes for the multikey
   * @returns {Multikey} The new multikey instance
   */
  public static fromPublicKey({ id, controller, publicKeyBytes }: FromPublicKey): Multikey {
    // Create a new PublicKey from the public key bytes
    const keyPair = new KeyPair({ publicKey: new PublicKey(publicKeyBytes) });

    // Return a new Multikey instance
    return new Multikey({ id, controller, keyPair });
  }

  /**
   * Creates a `Multikey` instance from a public key multibase.
   *
   * @param {FromPublicKeyMultibaseParams} params See {@link FromPublicKeyMultibaseParams} for details.
   * @param {string} params.id The id of the multikey.
   * @param {string} params.controller The controller of the multikey.
   * @param {string} params.publicKeyMultibase The public key multibase for the multikey.
   * @returns {Multikey} The new multikey instance.
   */
  public static fromPublicKeyMultibase({
    id,
    controller,
    publicKeyMultibase
  }: FromPublicKeyMultibaseParams): Multikey {
    // Decode the public key multibase using base58btc
    const publicKeyMultibaseBytes = base58btc.decode(publicKeyMultibase);

    // Check if the publicKeyMultibase is not a valid multikey
    if(publicKeyMultibaseBytes.length !== 35) {
      throw new MultikeyError(
        `Invalid publicKeyMultibase length: ${publicKeyMultibaseBytes.length}`,
        MULTIKEY_VERIFICATION_METHOD_ERROR, { publicKeyMultibase }
      );
    }

    // Get the 33 byte public key
    const publicKey = publicKeyMultibaseBytes.slice(2);

    // Construct a new KeyPair from the public key
    const keyPair = new KeyPair({ publicKey });

    // Return a new Multikey instance
    return new Multikey({ id, controller, keyPair });
  }
}