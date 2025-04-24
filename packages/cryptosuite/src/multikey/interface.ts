import { KeyPairJSON, MessageBytes, PrivateKeyBytes, PublicKeyBytes, SignatureBytes } from '@did-btc1/common';
import { KeyPair, PrivateKey, PublicKey } from '@did-btc1/key-pair';
import { DidVerificationMethod } from '@web5/dids';
import { Multikey } from './index.js';

export type MultikeyJSON = {
  id: string;
  controller: string;
  fullId: string;
  isSigner: boolean;
  keyPair: KeyPairJSON;
  verificationMethod: DidVerificationMethod;
}
export interface DidParams {
  id: string;
  controller: string;
}

export interface FromPrivateKey extends DidParams {
  privateKeyBytes: PrivateKeyBytes;
}
export interface FromPublicKey extends DidParams {
  publicKeyBytes: PublicKeyBytes;
}
export interface MultikeyParams extends DidParams {
  keyPair?: KeyPair;
}
export interface FromPublicKeyMultibaseParams extends DidParams {
  publicKeyMultibase: string;
}

/**
 * Interface representing a BIP340 Multikey.
 * @interface IMultikey
 */
export interface IMultikey {
  /** @type {string} @readonly Get the Multikey id. */
  readonly id: string;

  /** @type {string} @readonly Get the Multikey controller. */
  readonly controller: string;

  /** @type {KeyPair} @readonly Get the Multikey KeyPair. */
  readonly keyPair: KeyPair;

  /** @type {PublicKey} @readonly Get the Multikey PublicKey. */
  readonly publicKey: PublicKey;

  /** @type {PrivateKey} @readonly Get the Multikey PrivateKey. */
  readonly privateKey?: PrivateKey;

  /** @type {boolean} @readonly Get signing ability of the Multikey (i.e. is there a valid privateKey). */
  readonly isSigner: boolean;

  /**
   * Produce signed data with a private key.
   * @param {MessageBytes} data Data to be signed.
   * @returns {SignatureBytes} Signature byte array.
   * @throws {MultikeyError} if no private key is provided.
   */
  sign(data: MessageBytes): SignatureBytes;

  /**
   * Verify a signature.
   * @param {SignatureBytes} signature Signature for verification.
   * @param {string} message Data for verification.
   * @returns {boolean} If the signature is valid against the public key.
   */
  verify(signature: SignatureBytes, message: string): boolean;

  /**
   * Get the full id of the multikey
   * @returns {string} The full id of the multikey
   */
  fullId(): string

  /**
   * Convert the multikey to a verification method.
   * @returns {DidVerificationMethod} The verification method.
   */
  toVerificationMethod(): DidVerificationMethod;

  /**
   * Convert a verification method to a multikey.
   * @param {DidVerificationMethod} verificationMethod The verification method to convert.
   * @returns {Multikey} Multikey instance.
   * @throws {MultikeyError}
   * if the verification method is missing required fields.
   * if the verification method has an invalid type.
   * if the publicKeyMultibase has an invalid prefix.
   */
  fromVerificationMethod(verificationMethod: DidVerificationMethod): Multikey;

  /**
   * Convert the multikey to a JSON object.
   * @returns {MultikeyJSON} The multikey as a JSON object.
   */
  json(): MultikeyJSON;
}