[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1Read

# Class: Btc1Read

Defined in: [packages/method/src/btc1/crud/read.ts:114](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L114)

Implements [4.2 Read](https://dcdpr.github.io/did-btc1/#read).
The read operation is executed by a resolver after a resolution request identifying a specific did:btc1 identifier is
received from a client at Resolution Time. The request MAY contain a resolutionOptions object containing additional
information to be used in resolution. The resolver then attempts to resolve the DID document of the identifier at a
specific Target Time. The Target Time is either provided in resolutionOptions or is set to the Resolution Time of the
request.
To do so it executes the following algorithm:
 1. Let identifierComponents be the result of running the algorithm
    in Parse did:btc1 identifier, passing in the identifier.
 2. Set initialDocument to the result of running Resolve Initial Document
    passing identifier, identifierComponents and resolutionOptions.
 3. Set targetDocument to the result of running the algorithm in Resolve
    Target Document passing in initialDocument and resolutionOptions.
 4. Return targetDocument.

 Btc1Read

## Constructors

### Constructor

&gt; **new Btc1Read**(): `Btc1Read`

#### Returns

`Btc1Read`

## Methods

### applyDidUpdate()

&gt; `static` **applyDidUpdate**(`params`): `Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:838](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L838)

Implements [4.2.3.6 Apply DID Update](https://dcdpr.github.io/did-btc1/#apply-did-update).

This algorithm attempts to apply a DID Update to a DID document, it first verifies the proof on the update is a
valid capabilityInvocation of the root authority over the DID being resolved. Then it applies the JSON patch
transformation to the DID document, checks the transformed DID document matches the targetHash specified by the
update and validates it is a conformant DID document before returning it. This algorithm takes inputs
contemporaryDidDocument and an update.

#### Parameters

##### params

Parameters for applyDidUpdate.

###### contemporaryDidDocument

[`Btc1DidDocument`](Btc1DidDocument.md)

The current DID Document to update.

###### update

`DidUpdatePayload`

The DID Update Payload to apply.

#### Returns

`Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

***

### cas()

&gt; `static` **cas**(`params`): `Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:251](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L251)

Implements [4.2.2.2.2 CAS Retrieval](https://dcdpr.github.io/did-btc1/#cas-retrieval).

The CAS Retrieval algorithm attempts to retrieve an initialDocument from a Content Addressable Storage (CAS) system
by converting the bytes in the identifier into a Content Identifier (CID). It takes in an identifier and
an identifierComponents object. It returns an initialDocument.

#### Parameters

##### params

[`DidReadCas`](../interfaces/DidReadCas.md)

Required params for calling the cas method

#### Returns

`Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

The resolved DID Document object

#### Throws

if the DID Document content is invalid

***

### confirmDuplicateUpdate()

&gt; `static` **confirmDuplicateUpdate**(`params`): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:804](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L804)

Implements [4.2.3.5 Confirm Duplicate Update](https://dcdpr.github.io/did-btc1/#confirm-duplicate-update).

The Confirm Duplicate Update algorithm takes in a DidUpdatePayload \| DID Update Payload and verifies that
the update is a duplicate against the hash history of previously applied updates. The algorithm takes in an update
and an array of hashes, updateHashHistory. It throws an error if the update is not a duplicate, otherwise it
returns.

#### Parameters

##### params

Parameters for confirmDuplicateUpdate.

###### update

`DidUpdatePayload`

The DID Update Payload to confirm.

###### updateHashHistory

`string`[]

The history of hashes for previously applied updates.

#### Returns

`Promise`\<`void`\&gt;

A promise that resolves if the update is a duplicate, otherwise throws an error.

#### Throws

if the update hash does not match the historical hash.

***

### deterministic()

&gt; `static` **deterministic**(`params`): [`Btc1DidDocument`](Btc1DidDocument.md)

Defined in: [packages/method/src/btc1/crud/read.ts:127](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L127)

Implements [4.2.2.1 Deterministically Generate Initial DID Document](https://dcdpr.github.io/did-btc1/#deterministically-generate-initial-did-document).

The Deterministically Generate Initial DID Document algorithm deterministically generates an initial DID
Document from a secp256k1 public key. It takes in a did:btc1 identifier and a identifierComponents object and
returns an initialDocument.

#### Parameters

##### params

See [Btc1ReadDeterministic](../interfaces/Btc1ReadDeterministic.md) for details.

###### components

[`DidComponents`](../interfaces/DidComponents.md)

The name of the bitcoin network (mainnet, testnet, regtest).

###### identifier

`string`

The did-btc1 version.

#### Returns

[`Btc1DidDocument`](Btc1DidDocument.md)

The resolved DID Document object.

***

### external()

&gt; `static` **external**(`params`): `Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:175](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L175)

Implements [4.2.2.2 External Resolution](https://dcdpr.github.io/did-btc1/#external-resolution).

The External Resolution algorithm externally retrieves an intermediateDocumentRepresentation, either by retrieving
it from [Content Addressable Storage (CAS)](https://dcdpr.github.io/did-btc1/#def-content-addressable-storage)
or from the [Sidecar Data](https://dcdpr.github.io/did-btc1/#def-sidecar-data) provided as part of the
resolution request. It takes in a did:btc1 identifier, a identifierComponents object and a resolutionOptions object.
It returns an initialDocument, which is a conformant DID document validated against the identifier.

#### Parameters

##### params

Required params for calling the external method.

###### components

[`DidComponents`](../interfaces/DidComponents.md)

The components of the identifier.

###### identifier

`string`

The DID to be resolved.

###### options

[`DidResolutionOptions`](../interfaces/DidResolutionOptions.md)

The options for resolving the DID Document.

#### Returns

`Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

The resolved DID Document object

***

### findNextSignals()

&gt; `static` **findNextSignals**(`params`): `Promise`\<[`BeaconSignal`](../interfaces/BeaconSignal.md)[]\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:543](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L543)

Implements [4.2.3.3 Find Next Signals](https://dcdpr.github.io/did-btc1/#find-next-signals).

The Find Next Signals algorithm finds the next Bitcoin block containing Beacon Signals from one or more of the
beacons and retuns all Beacon Signals within that block.

It takes the following inputs:
 - `contemporaryBlockhieght`: The height of the block this function is looking for Beacon Signals in.
                              An integer greater or equal to 0.
 - `targetBlockheight`: The height of the Bitcoin block that the resolution algorithm searches for Beacon Signals
                        up to. An integer greater or equal to 0.
 - `beacons`: An array of Beacon services in the contemporary DID document. Each Beacon contains properties:
     - `id`: The id of the Beacon service in the DID document. A string.
     - `type`: The type of the Beacon service in the DID document. A string whose values MUST be
                         either SingletonBeacon, CIDAggregateBeacon or SMTAggregateBeacon.
     - `serviceEndpoint`: A BIP21 URI representing a Bitcoin address.
     - `address`: The Bitcoin address decoded from the `serviceEndpoint value.
 - `network`: A string identifying the Bitcoin network of the did:btc1 identifier. This algorithm MUST query the
              Bitcoin blockchain identified by the network.

It returns a nextSignals struct, containing the following properties:
 - blockheight: The Bitcoin blockheight for the block containing the Beacon Signals.
 - signals: An array of signals. Each signal is a struct containing the following:
     - beaconId: The id for the Beacon that the signal was announced by.
     - beaconType: The type of the Beacon that announced the signal.
     - tx: The Bitcoin transaction that is the Beacon Signal.

#### Parameters

##### params

The parameters for the findNextSignals operation.

###### beacons

[`BeaconServiceAddress`](../interfaces/BeaconServiceAddress.md)[]

The beacons to look for in the block.

###### contemporaryBlockHeight

`number`

###### network

`BitcoinNetworkNames`

###### targetTime

`number`

#### Returns

`Promise`\<[`BeaconSignal`](../interfaces/BeaconSignal.md)[]\&gt;

An array of BeaconSignal objects with blockHeight and signals.

***

### findSignalsRest()

&gt; `static` **findSignalsRest**(`params`): `Promise`\<[`BeaconSignal`](../interfaces/BeaconSignal.md)[]\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:659](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L659)

Helper method for the [Find Next Signals](#findnextsignals) algorithm.

#### Parameters

##### params

See [FindNextSignalsRestParams](../type-aliases/FindNextSignalsRestParams.md) for details.

###### beacons

[`BeaconService`](../interfaces/BeaconService.md)[]

The beacons to process.

#### Returns

`Promise`\<[`BeaconSignal`](../interfaces/BeaconSignal.md)[]\&gt;

The beacon signals found in the block.

***

### initialDocument()

&gt; `static` **initialDocument**(`params`): `Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:287](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L287)

Implements [4.2.2 Resolve Initial Document](https://dcdpr.github.io/did-btc1/#resolve-initial-document).

This algorithm resolves an initial DID document and validates it against the identifier for a specific did:btc1.
The algorithm takes in a did:btc1 identifier, identifier components object, resolutionsOptions object and returns
a valid initialDocument for that identifier.

#### Parameters

##### params

See [ResolveInitialDocument](../type-aliases/ResolveInitialDocument.md) for parameter details.

###### components

[`DidComponents`](../interfaces/DidComponents.md)

The components of the identifier.

###### identifier

`string`

The DID to be resolved.

###### options

[`DidResolutionOptions`](../interfaces/DidResolutionOptions.md)

See [DidResolutionOptions](../interfaces/DidResolutionOptions.md) for resolving the DID Document.

#### Returns

`Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

The resolved DID Document object.

#### Throws

if the DID hrp is invalid, no sidecarData passed and hrp = "x".

***

### processBeaconSignal()

&gt; `static` **processBeaconSignal**(`signal`, `signalsMetadata`): `Promise`\<`DidUpdatePayload`\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:720](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L720)

Implements [4.2.3.4 Process Beacon Signals](https://dcdpr.github.io/did-btc1/#process-beacon-signals).

The Process Beacon Signals algorithm processes each Beacon Signal by attempting to retrieve and validate an
announce DID Update Payload for that signal according to the type of the Beacon.

It takes as inputs
 - `beaconSignals`: An array of Beacon Signals retrieved from the Find Next Signals algorithm. Each signal contains:
   - `beaconId`: The id for the Beacon that the signal was announced by.
   - `beaconType`: The type of the Beacon that announced the signal.
   - `tx`: The Bitcoin transaction that is the Beacon Signal.
 - `signalsMetadata`: Maps Beacon Signal Bitcoin transaction ids to a SignalMetadata object containing:
   - `updatePayload`: A DID Update Payload which should match the update announced by the Beacon Signal.
                      In the case of a SMT proof of non-inclusion, no DID Update Payload may be provided.
   - `proofs`: Sparse Merkle Tree proof used to verify that the `updatePayload` exists as the leaf indexed by the
               did:btc1 identifier being resolved.

It returns an array of [DID Update Payloads](https://dcdpr.github.io/did-btc1/#def-did-update-payload).

#### Parameters

##### signal

[`BeaconSignal`](../interfaces/BeaconSignal.md)

The beacon signals to process.

##### signalsMetadata

[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)

The sidecar data for the DID Document.

#### Returns

`Promise`\<`DidUpdatePayload`\&gt;

The updated DID Document object.

***

### sidecar()

&gt; `static` **sidecar**(`params`): `Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:214](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L214)

Implements [4.2.2.2.1 Sidecar Initial Document Validation](https://dcdpr.github.io/did-btc1/#sidecar-initial-document-validation).

The Sidecar Initial Document Validation algorithm validates an initialDocument against its identifier, by first
constructing the intermediateDocumentRepresentation and verifying the hash of this document matches the bytes
encoded within the identifier. It takes in a did:btc1 identifier, identifierComponents and a
initialDocument. It returns the initialDocument if validated, otherwise it throws an error.

#### Parameters

##### params

[`Btc1ReadSidecar`](../interfaces/Btc1ReadSidecar.md)

Required params for calling the sidecar method

#### Returns

`Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

The resolved DID Document object

#### Throws

InvalidDidDocument if genesisBytes !== initialDocument hashBytes

***

### targetDocument()

&gt; `static` **targetDocument**(`params`): `Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

Defined in: [packages/method/src/btc1/crud/read.ts:324](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/crud/read.ts#L324)

Implements [4.2.3 Resolve Target Document](https://dcdpr.github.io/did-btc1/#resolve-target-document).

The Resolve Target Document algorithm resolves a DID document from an initial document by walking the Bitcoin
blockchain to identify Beacon Signals that announce DID Update Payloads applicable to the did:btc1 identifier being
resolved. It takes as inputs initialDocument, resolutionOptions and network. It returns a valid DID document.

#### Parameters

##### params

See [TargetDocumentParams](../interfaces/TargetDocumentParams.md) for details.

###### initialDocument

[`Btc1DidDocument`](Btc1DidDocument.md)

The initial DID Document to resolve

###### options

[`DidResolutionOptions`](../interfaces/DidResolutionOptions.md)

See [DidResolutionOptions](../interfaces/DidResolutionOptions.md) for details.

#### Returns

`Promise`\<[`Btc1DidDocument`](Btc1DidDocument.md)\&gt;

The resolved DID Document object with a validated single, canonical history
