import { Bytes, Hex } from '@did-btc1/common';
import { sha256 } from '@noble/hashes/sha2';

// Fixed public key header bytes per the Data Integrity BIP340 Cryptosuite spec: [0xe7, 0x01] / [231, 1]
export const BIP340_PUBLIC_KEY_MULTIBASE_PREFIX: Bytes = new Uint8Array([0xe7, 0x01]);
// Hash of the BIP-340 Multikey prefix
export const BIP340_PUBLIC_KEY_MULTIBASE_PREFIX_HASH: Hex = Buffer.from(sha256(BIP340_PUBLIC_KEY_MULTIBASE_PREFIX)).toString('hex');
// Fixed secret key header bytes per the Data Integrity BIP340 Cryptosuite spec: [0x81, 0x26] / [129, 38]
export const BIP340_SECRET_KEY_MULTIBASE_PREFIX: Bytes = new Uint8Array([0x81, 0x26]);
// Hash of the BIP-340 Multikey prefix
export const BIP340_SECRET_KEY_MULTIBASE_PREFIX_HASH: Hex = Buffer.from(sha256(BIP340_SECRET_KEY_MULTIBASE_PREFIX)).toString('hex');
// curve's field size
export const B256 = 2n ** 256n;
// curve's field prime
export const P = B256 - 0x1000003d1n;
// curve (group) order
export const N = B256 - 0x14551231950b75fc4402da1732fc9bebfn;
// base point x
export const Gx = 0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n;
// base point y
export const Gy = 0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n;
// curve parameters
export const a = 0n;
export const b = 7n;
export const p = P;
export const n = N;
export const CURVE = {
  p,
  n,
  a,
  b,
  Gx,
  Gy
};
