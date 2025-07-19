[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1DidDocumentBuilder

# Class: Btc1DidDocumentBuilder

Defined in: [packages/method/src/utils/did-document-builder.ts:5](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L5)

## Constructors

### Constructor

&gt; **new Btc1DidDocumentBuilder**(`initialDocument`): `Btc1DidDocumentBuilder`

Defined in: [packages/method/src/utils/did-document-builder.ts:8](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L8)

#### Parameters

##### initialDocument

`Partial`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

#### Returns

`Btc1DidDocumentBuilder`

## Methods

### build()

&gt; **build**(): [`Btc1DidDocument`](Btc1DidDocument.md)

Defined in: [packages/method/src/utils/did-document-builder.ts:62](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L62)

#### Returns

[`Btc1DidDocument`](Btc1DidDocument.md)

***

### withAssertionMethod()

&gt; **withAssertionMethod**(`assertionMethod`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:34](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L34)

#### Parameters

##### assertionMethod

(`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

#### Returns

`this`

***

### withAuthentication()

&gt; **withAuthentication**(`authentication`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:27](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L27)

#### Parameters

##### authentication

(`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

#### Returns

`this`

***

### withCapabilityDelegation()

&gt; **withCapabilityDelegation**(`capabilityDelegation`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:48](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L48)

#### Parameters

##### capabilityDelegation

(`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

#### Returns

`this`

***

### withCapabilityInvocation()

&gt; **withCapabilityInvocation**(`capabilityInvocation`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:41](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L41)

#### Parameters

##### capabilityInvocation

(`string` \| [`Btc1VerificationMethod`](Btc1VerificationMethod.md))[]

#### Returns

`this`

***

### withController()

&gt; **withController**(`controller?`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:20](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L20)

#### Parameters

##### controller?

`string`[]

#### Returns

`this`

***

### withService()

&gt; **withService**(`service`): `this`

Defined in: [packages/method/src/utils/did-document-builder.ts:55](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/did-document-builder.ts#L55)

#### Parameters

##### service

[`BeaconService`](../interfaces/BeaconService.md)[]

#### Returns

`this`
