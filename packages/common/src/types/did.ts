export type DID = 'did';
export type MethodName = string;
export type MethodSpecificId = string;
export type DecentralizedIdentifierExplicit = `${DID}:${MethodName}:${MethodSpecificId}`;
export type DecentralizedIdentifier = string;
export type Btc1MethodName = 'btc1';
export type Btc1DeterministicPrefix = 'k';
export type Btc1ExternalPrefix = 'x';
export type Btc1Prefix = `${Btc1DeterministicPrefix | Btc1ExternalPrefix}1`;
export type Bech32Id = string;
export type Btc1Id = `${Btc1Prefix}${Bech32Id}`
export type Btc1IdentifierExplicit = `${DID}:${Btc1MethodName}:${Btc1Id}`;
export type Btc1Identifier = string;
export type Controller = Btc1Identifier;
export type Id = 'initialKey';
export type FullId = `${Controller}#${Id}`;
export enum Btc1IdentifierTypes {
    KEY = 'KEY',
    EXTERNAL = 'EXTERNAL'
}
export enum Btc1IdentifierHrp {
    k = 'k',
    x = 'x'
}
export enum BitcoinNetworkNames {
    bitcoin = 0,
    signet = 1,
    regtest = 2,
    testnet3 = 3,
    testnet4 = 4
}
export type KeyIdentifier = string;
export type BeaconUri = string;
export type DidPlaceholder = 'did:btc1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
export type CanonicalizedProofConfig = string;
export type CryptosuiteName = 'bip340-jcs-2025' | 'bip340-rdfc-2025';
export type ContextObject = Record<string | number | symbol, any>;
export type Context = string | string[] | ContextObject | ContextObject[]