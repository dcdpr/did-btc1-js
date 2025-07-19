[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1Create

# Class: Btc1Create

Defined in: [packages/method/src/btc1/crud/create.ts:58](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/crud/create.ts#L58)

Implements section [4.1 Create](https://dcdpr.github.io/did-btc1/#create).

A did:btc1 identifier and associated DID document can either be created deterministically from a cryptographic seed,
or it can be created from an arbitrary genesis intermediate DID document representation. In both cases, DID creation
can be undertaken in an offline manner, i.e., the DID controller does not need to interact with the Bitcoin network
to create their DID.

 Btc1Create

## Constructors

### Constructor

> **new Btc1Create**(): `Btc1Create`

#### Returns

`Btc1Create`

## Methods

### external()

> `static` **external**(`params`): `Promise`\<[`Btc1CreateResponse`](../type-aliases/Btc1CreateResponse.md)\>

Defined in: [packages/method/src/btc1/crud/create.ts:131](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/crud/create.ts#L131)

Implements [4.1.2 External Initial Document Creation](https://dcdpr.github.io/did-btc1/#external-initial-document-creation).

Creates a did:btc1 identifier from some initiating arbitrary DID document. This allows for more complex
initial DID documents, including the ability to include Service Endpoints and Beacons that support aggregation.
Inputs include `intermediateDocument`, optional version and network returning initialDidDocument. The
intermediateDocument should be a valid DID document except all places where the DID document requires the use of
the identifier (e.g. the id field). These fields should use placeholder value
`did:btc1:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. The intermediateDocument should include at
least one verificationMethod and service of the type SingletonBeacon.

#### Parameters

##### params

See [Btc1CreateExternalParams](../type-aliases/Btc1CreateExternalParams.md) for details.

###### intermediateDocument

[`IntermediateDidDocument`](IntermediateDidDocument.md)

###### options

[`DidCreateOptions`](../interfaces/DidCreateOptions.md)

#### Returns

`Promise`\<[`Btc1CreateResponse`](../type-aliases/Btc1CreateResponse.md)\>

A Promise resolving to Btc1CreateResponses.

#### Throws

if the verificationMethod or service objects are missing required properties

***

### key()

> `static` **key**(`params`): [`Btc1CreateResponse`](../type-aliases/Btc1CreateResponse.md)

Defined in: [packages/method/src/btc1/crud/create.ts:72](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/btc1/crud/create.ts#L72)

Implements [4.1.1 Deterministic Key-Based Creation](https://dcdpr.github.io/did-btc1/#deterministic-key-based-creation).

For deterministic key-based creation, the did:btc1 identifier encodes a secp256k1 public key. The key is then used
to deterministically generate the initial DID document.

#### Parameters

##### params

See [Btc1CreateKeyParams](../type-aliases/Btc1CreateKeyParams.md) for details.

###### options

[`DidCreateOptions`](../interfaces/DidCreateOptions.md)

###### pubKeyBytes

`Bytes`

public key bytes for id creation.

#### Returns

[`Btc1CreateResponse`](../type-aliases/Btc1CreateResponse.md)

A response object of type [Btc1CreateResponse](../type-aliases/Btc1CreateResponse.md).

#### Throws

if the public key is missing or invalid.
