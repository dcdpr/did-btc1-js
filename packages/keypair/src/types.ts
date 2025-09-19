import { KeyBytes } from '@did-btcr2/common';
import { CompressedSecp256k1PublicKey } from './public.js';
import { Secp256k1SecretKey } from './secret.js';

export type RawSchnorrKeyPair = {
  public: KeyBytes;
  secret?: KeyBytes
}

/** Params for the {@link SchnorrKeyPair} constructor */
export interface SchnorrKeyPairParams {
  secretKey?: Secp256k1SecretKey | KeyBytes;
  publicKey?: CompressedSecp256k1PublicKey | KeyBytes;
}

export interface MultibaseKeys {
  publicKeyMultibase: string;
  secretKeyMultibase: string
}