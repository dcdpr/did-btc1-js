[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1DidDocument

# Class: Btc1DidDocument

Defined in: [packages/method/src/utils/did-document.ts:111](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L111)

BTC1 DID Document extends the DidDocument class adding helper methods and properties
 Btc1DidDocument

## Implements

## Extended by

- [`IntermediateDidDocument`](IntermediateDidDocument.md)

## Implements

- [`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md)

## Constructors

### Constructor

> **new Btc1DidDocument**(`document`): `Btc1DidDocument`

Defined in: [packages/method/src/utils/did-document.ts:122](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L122)

#### Parameters

##### document

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md)

#### Returns

`Btc1DidDocument`

## Properties

### @context?

> `optional` **@context**: (`string` \| `JSONObject`)[] = `BTC1_DID_DOCUMENT_CONTEXT`

Defined in: [packages/method/src/utils/did-document.ts:114](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L114)

A JSON-LD context link, which provides a JSON-LD processor with the information necessary to
interpret the DID document JSON. The default context URL is 'https://www.w3.org/ns/did/v1'.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`@context`](../interfaces/IBtc1DidDocument.md#context)

***

### assertionMethod?

> `optional` **assertionMethod**: (`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:117](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L117)

The assertion methods of the DID Document.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`assertionMethod`](../interfaces/IBtc1DidDocument.md#assertionmethod)

***

### authentication?

> `optional` **authentication**: (`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:116](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L116)

The authentication methods of the DID Document.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`authentication`](../interfaces/IBtc1DidDocument.md#authentication)

***

### capabilityDelegation?

> `optional` **capabilityDelegation**: (`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:119](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L119)

The capability delegation methods of the DID Document.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`capabilityDelegation`](../interfaces/IBtc1DidDocument.md#capabilitydelegation)

***

### capabilityInvocation?

> `optional` **capabilityInvocation**: (`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:118](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L118)

The capability invocation methods of the DID Document.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`capabilityInvocation`](../interfaces/IBtc1DidDocument.md#capabilityinvocation)

***

### controller?

> `optional` **controller**: `string`[]

Defined in: [packages/method/src/utils/did-document.ts:113](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L113)

The controller of the DID Document.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`controller`](../interfaces/IBtc1DidDocument.md#controller)

***

### id

> **id**: `string`

Defined in: [packages/method/src/utils/did-document.ts:112](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L112)

The identifier of the DID Document.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`id`](../interfaces/IBtc1DidDocument.md#id)

***

### service

> **service**: [`BeaconService`](../interfaces/BeaconService.md)[]

Defined in: [packages/method/src/utils/did-document.ts:120](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L120)

The services of the DID Document.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`service`](../interfaces/IBtc1DidDocument.md#service)

***

### verificationMethod

> **verificationMethod**: [`Btc1VerificationMethod`](Btc1VerificationMethod.md)[]

Defined in: [packages/method/src/utils/did-document.ts:115](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L115)

The verification methods of the DID Document.

#### Implementation of

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md).[`verificationMethod`](../interfaces/IBtc1DidDocument.md#verificationmethod)

## Methods

### json()

> **json**(): `JSONObject`

Defined in: [packages/method/src/utils/did-document.ts:184](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L184)

Convert the Btc1DidDocument to a JSON object.

#### Returns

`JSONObject`

The JSON representation of the Btc1DidDocument.

***

### toIntermediate()

> **toIntermediate**(): [`IntermediateDidDocument`](IntermediateDidDocument.md)

Defined in: [packages/method/src/utils/did-document.ts:418](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L418)

Convert the Btc1DidDocument to an IntermediateDidDocument.

#### Returns

[`IntermediateDidDocument`](IntermediateDidDocument.md)

The IntermediateDidDocument representation of the Btc1DidDocument.

***

### validateIntermediate()

> **validateIntermediate**(): `void`

Defined in: [packages/method/src/utils/did-document.ts:391](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L391)

Validate the IntermediateDidDocument.

#### Returns

`void`

True if the IntermediateDidDocument is valid.

***

### fromExternalIdentifier()

> `static` **fromExternalIdentifier**(`data`): `Btc1DidDocument`

Defined in: [packages/method/src/utils/did-document.ts:232](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L232)

Create a Btc1DidDocument from "x1" btc1 identifier.

#### Parameters

##### data

[`ExternalData`](../type-aliases/ExternalData.md)

The verification methods of the DID Document.

#### Returns

`Btc1DidDocument`

A new Btc1DidDocument.

***

### fromKeyIdentifier()

> `static` **fromKeyIdentifier**(`id`, `publicKeyMultibase`, `service`): `Btc1DidDocument`

Defined in: [packages/method/src/utils/did-document.ts:204](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L204)

Create a minimal Btc1DidDocument from "k1" btc1 identifier.

#### Parameters

##### id

`string`

##### publicKeyMultibase

`string`

The public key in multibase format.

##### service

[`BeaconService`](../interfaces/BeaconService.md)[]

The beacon services to be included in the document.

#### Returns

`Btc1DidDocument`

A new Btc1DidDocument with the placeholder ID.

***

### isValid()

> `static` **isValid**(`didDocument`): `boolean`

Defined in: [packages/method/src/utils/did-document.ts:256](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L256)

Validates a Btc1DidDocument by breaking it into modular validation methods.

#### Parameters

##### didDocument

`Btc1DidDocument`

The DID document to validate.

#### Returns

`boolean`

True if the DID document is valid.

#### Throws

If any validation check fails.

***

### sanitize()

> `static` **sanitize**(`doc`): `Btc1DidDocument`

Defined in: [packages/method/src/utils/did-document.ts:241](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L241)

Sanitize the DID Document by removing undefined values

#### Parameters

##### doc

`Btc1DidDocument`

#### Returns

`Btc1DidDocument`

The sanitized DID Document

***

### validate()

> `static` **validate**(`didDocument`): `Btc1DidDocument`

Defined in: [packages/method/src/utils/did-document.ts:376](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L376)

Validate the DID Document

#### Parameters

##### didDocument

`Btc1DidDocument` | [`IntermediateDidDocument`](IntermediateDidDocument.md)

#### Returns

`Btc1DidDocument`

Validated DID Document.

#### Throws

If the DID Document is invalid.
