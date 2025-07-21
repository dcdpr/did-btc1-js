[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / CryptoSigner

# Interface: CryptoSigner

Defined in: [packages/method/src/btc1/key-manager/interface.ts:95](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/interface.ts#L95)

## Methods

### digest()

> **digest**(`data`): `Bytes`

Defined in: [packages/method/src/btc1/key-manager/interface.ts:118](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/interface.ts#L118)

Returns the sha256 hash of the input data.

#### Parameters

##### data

`Uint8Array`

The data to hash.

#### Returns

`Bytes`

The sha256 hash of the input data.

***

### sign()

> **sign**(`data`, `keyUri?`): `Promise`\<`Bytes`\>

Defined in: [packages/method/src/btc1/key-manager/interface.ts:102](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/interface.ts#L102)

Signs a message with a key pair.

#### Parameters

##### data

`Hex`

The data to sign.

##### keyUri?

`string`

The URI of the key to sign the data with.

#### Returns

`Promise`\<`Bytes`\>

The signature of the input data.

***

### verify()

> **verify**(`signature`, `data`, `keyUri?`): `Promise`\<`boolean`\>

Defined in: [packages/method/src/btc1/key-manager/interface.ts:111](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/interface.ts#L111)

Verifies if a signature was produced by a key pair.

#### Parameters

##### signature

`Bytes`

The signature to verify.

##### data

`Hex`

The data that was signed.

##### keyUri?

`string`

The URI of the key to use for verification.

#### Returns

`Promise`\<`boolean`\>

A promise that resolves if the signature is valid, and rejects otherwise.
