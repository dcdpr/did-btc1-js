[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / DidBtc1

# Class: DidBtc1

Defined in: [packages/method/src/did-btc1.ts:45](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/did-btc1.ts#L45)

Implements [did:btc1 DID Method Specification](https://dcdpr.github.io/did-btc1).
did:btc1 is a censorship resistant DID Method using the Bitcoin blockchain as a Verifiable Data Registry to announce
changes to the DID document. It improves on prior work by allowing: zero-cost off-chain DID creation; aggregated
updates for scalable on-chain update costs; long-term identifiers that can support frequent updates; private
communication of the DID document; private DID resolution; and non-repudiation appropriate for serious contracts.

 DidBtc1

## Extended by

- [`Btc1Deactivate`](Btc1Deactivate.md)

## Implements

- `DidMethod`

## Constructors

### Constructor

&gt; **new DidBtc1**(): `DidBtc1`

#### Returns

`DidBtc1`

## Properties

### methodName

&gt; `static` **methodName**: `string` = `'btc1'`

Defined in: [packages/method/src/did-btc1.ts:47](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/did-btc1.ts#L47)

## Methods

### create()

&gt; `static` **create**(`params`): `Promise`\<[`Btc1CreateResponse`](../type-aliases/Btc1CreateResponse.md)\&gt;

Defined in: [packages/method/src/did-btc1.ts:67](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/did-btc1.ts#L67)

Entry point for section [4.1 Create](https://dcdpr.github.io/did-btc1/#create).
See [Btc1Create](Btc1Create.md) for implementation details.

A did:btc1 identifier and associated DID document can either be created deterministically from a cryptographic
seed, or it can be created from an arbitrary genesis intermediate DID document representation. In both cases,
DID creation can be undertaken in an offline manner, i.e., the DID controller does not need to interact with the
Bitcoin network to create their DID.

#### Parameters

##### params

[`Btc1CreateParams`](../type-aliases/Btc1CreateParams.md)

See [Btc1CreateParams](../type-aliases/Btc1CreateParams.md) for details.

#### Returns

`Promise`\<[`Btc1CreateResponse`](../type-aliases/Btc1CreateResponse.md)\&gt;

Promise resolving to a CreateResponse object.

#### Throws

if any of the checks fail

***

### getSigningMethod()

&gt; `static` **getSigningMethod**(`params`): [`Btc1VerificationMethod`](Btc1VerificationMethod.md)

Defined in: [packages/method/src/did-btc1.ts:256](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/did-btc1.ts#L256)

Given the W3C DID Document of a `did:btc1` identifier, return the signing verification method that will be used
for signing messages and credentials. If given, the `methodId` parameter is used to select the
verification method. If not given, the Identity Key's verification method with an ID fragment
of '#initialKey' is used.

#### Parameters

##### params

Parameters for the `getSigningMethod` method.

###### didDocument

[`Btc1DidDocument`](Btc1DidDocument.md)

DID Document to get the verification method from.

###### methodId?

`string`

Optional ID of the verification method to use for signing.

#### Returns

[`Btc1VerificationMethod`](Btc1VerificationMethod.md)

Promise resolving to the [Btc1VerificationMethod](Btc1VerificationMethod.md) object used for signing.

#### Throws

if the parsed did method does not match `btc1` or signing method could not be determined.

***

### resolve()

&gt; `static` **resolve**(`identifier`, `options`): `Promise`\<`DidResolutionResult`\&gt;

Defined in: [packages/method/src/did-btc1.ts:114](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/did-btc1.ts#L114)

Entry point for section [4.2 Read](https://dcdpr.github.io/did-btc1/#read).
See [Btc1Read](Btc1Read.md) for implementation details.

The read operation is executed by a resolver after a resolution request identifying a specific did:btc1 identifier
is received from a client at Resolution Time. The request MAY contain a resolutionOptions object containing
additional information to be used in resolution. The resolver then attempts to resolve the DID document of the
identifier at a specific Target Time. The Target Time is either provided in resolutionOptions or is set to the
Resolution Time of the request.

#### Parameters

##### identifier

`string`

The DID to be resolved

##### options

[`DidResolutionOptions`](../interfaces/DidResolutionOptions.md) = `{}`

Optional parameters for the resolution operation

#### Returns

`Promise`\<`DidResolutionResult`\&gt;

Promise resolving to a DID Resolution Result

#### Throws

if the resolution fails for any reason

#### Throws

InvalidDid if the identifier is invalid

#### Example

```ts
const resolution = await DidBtc1.resolve('did:btc1:k1q0dygyp3gz969tp46dychzy4q78c2k3js68kvyr0shanzg67jnuez2cfplh')
```

***

### update()

&gt; `static` **update**(`params`): `Promise`\<`any`\&gt;

Defined in: [packages/method/src/did-btc1.ts:182](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/did-btc1.ts#L182)

Entry point for section [4.3 Update](https://dcdpr.github.io/did-btc1/#update).
See [Btc1Update](Btc1Update.md) for implementation details.

An update to a did:btc1 document is an invoked capability using the ZCAP-LD data format, signed by a
verificationMethod that has the authority to make the update as specified in the previous DID document. Capability
invocations for updates MUST be authorized using Data Integrity following the bip340-jcs-2025
cryptosuite with a proofPurpose of capabilityInvocation.

The Update algorithm takes as inputs a btc1Identifier, sourceDocument, sourceVersionId, documentPatch, a
verificationMethodId and an array of beaconIds. The sourceDocument is the DID document being updated. The
documentPatch is a JSON Patch object containing a set of transformations to be applied to the sourceDocument.
The result of these transformations MUST produce a DID document conformant to the DID Core specification. The
verificationMethodId is an identifier for a verificationMethod within the sourceDocument. The verificationMethod
identified MUST be a BIP340 Multikey. The beaconIds MUST identify service endpoints with one of the three Beacon
Types SingletonBeacon, CIDAggregateBeacon, and SMTAggregateBeacon.

#### Parameters

##### params

Required parameters for the update operation.

###### beaconIds

`string`[]

The beacon IDs to announce the update

###### identifier

`string`

The btc1 identifier to be updated.

###### patch

`PatchOperation`[]

###### sourceDocument

[`Btc1DidDocument`](Btc1DidDocument.md)

The DID document being updated.

###### sourceVersionId

`number`

The versionId of the source document.

###### verificationMethodId

`string`

The verificationMethod ID to sign the update

#### Returns

`Promise`\<`any`\&gt;

Promise resolving to void

#### Throws

if the verificationMethod type is not `Multikey` or the publicKeyMultibase header is not `zQ3s`
