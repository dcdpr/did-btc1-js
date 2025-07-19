[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1DidDocumentBuilder

# Class: Btc1DidDocumentBuilder

Defined in: [packages/method/src/utils/did-document-builder.ts:5](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L5)

## Constructors

### Constructor

> **new Btc1DidDocumentBuilder**(`initialDocument`): `Btc1DidDocumentBuilder`

Defined in: [packages/method/src/utils/did-document-builder.ts:8](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L8)

#### Parameters

##### initialDocument

`Partial`\<[`Btc1DidDocument`](Btc1DidDocument.md)\>

#### Returns

`Btc1DidDocumentBuilder`

## Methods

### build()

> **build**(): [`Btc1DidDocument`](Btc1DidDocument.md)

Defined in: [packages/method/src/utils/did-document-builder.ts:62](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L62)

#### Returns

[`Btc1DidDocument`](Btc1DidDocument.md)

***

### withAssertionMethod()

> **withAssertionMethod**(`assertionMethod`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:34](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L34)

#### Parameters

##### assertionMethod

(`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

#### Returns

`this`

***

### withAuthentication()

> **withAuthentication**(`authentication`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:27](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L27)

#### Parameters

##### authentication

(`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

#### Returns

`this`

***

### withCapabilityDelegation()

> **withCapabilityDelegation**(`capabilityDelegation`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:48](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L48)

#### Parameters

##### capabilityDelegation

(`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

#### Returns

`this`

***

### withCapabilityInvocation()

> **withCapabilityInvocation**(`capabilityInvocation`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:41](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L41)

#### Parameters

##### capabilityInvocation

(`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

#### Returns

`this`

***

### withController()

> **withController**(`controller?`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:20](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L20)

#### Parameters

##### controller?

`string`[]

#### Returns

`this`

***

### withService()

> **withService**(`service`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:55](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/did-document-builder.ts#L55)

#### Parameters

##### service

[`BeaconService`](../interfaces/BeaconService.md)[]

#### Returns

`this`
