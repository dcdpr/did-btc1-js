[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1Update

# Class: Btc1Update

Defined in: [packages/method/src/btc1/crud/update.ts:42](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/update.ts#L42)

Implements [4.3 Update](https://dcdpr.github.io/did-btc1/#update).

An update to a did:btc1 document is an invoked capability using the ZCAP-LD
data format, signed by a verificationMethod that has the authority to make
the update as specified in the previous DID document. Capability invocations
for updates MUST be authorized using Data Integrity following the
bip340-jcs-2025 cryptosuite with a proofPurpose of capabilityInvocation.

 Btc1Update

## Constructors

### Constructor

> **new Btc1Update**(): `Btc1Update`

#### Returns

`Btc1Update`

## Methods

### announce()

> `static` **announce**(`params`): `Promise`\<[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)\>

Defined in: [packages/method/src/btc1/crud/update.ts:208](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/update.ts#L208)

Implements [4.3.3 Announce DID Update](https://dcdpr.github.io/did-btc1/#announce-did-update).

The Announce DID Update algorithm retrieves beaconServices from the sourceDocument and calls the Broadcast DID
Update algorithm corresponding to the type of the Beacon. It takes in a btc1Identifier, sourceDocument, an array of
beaconIds, and a didUpdateInvocation. It returns an array of signalsMetadata, containing the necessary
data to validate the Beacon Signal against the didUpdateInvocation.

#### Parameters

##### params

Required params for calling the announcePayload method

###### beaconIds

`string`[]

The didUpdatePayload object to be signed

###### didUpdateInvocation

`DidUpdateInvocation`

###### sourceDocument

[`Btc1DidDocument`](Btc1DidDocument.md)

The did-btc1 did document to derive the root capability from

#### Returns

`Promise`\<[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)\>

The signalsMetadata object containing data to validate the Beacon Signal

#### Throws

if the beaconService type is invalid

***

### construct()

> `static` **construct**(`params`): `Promise`\<`DidUpdatePayload`\>

Defined in: [packages/method/src/btc1/crud/update.ts:58](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/update.ts#L58)

Implements [4.3.1 Construct DID Update Payload](https://dcdpr.github.io/did-btc1/#construct-did-update-payload).

The Construct DID Update Payload algorithm applies the documentPatch to the sourceDocument and verifies the
resulting targetDocument is a conformant DID document. It takes in a btc1Identifier, sourceDocument,
sourceVersionId, and documentPatch objects. It returns an unsigned DID Update Payload.

#### Parameters

##### params

See  ConstructPayloadParams for more details.

###### identifier

`string`

The did-btc1 identifier to derive the root capability from.

###### patch

`PatchOperation`[]

The JSON patch to be applied to the source document.

###### sourceDocument

[`Btc1DidDocument`](Btc1DidDocument.md)

The source document to be updated.

###### sourceVersionId

`number`

The versionId of the source document.

#### Returns

`Promise`\<`DidUpdatePayload`\>

The constructed DidUpdatePayload object.

#### Throws

InvalidDid if sourceDocument.id does not match identifier.

***

### invoke()

> `static` **invoke**(`params`): `Promise`\<`DidUpdateInvocation`\>

Defined in: [packages/method/src/btc1/crud/update.ts:129](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/update.ts#L129)

[4.3.2 Invoke DID Update Payload](https://dcdpr.github.io/did-btc1/#invoke-did-update-payload).

The Invoke DID Update Payload algorithm takes in a btc1Identifier, an unsigned didUpdatePayload, and a
verificationMethod. It retrieves the privateKeyBytes for the verificationMethod and adds a capability invocation in
the form of a Data Integrity proof following the Authorization Capabilities (ZCAP-LD) and VC Data Integrity
specifications. It returns the invoked DID Update Payload.

#### Parameters

##### params

Required params for calling the invokePayload method

###### didUpdatePayload

`DidUpdatePayload`

The updatePayload object to be signed

###### identifier

`string`

The did-btc1 identifier to derive the root capability from

###### verificationMethod

[`Btc1VerificationMethod`](Btc1VerificationMethod.md)

The verificationMethod object to be used for signing

#### Returns

`Promise`\<`DidUpdateInvocation`\>

Did update payload secured with a proof => DidUpdateInvocation

#### Throws

if the privateKeyBytes are invalid
