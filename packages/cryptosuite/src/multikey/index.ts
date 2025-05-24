import { Btc1Error, Hex, MULTIKEY_VERIFICATION_METHOD_ERROR, MultikeyError, SignatureBytes } from '@did-btc1/common';
import { KeyPair, PrivateKey, PublicKey } from '@did-btc1/key-pair';
import { secp256k1, schnorr } from '@noble/curves/secp256k1';
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

  /** @see IMultikey.keyPair */
  get keyPair(): KeyPair {
    // Return a copy of the keypair
    const keyPair = this._keyPair;
    return keyPair;
  }

  /** @see IMultikey.publicKey */
  get publicKey(): PublicKey {
    // Create and return a copy of the keyPair.publicKey
    const publicKey = this.keyPair.publicKey;
    return publicKey;
  }

  /** @see IMultikey.privateKey */
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
   * Produce signed data with a private key.
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

  public signEcdsa(data: Hex): SignatureBytes {
    // If there is no private key, throw an error
    if (!this.isSigner) {
      throw new MultikeyError('Cannot sign: no privateKey', 'MULTIKEY_SIGN_ERROR');
    }
    // Sign the hashb and return it
    return secp256k1.sign(data, this.privateKey.bytes, { lowS: true }).toCompactRawBytes();
  }

  /** @see IMultikey.verify */
  public verify(signature: SignatureBytes, data: Hex): boolean {
    // Verify the signature and return the result
    return schnorr.verify(signature, data, this.publicKey.x);
  }

  /** @see IMultikey.fullId */
  public fullId(): string {
    // If the id starts with "#", return concat(controller, id); else return id
    return this.id.startsWith('#') ? `${this.controller}${this.id}` : this.id;
  }

  /** @see IMultikey.toVerificationMethod */
  public toVerificationMethod(): DidVerificationMethod {
    // Construct and return the verification method
    return {
      id                 : this.id,
      type               : Multikey.type,
      controller         : this.controller,
      publicKeyMultibase : this.publicKey.multibase
    };
  }

  /** @see IMultikey.fromVerificationMethod */
  public fromVerificationMethod(vm: DidVerificationMethod): Multikey {
    // Destructure the verification method
    const { id, controller, publicKeyMultibase, type } = vm;

    // Check if the required field id is missing
    if (!id) {
      throw new Btc1Error(`Missing "id" in verificationMethod`, MULTIKEY_VERIFICATION_METHOD_ERROR, { vm });
    }

    // Check if the required field controller is missing
    if (!controller) {
      throw new Btc1Error(`Missing "controller" in verificationMethod`, MULTIKEY_VERIFICATION_METHOD_ERROR, { vm });
    }

    // Check if the required field publicKeyMultibase is missing
    if (!publicKeyMultibase) {
      throw new Btc1Error(`Missing "publicKeyMultibase" in verificationMethod`, MULTIKEY_VERIFICATION_METHOD_ERROR, { vm });
    }

    // Check if the type is not Multikey
    if (type !== 'Multikey') {
      throw new Btc1Error(`Invalid value: verificationMethod type is invalid`, MULTIKEY_VERIFICATION_METHOD_ERROR, { vm });
    }

    // Decode the public key multibase
    const multibase = this.publicKey.decode();

    // Get the 32 byte public key from the multibase
    const publicKey = multibase.slice(2, multibase.length);

    // Construct a new PublicKey from the publicKey and a new KeyPair from the PublicKey
    const keyPair = new KeyPair({ publicKey: new PublicKey(publicKey) });

    // Return a new Multikey instance
    return new Multikey({ id, controller, keyPair });
  }


  /** @see IMultikey.isSigner */
  get isSigner(): boolean {
    return !!this.keyPair.privateKey;
  }

  /** @see IMultikey.json */
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