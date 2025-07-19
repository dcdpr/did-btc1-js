[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / KeyManagerParams

# Type Alias: KeyManagerParams

> **KeyManagerParams** = `object`

Defined in: [packages/method/src/btc1/key-manager/interface.ts:15](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L15)

Params for initializing a Btc1KeyManager class instance.

## Properties

### controller?

> `optional` **controller**: `string`

Defined in: [packages/method/src/btc1/key-manager/interface.ts:42](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L42)

An optional property to specify the DID controller.\

***

### id?

> `optional` **id**: `string`

Defined in: [packages/method/src/btc1/key-manager/interface.ts:36](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L36)

An optional property to specify the DID contoller id.

***

### keys?

> `optional` **keys**: `SchnorrKeyPair`

Defined in: [packages/method/src/btc1/key-manager/interface.ts:48](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L48)

An optional property to pass in an initial key pair

***

### keyUri?

> `optional` **keyUri**: [`KeyIdentifier`](KeyIdentifier.md)

Defined in: [packages/method/src/btc1/key-manager/interface.ts:30](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L30)

An optional property to specify a key URI for the key manager. If not provided, the key manager
will generate a key URI based on the public key of the key pair.

***

### store?

> `optional` **store**: `KeyValueStore`\<[`KeyIdentifier`](KeyIdentifier.md), `SchnorrMultikey`\>

Defined in: [packages/method/src/btc1/key-manager/interface.ts:23](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/key-manager/interface.ts#L23)

An optional property to specify a custom `KeyValueStore` instance for key management. If not
provided, [\`Btc1KeyManager\`](../classes/Btc1KeyManager.md) uses a default `MemoryStore` instance.
This store is responsible for managing cryptographic keys, allowing them to be retrieved,
stored, and managed during cryptographic operations.
