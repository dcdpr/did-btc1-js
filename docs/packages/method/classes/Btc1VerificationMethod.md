[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1VerificationMethod

# Class: Btc1VerificationMethod

Defined in: [packages/method/src/utils/did-document.ts:49](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L49)

DID BTC1 Verification Method extends the DidVerificationMethod class adding helper methods and properties
 Btc1VerificationMethod

## Implements

- [`IBtc1VerificationMethod`](../interfaces/IBtc1VerificationMethod.md)

## Constructors

### Constructor

&gt; **new Btc1VerificationMethod**(`__namedParameters`): `Btc1VerificationMethod`

Defined in: [packages/method/src/utils/did-document.ts:56](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L56)

#### Parameters

##### \_\_namedParameters

[`IBtc1VerificationMethod`](../interfaces/IBtc1VerificationMethod.md)

#### Returns

`Btc1VerificationMethod`

## Properties

### controller

&gt; **controller**: `string`

Defined in: [packages/method/src/utils/did-document.ts:52](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L52)

The DID of the entity that controls this verification method.

#### Implementation of

[`IBtc1VerificationMethod`](../interfaces/IBtc1VerificationMethod.md).[`controller`](../interfaces/IBtc1VerificationMethod.md#controller)

***

### id

&gt; **id**: `string`

Defined in: [packages/method/src/utils/did-document.ts:50](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L50)

The identifier of the verification method, which must be a URI.

#### Implementation of

[`IBtc1VerificationMethod`](../interfaces/IBtc1VerificationMethod.md).[`id`](../interfaces/IBtc1VerificationMethod.md#id)

***

### publicKeyMultibase

&gt; **publicKeyMultibase**: `string`

Defined in: [packages/method/src/utils/did-document.ts:53](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L53)

(Optional) A public key in Multibase format.

A multibase key that conforms to the draft
[Multibase specification](https://datatracker.ietf.org/doc/draft-multiformats-multibase/).

#### Implementation of

[`IBtc1VerificationMethod`](../interfaces/IBtc1VerificationMethod.md).[`publicKeyMultibase`](../interfaces/IBtc1VerificationMethod.md#publickeymultibase)

***

### secretKeyMultibase?

&gt; `optional` **secretKeyMultibase**: `string`

Defined in: [packages/method/src/utils/did-document.ts:54](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L54)

#### Implementation of

[`IBtc1VerificationMethod`](../interfaces/IBtc1VerificationMethod.md).[`secretKeyMultibase`](../interfaces/IBtc1VerificationMethod.md#secretkeymultibase)

***

### type

&gt; **type**: `string`

Defined in: [packages/method/src/utils/did-document.ts:51](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L51)

The type of the verification method.

To maximize interoperability this value SHOULD be one of the valid verification method types
registered in the [DID Specification Registries](https://www.w3.org/TR/did-spec-registries/#verification-method-types).

#### Implementation of

[`IBtc1VerificationMethod`](../interfaces/IBtc1VerificationMethod.md).[`type`](../interfaces/IBtc1VerificationMethod.md#type)
