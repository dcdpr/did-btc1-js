import { KeyBytes } from '@did-btc1/common';

export function bytesToBigint(bytes: KeyBytes): bigint {
  return BigInt('0x' + Buffer.from(bytes).toString('hex'));
}

export function bigintToBytes(bi: bigint): KeyBytes {
  return Buffer.from(bi.toString(16).padStart(64, '0'), 'hex') as KeyBytes;
}