[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / IBtc1VerificationMethod

# Interface: IBtc1VerificationMethod

Defined in: [packages/method/src/utils/did-document.ts:35](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L35)

## Extends

- `DidVerificationMethod`

## Properties

### controller

&gt; **controller**: `string`

Defined in: [packages/method/src/utils/did-document.ts:38](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L38)

The DID of the entity that controls this verification method.

#### Overrides

`DidVerificationMethod.controller`

***

### id

&gt; **id**: `string`

Defined in: [packages/method/src/utils/did-document.ts:36](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L36)

The identifier of the verification method, which must be a URI.

#### Overrides

`DidVerificationMethod.id`

***

### publicKeyMultibase

&gt; **publicKeyMultibase**: `string`

Defined in: [packages/method/src/utils/did-document.ts:39](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L39)

(Optional) A public key in Multibase format.

A multibase key that conforms to the draft
[Multibase specification](https://datatracker.ietf.org/doc/draft-multiformats-multibase/).

#### Overrides

`DidVerificationMethod.publicKeyMultibase`

***

### secretKeyMultibase?

&gt; `optional` **secretKeyMultibase**: `string`

Defined in: [packages/method/src/utils/did-document.ts:40](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L40)

***

### type

&gt; **type**: `string`

Defined in: [packages/method/src/utils/did-document.ts:37](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L37)

The type of the verification method.

To maximize interoperability this value SHOULD be one of the valid verification method types
registered in the [DID Specification Registries](https://www.w3.org/TR/did-spec-registries/#verification-method-types).

#### Overrides

`DidVerificationMethod.type`
