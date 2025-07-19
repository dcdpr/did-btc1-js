[**@did-btc1/cryptosuite**](../README.md)

***

[@did-btc1/cryptosuite](../globals.md) / Multikey

# Interface: Multikey

Defined in: [multikey/interface.ts:32](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L32)

Interface for a [2.1.1 Multikey](https://dcdpr.github.io/data-integrity-schnorr-secp256k1/#multikey).
 Multikey

## Properties

### controller

> `readonly` **controller**: `string`

Defined in: [multikey/interface.ts:37](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L37)

***

### id

> `readonly` **id**: `string`

Defined in: [multikey/interface.ts:34](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L34)

***

### keys

> `readonly` **keys**: `SchnorrKeyPair`

Defined in: [multikey/interface.ts:40](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L40)

***

### publicKey

> `readonly` **publicKey**: `PublicKey`

Defined in: [multikey/interface.ts:43](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L43)

***

### secretKey?

> `readonly` `optional` **secretKey**: `SecretKey`

Defined in: [multikey/interface.ts:46](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L46)

***

### signer

> `readonly` **signer**: `boolean`

Defined in: [multikey/interface.ts:49](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L49)

## Methods

### fromVerificationMethod()

> **fromVerificationMethod**(`verificationMethod`): `Multikey`

Defined in: [multikey/interface.ts:88](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L88)

Convert a verification method to a multikey.

#### Parameters

##### verificationMethod

`DidVerificationMethod`

The verification method to convert.

#### Returns

`Multikey`

Multikey instance.

#### Throws

if the verification method is missing required fields.
if the verification method has an invalid type.
if the publicKeyMultibase has an invalid prefix.

***

### fullId()

> **fullId**(): `string`

Defined in: [multikey/interface.ts:71](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L71)

Get the full id of the multikey

#### Returns

`string`

The full id of the multikey

***

### json()

> **json**(): [`MultikeyObject`](../type-aliases/MultikeyObject.md)

Defined in: [multikey/interface.ts:94](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L94)

Convert the multikey to a JSON object.

#### Returns

[`MultikeyObject`](../type-aliases/MultikeyObject.md)

The multikey as a JSON object.

***

### sign()

> **sign**(`data`, `opts`): `Bytes`

Defined in: [multikey/interface.ts:57](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L57)

Produce signed data with a secret key.

#### Parameters

##### data

`Bytes`

Data to be signed.

##### opts

###### scheme

`"ecdsa"` \| `"schnorr"`

#### Returns

`Bytes`

Signature byte array.

#### Throws

if no secret key is provided.

***

### toVerificationMethod()

> **toVerificationMethod**(): `DidVerificationMethod`

Defined in: [multikey/interface.ts:77](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L77)

Convert the multikey to a verification method.

#### Returns

`DidVerificationMethod`

The verification method.

***

### verify()

> **verify**(`signature`, `message`, `opts`): `boolean`

Defined in: [multikey/interface.ts:65](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/multikey/interface.ts#L65)

Verify a schnorr signature.

#### Parameters

##### signature

`Bytes`

Signature for verification.

##### message

`string`

Data for verification.

##### opts

###### scheme

`"ecdsa"` \| `"schnorr"`

#### Returns

`boolean`

If the signature is valid against the public key.
