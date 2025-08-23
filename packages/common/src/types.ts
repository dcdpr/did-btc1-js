import { HDKey } from '@scure/bip32';

/* Crypto Types */
export type Hex = Uint8Array | string;
export type SignatureHex = Hex;
export type HashHex = Hex;

export type Bytes = Uint8Array;
export type DocumentBytes = Bytes;
export type SignatureBytes = Bytes;
export type ProofBytes = Bytes;
export type HashBytes = Bytes;
export type MessageBytes = Bytes;
export type Entropy = Bytes | bigint;

export type CompressedPublicKeyParityByte = 0x02 | 0x03;
export type Bip340Encoding = string;
export type Base58BtcPrefix = 'z';

export type KeyBytes = Bytes;
export type Point = {
  x: Array<number>;
  y: Array<number>;
  parity: number;
}
export type PublicKeyObject = {
  point: Point;
  hex: Hex;
  multibase: MultibaseObject;
};
export type SecretKeyObject = {
  bytes: Array<number>;
  seed?: string;
  hex?: Hex;
};
export type SchnorrKeyPair = {
  secretKey: KeyBytes;
  publicKey: KeyBytes;
};
export type SchnorrKeyPairObject = {
  secretKey: SecretKeyObject;
  publicKey: PublicKeyObject;
};
export type MultibaseObject = {
  prefix: Bytes;
  key: Array<number>;
  encoded: string;
};
export type HdWallet = {
    mnemonic: string;
    hdkey: HDKey
};

/* DID Types */
export type DID = 'did';
export type MethodName = string;
export type MethodSpecificId = string;
export type DecentralizedIdentifierExplicit = `${DID}:${MethodName}:${MethodSpecificId}`;
export type DecentralizedIdentifier = string;
export type Btcr2MethodName = 'btcr2';
export type Btcr2DeterministicPrefix = 'k';
export type Btcr2ExternalPrefix = 'x';
export type Btcr2Prefix = `${Btcr2DeterministicPrefix | Btcr2ExternalPrefix}1`;
export type Bech32Id = string;
export type Btcr2Id = `${Btcr2Prefix}${Bech32Id}`
export type Btcr2IdentifierExplicit = `${DID}:${Btcr2MethodName}:${Btcr2Id}`;
export type Btcr2Identifier = string;
export type Controller = Btcr2Identifier;
export type Id = 'initialKey';
export type FullId = `${Controller}#${Id}`;
export enum Btcr2IdentifierTypes {
    KEY = 'KEY',
    EXTERNAL = 'EXTERNAL'
}
export enum Btcr2IdentifierHrp {
    k = 'k',
    x = 'x'
}
export enum BitcoinNetworkNames {
    bitcoin = 0,
    signet = 1,
    regtest = 2,
    testnet3 = 3,
    testnet4 = 4,
    mutinynet = 5
}
export type KeyIdentifier = string;
export type BeaconUri = string;
export type DidPlaceholder = 'did:btcr2:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
export type CanonicalizedProofConfig = string;
export type CryptosuiteName = 'bip340-jcs-2025' | 'bip340-rdfc-2025';
export type ContextObject = Record<string | number | symbol, any>;
export type Context = string | string[] | ContextObject | ContextObject[]

/* General Types */
export type Maybe<T> = T | any;
export type JSONObject = Record<string | number | symbol, any>; // JSON object: prototyped or unprototyped
export type Prototyped = JSONObject;
export type Unprototyped = JSONObject;
export type TwoDigits = `${number}${number}`;
export type ThreeDigits = `${number}${number}${number}`;
export type Year = `${1 | 2}${ThreeDigits}`;
export type Month = TwoDigits;
export type Day = TwoDigits;
export type Hours = TwoDigits;
export type Minutes = TwoDigits;
export type Seconds = TwoDigits;
export type UtcTimestamp = `${Year}-${Month}-${Day}T${Hours}:${Minutes}:${Seconds}`;
export type TzOffset = `${Hours}:${Minutes}`;
export type DateTimestamp = `${UtcTimestamp}Z` | `${UtcTimestamp}-${TzOffset}`;
export type CanonicalizableObject = Record<string, any>;
export type CanonicalizationAlgorithm = 'jcs' | 'rdfc';
export type UnixTimestamp = number;