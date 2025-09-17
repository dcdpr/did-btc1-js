import { KeyBytes } from '@did-btcr2/common';
import { Secp256k1CompressedPublicKey } from './public.js';
import { Secp256k1SecretKey } from './secret.js';

export type RawSchnorrKeyPair = {
  public: KeyBytes;
  secret?: KeyBytes
}

/** Params for the {@link SchnorrKeyPair} constructor */
export interface SchnorrKeyPairParams {
  secret?: Secp256k1SecretKey | KeyBytes;
  public?: Secp256k1CompressedPublicKey | KeyBytes;
}

export interface MultibaseKeys {
  publicKeyMultibase: string;
  secretKeyMultibase: string
}