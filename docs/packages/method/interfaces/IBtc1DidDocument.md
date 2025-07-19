[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / IBtc1DidDocument

# Interface: IBtc1DidDocument

Defined in: [packages/method/src/utils/did-document.ts:84](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L84)

BTC1 DID Document Interface
 IBtc1DidDocument

## Extends

- `DidDocument`

## Properties

### @context?

> `optional` **@context**: (`string` \| `JSONObject`)[]

Defined in: [packages/method/src/utils/did-document.ts:87](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L87)

A JSON-LD context link, which provides a JSON-LD processor with the information necessary to
interpret the DID document JSON. The default context URL is 'https://www.w3.org/ns/did/v1'.

#### Overrides

`IDidDocument.@context`

***

### assertionMethod?

> `optional` **assertionMethod**: (`string` \| [`Btc1VerificationMethod`](../classes/Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:90](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L90)

The assertion methods of the DID Document.

#### Overrides

`IDidDocument.assertionMethod`

***

### authentication?

> `optional` **authentication**: (`string` \| [`Btc1VerificationMethod`](../classes/Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:89](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L89)

The authentication methods of the DID Document.

#### Overrides

`IDidDocument.authentication`

***

### capabilityDelegation?

> `optional` **capabilityDelegation**: (`string` \| [`Btc1VerificationMethod`](../classes/Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:92](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L92)

The capability delegation methods of the DID Document.

#### Overrides

`IDidDocument.capabilityDelegation`

***

### capabilityInvocation?

> `optional` **capabilityInvocation**: (`string` \| [`Btc1VerificationMethod`](../classes/Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:91](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L91)

The capability invocation methods of the DID Document.

#### Overrides

`IDidDocument.capabilityInvocation`

***

### controller?

> `optional` **controller**: `string`[]

Defined in: [packages/method/src/utils/did-document.ts:86](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L86)

The controller of the DID Document.

#### Overrides

`IDidDocument.controller`

***

### id

> **id**: `string`

Defined in: [packages/method/src/utils/did-document.ts:85](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L85)

The identifier of the DID Document.

#### Overrides

`IDidDocument.id`

***

### service

> **service**: [`BeaconService`](BeaconService.md)[]

Defined in: [packages/method/src/utils/did-document.ts:93](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L93)

The services of the DID Document.

#### Overrides

`IDidDocument.service`

***

### verificationMethod

> **verificationMethod**: [`Btc1VerificationMethod`](../classes/Btc1VerificationMethod.md)[]

Defined in: [packages/method/src/utils/did-document.ts:88](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document.ts#L88)

The verification methods of the DID Document.

#### Overrides

`IDidDocument.verificationMethod`
