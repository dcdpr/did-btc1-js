[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1KeyManager

# Class: Btc1KeyManager

Defined in: [packages/method/src/btc1/key-manager/index.ts:31](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L31)

Class for managing cryptographic keys for the Btc1 DID method.
 Btc1KeyManager

## Implements

- [`KeyManager`](../interfaces/KeyManager.md)
- [`CryptoSigner`](../interfaces/CryptoSigner.md)
- [`BitcoinSigner`](../interfaces/BitcoinSigner.md)

## Constructors

### Constructor

> **new Btc1KeyManager**(`params`): `Btc1KeyManager`

Defined in: [packages/method/src/btc1/key-manager/index.ts:70](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L70)

Creates an instance of Btc1KeyManager.

#### Parameters

##### params

[`KeyManagerParams`](../type-aliases/KeyManagerParams.md) = `{}`

The parameters to initialize the key manager.

#### Returns

`Btc1KeyManager`

## Properties

### activeKeyUri?

> `optional` **activeKeyUri**: `string`

Defined in: [packages/method/src/btc1/key-manager/index.ts:46](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L46)

The `activeKeyUri` property is a string that represents the URI of the currently active key.
It is used to identify the key that will be used for signing and verifying operations.
This property is optional and can be set to a specific key URI when initializing the
`Btc1KeyManager` instance. If not set, the key manager will use the default key URI.

#### Implementation of

[`KeyManager`](../interfaces/KeyManager.md).[`activeKeyUri`](../interfaces/KeyManager.md#activekeyuri)

## Accessors

### instance

#### Get Signature

> **get** `static` **instance**(): `Btc1KeyManager`

Defined in: [packages/method/src/btc1/key-manager/index.ts:86](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L86)

Gets the singleton instance of the Btc1KeyManager.

##### Returns

`Btc1KeyManager`

The singleton instance of the Btc1KeyManager.

## Methods

### digest()

> **digest**(`data`): `Bytes`

Defined in: [packages/method/src/btc1/key-manager/index.ts:250](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L250)

Computes the hash of the given data.

#### Parameters

##### data

`Uint8Array`

The data to hash.

#### Returns

`Bytes`

The hash of the data.

#### Implementation of

[`CryptoSigner`](../interfaces/CryptoSigner.md).[`digest`](../interfaces/CryptoSigner.md#digest)

***

### exportKey()

> **exportKey**(`keyUri?`): `Promise`\<`undefined` \| `SchnorrMultikey`\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:192](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L192)

Exports the full multikeypair from the key store.

#### Parameters

##### keyUri?

`string`

#### Returns

`Promise`\<`undefined` \| `SchnorrMultikey`\>

The key pair associated with the key URI.

#### Throws

If the key is not found in the key store.

#### Implementation of

[`KeyManager`](../interfaces/KeyManager.md).[`exportKey`](../interfaces/KeyManager.md#exportkey)

***

### getKeySigner()

> **getKeySigner**(`keyUri`, `network`): `Promise`\<[`Signer`](Signer.md)\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:334](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L334)

#### Parameters

##### keyUri

`string`

##### network

keyof `AvailableNetworks`

#### Returns

`Promise`\<[`Signer`](Signer.md)\>

***

### getPublicKey()

> **getPublicKey**(`keyUri?`): `Promise`\<`PublicKey`\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:111](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L111)

Gets the key pair from the key store and returns a PublicKey.

#### Parameters

##### keyUri?

`string`

The URI of the key to get the public key for.

#### Returns

`Promise`\<`PublicKey`\>

The public key associated with the key URI.

#### Implementation of

[`KeyManager`](../interfaces/KeyManager.md).[`getPublicKey`](../interfaces/KeyManager.md#getpublickey)

***

### importKey()

> **importKey**(`keys`, `keyUri`, `options`): `Promise`\<`string`\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:205](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L205)

Imports a keypair to the store.

#### Parameters

##### keys

`SchnorrKeyPair`

The keypair to import.

##### keyUri

`string`

The URI of the key to import.

##### options

[`Btc1KeyManagerOptions`](../type-aliases/Btc1KeyManagerOptions.md) = `{}`

Relevant import options.

#### Returns

`Promise`\<`string`\>

A promise that resolves to the key identifier of the imported key.

#### Implementation of

[`KeyManager`](../interfaces/KeyManager.md).[`importKey`](../interfaces/KeyManager.md#importkey)

***

### sign()

> **sign**(`data`, `keyUri?`): `Promise`\<`Bytes`\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:130](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L130)

Signs the given data using the key associated with the key URI.

#### Parameters

##### data

`Hex`

The data to sign.

##### keyUri?

`string`

The URI of the key to sign the data with.

#### Returns

`Promise`\<`Bytes`\>

A promise resolving to the signature of the data.

#### Implementation of

[`CryptoSigner`](../interfaces/CryptoSigner.md).[`sign`](../interfaces/CryptoSigner.md#sign)

***

### signTransaction()

> **signTransaction**(`txHex`, `keyUri?`): `Promise`\<`Hex`\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:102](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L102)

Signs a transaction using the key associated with the key URI.

#### Parameters

##### txHex

`Hex`

The transaction hex to sign.

##### keyUri?

`string`

The URI of the key to sign the transaction with.

#### Returns

`Promise`\<`Hex`\>

A promise resolving to the signed transaction hex.

#### Implementation of

[`BitcoinSigner`](../interfaces/BitcoinSigner.md).[`signTransaction`](../interfaces/BitcoinSigner.md#signtransaction)

***

### verify()

> **verify**(`signature`, `data`, `keyUri?`): `Promise`\<`boolean`\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:155](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L155)

Verifies a signature using the key associated with the key URI.

#### Parameters

##### signature

`Bytes`

The signature to verify.

##### data

`Hex`

The data to verify the signature with.

##### keyUri?

`string`

The URI of the key to verify the signature with.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to a boolean indicating the verification result.

#### Implementation of

[`CryptoSigner`](../interfaces/CryptoSigner.md).[`verify`](../interfaces/CryptoSigner.md#verify)

***

### computeKeyUri()

> `static` **computeKeyUri**(`id`, `controller?`): `string`

Defined in: [packages/method/src/btc1/key-manager/index.ts:260](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L260)

Computes the key URI of a given keypair.

#### Parameters

##### id

`string`

The fragment identifier (e.g. 'key-1').

##### controller?

`string`

The DID controller (e.g. 'did:btc1:xyz').

#### Returns

`string`

A full DID fragment URI (e.g. 'did:btc1:xyz#key-1')

***

### getKeyPair()

> `static` **getKeyPair**(`keyUri?`): `Promise`\<`undefined` \| `SchnorrMultikey`\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:327](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L327)

Retrieves a keypair from the key store using the provided key URI.

#### Parameters

##### keyUri?

`string`

The URI of the keypair to retrieve.

#### Returns

`Promise`\<`undefined` \| `SchnorrMultikey`\>

The retrieved keypair, or undefined if not found.

***

### initialize()

> `static` **initialize**(`keys`, `keyUri`): `Promise`\<`Btc1KeyManager`\>

Defined in: [packages/method/src/btc1/key-manager/index.ts:285](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L285)

Initializes a singleton Btc1KeyManager instance.

#### Parameters

##### keys

The keypair used to initialize the key manager.

`SchnorrKeyPair` | `SchnorrKeyPairObject`

##### keyUri

`string`

#### Returns

`Promise`\<`Btc1KeyManager`\>

***

### toMultibaseUri()

> `static` **toMultibaseUri**(`data`): `string`

Defined in: [packages/method/src/btc1/key-manager/index.ts:270](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/index.ts#L270)

Computes a multibase-compliant URI from a key.

#### Parameters

##### data

`PublicKey` | `SchnorrKeyPair` | `Multibase`\<`"zQ3s"`\>

#### Returns

`string`

A multibase URI (e.g. 'urn:mb:zQ3s...')
