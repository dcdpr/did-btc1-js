[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / IntermediateDidDocument

# Class: IntermediateDidDocument

Defined in: [packages/method/src/utils/did-document.ts:433](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L433)

IntermediateDidDocument extends the Btc1DidDocument class for creating and managing intermediate DID documents.
This class is used to create a minimal DID document with a placeholder ID.
It is used in the process of creating a new DID document.
 IntermediateDidDocument

## Extends

- [`Btc1DidDocument`](Btc1DidDocument.md)

## Constructors

### Constructor

> **new IntermediateDidDocument**(`document`): `IntermediateDidDocument`

Defined in: [packages/method/src/utils/did-document.ts:434](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L434)

#### Parameters

##### document

[`IBtc1DidDocument`](../interfaces/IBtc1DidDocument.md)

#### Returns

`IntermediateDidDocument`

#### Overrides

[`Btc1DidDocument`](Btc1DidDocument.md).[`constructor`](Btc1DidDocument.md#constructor)

## Properties

### @context?

> `optional` **@context**: (`string` \| `JSONObject`)[] = `BTC1_DID_DOCUMENT_CONTEXT`

Defined in: [packages/method/src/utils/did-document.ts:114](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L114)

A JSON-LD context link, which provides a JSON-LD processor with the information necessary to
interpret the DID document JSON. The default context URL is 'https://www.w3.org/ns/did/v1'.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`@context`](Btc1DidDocument.md#context)

***

### assertionMethod?

> `optional` **assertionMethod**: (`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:117](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L117)

The assertion methods of the DID Document.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`assertionMethod`](Btc1DidDocument.md#assertionmethod)

***

### authentication?

> `optional` **authentication**: (`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:116](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L116)

The authentication methods of the DID Document.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`authentication`](Btc1DidDocument.md#authentication)

***

### capabilityDelegation?

> `optional` **capabilityDelegation**: (`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:119](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L119)

The capability delegation methods of the DID Document.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`capabilityDelegation`](Btc1DidDocument.md#capabilitydelegation)

***

### capabilityInvocation?

> `optional` **capabilityInvocation**: (`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

Defined in: [packages/method/src/utils/did-document.ts:118](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L118)

The capability invocation methods of the DID Document.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`capabilityInvocation`](Btc1DidDocument.md#capabilityinvocation)

***

### controller?

> `optional` **controller**: `string`[]

Defined in: [packages/method/src/utils/did-document.ts:113](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L113)

The controller of the DID Document.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`controller`](Btc1DidDocument.md#controller)

***

### id

> **id**: `string`

Defined in: [packages/method/src/utils/did-document.ts:112](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L112)

The identifier of the DID Document.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`id`](Btc1DidDocument.md#id)

***

### service

> **service**: [`BeaconService`](../interfaces/BeaconService.md)[]

Defined in: [packages/method/src/utils/did-document.ts:120](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L120)

The services of the DID Document.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`service`](Btc1DidDocument.md#service)

***

### verificationMethod

> **verificationMethod**: [`Btc1VerificationMethod`](Btc1VerificationMethod.md)[]

Defined in: [packages/method/src/utils/did-document.ts:115](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L115)

The verification methods of the DID Document.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`verificationMethod`](Btc1DidDocument.md#verificationmethod)

## Methods

### json()

> **json**(): `JSONObject`

Defined in: [packages/method/src/utils/did-document.ts:184](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L184)

Convert the Btc1DidDocument to a JSON object.

#### Returns

`JSONObject`

The JSON representation of the Btc1DidDocument.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`json`](Btc1DidDocument.md#json)

***

### toBtc1DidDocument()

> **toBtc1DidDocument**(`did`): [`Btc1DidDocument`](Btc1DidDocument.md)

Defined in: [packages/method/src/utils/did-document.ts:460](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L460)

Convert the IntermediateDidDocument to a Btc1DidDocument by replacing the placeholder value with the provided DID.

#### Parameters

##### did

`string`

The DID to replace the placeholder value in the document.

#### Returns

[`Btc1DidDocument`](Btc1DidDocument.md)

A new Btc1DidDocument with the placeholder value replaced by the provided DID.

***

### toIntermediate()

> **toIntermediate**(): `IntermediateDidDocument`

Defined in: [packages/method/src/utils/did-document.ts:418](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L418)

Convert the Btc1DidDocument to an IntermediateDidDocument.

#### Returns

`IntermediateDidDocument`

The IntermediateDidDocument representation of the Btc1DidDocument.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`toIntermediate`](Btc1DidDocument.md#tointermediate)

***

### validateIntermediate()

> **validateIntermediate**(): `void`

Defined in: [packages/method/src/utils/did-document.ts:391](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L391)

Validate the IntermediateDidDocument.

#### Returns

`void`

True if the IntermediateDidDocument is valid.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`validateIntermediate`](Btc1DidDocument.md#validateintermediate)

***

### create()

> `static` **create**(`verificationMethod`, `relationships`, `service`): `IntermediateDidDocument`

Defined in: [packages/method/src/utils/did-document.ts:446](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L446)

Create a minimal IntermediateDidDocument with a placeholder ID.

#### Parameters

##### verificationMethod

[`Btc1VerificationMethod`](Btc1VerificationMethod.md)[]

The public key in multibase format.

##### relationships

[`VerificationRelationships`](../type-aliases/VerificationRelationships.md)

The public key in multibase format.

##### service

[`BeaconService`](../interfaces/BeaconService.md)[]

The service to be included in the document.

#### Returns

`IntermediateDidDocument`

A new IntermediateDidDocument with the placeholder ID.

***

### from()

> `static` **from**(`object`): [`Btc1DidDocument`](Btc1DidDocument.md)

Defined in: [packages/method/src/utils/did-document.ts:471](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L471)

Create a Btc1DidDocument from a JSON object.

#### Parameters

##### object

`JSONObject`

The JSON object to convert.

#### Returns

[`Btc1DidDocument`](Btc1DidDocument.md)

The created Btc1DidDocument.

***

### fromExternalIdentifier()

> `static` **fromExternalIdentifier**(`data`): [`Btc1DidDocument`](Btc1DidDocument.md)

Defined in: [packages/method/src/utils/did-document.ts:232](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L232)

Create a Btc1DidDocument from "x1" btc1 identifier.

#### Parameters

##### data

[`ExternalData`](../type-aliases/ExternalData.md)

The verification methods of the DID Document.

#### Returns

[`Btc1DidDocument`](Btc1DidDocument.md)

A new Btc1DidDocument.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`fromExternalIdentifier`](Btc1DidDocument.md#fromexternalidentifier)

***

### fromKeyIdentifier()

> `static` **fromKeyIdentifier**(`id`, `publicKeyMultibase`, `service`): [`Btc1DidDocument`](Btc1DidDocument.md)

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

[`Btc1DidDocument`](Btc1DidDocument.md)

A new Btc1DidDocument with the placeholder ID.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`fromKeyIdentifier`](Btc1DidDocument.md#fromkeyidentifier)

***

### isValid()

> `static` **isValid**(`didDocument`): `boolean`

Defined in: [packages/method/src/utils/did-document.ts:256](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L256)

Validates a Btc1DidDocument by breaking it into modular validation methods.

#### Parameters

##### didDocument

[`Btc1DidDocument`](Btc1DidDocument.md)

The DID document to validate.

#### Returns

`boolean`

True if the DID document is valid.

#### Throws

If any validation check fails.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`isValid`](Btc1DidDocument.md#isvalid)

***

### sanitize()

> `static` **sanitize**(`doc`): [`Btc1DidDocument`](Btc1DidDocument.md)

Defined in: [packages/method/src/utils/did-document.ts:241](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L241)

Sanitize the DID Document by removing undefined values

#### Parameters

##### doc

[`Btc1DidDocument`](Btc1DidDocument.md)

#### Returns

[`Btc1DidDocument`](Btc1DidDocument.md)

The sanitized DID Document

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`sanitize`](Btc1DidDocument.md#sanitize)

***

### validate()

> `static` **validate**(`didDocument`): [`Btc1DidDocument`](Btc1DidDocument.md)

Defined in: [packages/method/src/utils/did-document.ts:376](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document.ts#L376)

Validate the DID Document

#### Parameters

##### didDocument

[`Btc1DidDocument`](Btc1DidDocument.md) | `IntermediateDidDocument`

#### Returns

[`Btc1DidDocument`](Btc1DidDocument.md)

Validated DID Document.

#### Throws

If the DID Document is invalid.

#### Inherited from

[`Btc1DidDocument`](Btc1DidDocument.md).[`validate`](Btc1DidDocument.md#validate)
