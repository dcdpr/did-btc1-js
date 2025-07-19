[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / KeyManager

# Interface: KeyManager

Defined in: [packages/method/src/btc1/key-manager/interface.ts:62](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L62)

The interface for the Btc1KeyManager class.
 KeyManager

## Properties

### activeKeyUri?

> `optional` **activeKeyUri**: `string`

Defined in: [packages/method/src/btc1/key-manager/interface.ts:67](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L67)

The URI of the active key.

## Methods

### exportKey()

> **exportKey**(`keyUri?`): `Promise`\<`undefined` \| `Multikey`\>

Defined in: [packages/method/src/btc1/key-manager/interface.ts:75](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L75)

Exports the full key pair from the key store.

#### Parameters

##### keyUri?

`string`

The URI of the key to export.

#### Returns

`Promise`\<`undefined` \| `Multikey`\>

The key pair associated with the key URI.

#### Throws

If the key is not found in the key store.

***

### getPublicKey()

> **getPublicKey**(`keyUri`): `Promise`\<`PublicKey`\>

Defined in: [packages/method/src/btc1/key-manager/interface.ts:82](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L82)

Gets the public key of a key pair.

#### Parameters

##### keyUri

`string`

The URI of the key to get the public key for.

#### Returns

`Promise`\<`PublicKey`\>

The public key of the key pair.

***

### importKey()

> **importKey**(`keyPair`, `keyUri`, `options`): `Promise`\<`string`\>

Defined in: [packages/method/src/btc1/key-manager/interface.ts:92](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L92)

Imports a key pair into the key store.

#### Parameters

##### keyPair

`SchnorrKeyPair`

The key pair to import.

##### keyUri

`string`

The full DID controller + fragment identifier (e.g. 'did:btc1:xyz#key-1').

##### options

[`Btc1KeyManagerOptions`](../type-aliases/Btc1KeyManagerOptions.md)

The options for importing the key pair.

#### Returns

`Promise`\<`string`\>

A promise that resolves to the key identifier of the imported key.
