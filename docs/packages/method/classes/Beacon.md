[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Beacon

# Class: `abstract` Beacon

Defined in: [packages/method/src/interfaces/beacon.ts:36](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L36)

Implements [5. Beacons](https://dcdpr.github.io/did-btc1/#update-beacons).
Beacons are the mechanism by which a DID controller announces an update to their DID document by broadcasting an
attestation to this update onto the public Bitcoin network. Beacons are identified by a Bitcoin address and emit
Beacon Signals by broadcasting a valid Bitcoin transaction that spends from this Beacon address. These transactions
include attestations to a set of didUpdatePayloads, either in the form of Content Identifiers (CIDs) or Sparse Merkle
Tree (SMT) roots. Beacons are included as a service in DID documents, with the Service Endpoint identifying a Bitcoin
address to watch for Beacon Signals. All Beacon Signals broadcast from this Beacon MUST be processed as part of
resolution (see Read). The type of the Beacon service in the DID document defines how Beacon Signals SHOULD be
processed.
did:btc1 supports different Beacon Types, with each type defining a set of algorithms for:
 1. How a Beacon can be established and added as a service to a DID document.
 2. How attestations to DID updates are broadcast within Beacon Signals.
 3. How a resolver processes a Beacon Signal, identifying, verifying, and applying the authorized mutations to a
    DID document for a specific DID.
This is an extendable mechanism, such that in the future new Beacon Types could be added. It would be up to the
resolver to determine if the Beacon Type is a mechanism they support and are willing to trust. If they are unable to
support a Beacon Type and a DID they are resolving uses that type then the DID MUST be treated as invalid.
The current, active Beacons of a DID document are specified in the document’s service property. By updating the DID
document, a DID controller can change the set of Beacons they can use to broadcast updates to their DID document over
time. Resolution of a DID MUST process signals from all Beacons identified in the latest DID document and apply them
in order determined by the version specified by the didUpdatePayload.
All resolvers of did:btc1 DIDs MUST support the core Beacon Types defined in this specification.

 Beacon

## Extended by

- [`CIDAggregateBeacon`](CIDAggregateBeacon.md)
- [`SingletonBeacon`](SingletonBeacon.md)
- [`SMTAggregateBeacon`](SMTAggregateBeacon.md)

## Implements

- [`IBeacon`](../interfaces/IBeacon.md)

## Constructors

### Constructor

&gt; **new Beacon**(`__namedParameters`, `sidecar?`): `Beacon`

Defined in: [packages/method/src/interfaces/beacon.ts:42](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L42)

#### Parameters

##### \_\_namedParameters

[`BeaconService`](../interfaces/BeaconService.md)

##### sidecar?

`undefined`

#### Returns

`Beacon`

## Properties

### id

&gt; **id**: `string`

Defined in: [packages/method/src/interfaces/beacon.ts:37](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L37)

A unique identifier for the Beacon

#### Implementation of

[`IBeacon`](../interfaces/IBeacon.md).[`id`](../interfaces/IBeacon.md#id)

***

### serviceEndpoint

&gt; **serviceEndpoint**: `DidServiceEndpoint`

Defined in: [packages/method/src/interfaces/beacon.ts:39](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L39)

The service endpoint of the Beacon

#### Implementation of

[`IBeacon`](../interfaces/IBeacon.md).[`serviceEndpoint`](../interfaces/IBeacon.md#serviceendpoint)

***

### sidecar?

&gt; `optional` **sidecar**: `undefined`

Defined in: [packages/method/src/interfaces/beacon.ts:40](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L40)

***

### type

&gt; **type**: `string`

Defined in: [packages/method/src/interfaces/beacon.ts:38](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L38)

The type of the Beacon

#### Implementation of

[`IBeacon`](../interfaces/IBeacon.md).[`type`](../interfaces/IBeacon.md#type)

## Accessors

### service

#### Get Signature

&gt; **get** `abstract` **service**(): [`BeaconService`](../interfaces/BeaconService.md)

Defined in: [packages/method/src/interfaces/beacon.ts:52](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L52)

Returns the Beacon Service object.

##### Returns

[`BeaconService`](../interfaces/BeaconService.md)

Returns the Beacon Service object

#### Implementation of

[`IBeacon`](../interfaces/IBeacon.md).[`service`](../interfaces/IBeacon.md#service)

## Methods

### broadcastSignal()

&gt; `abstract` **broadcastSignal**(`didUpdatePayload`): `Promise`\<[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)\&gt;

Defined in: [packages/method/src/interfaces/beacon.ts:67](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L67)

Broadcasts a Beacon Signal (implemented by subclasses).

#### Parameters

##### didUpdatePayload

`DidUpdatePayload`

#### Returns

`Promise`\<[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)\&gt;

#### Implementation of

[`IBeacon`](../interfaces/IBeacon.md).[`broadcastSignal`](../interfaces/IBeacon.md#broadcastsignal)

***

### generateSignal()

&gt; `abstract` **generateSignal**(`didUpdatePayload`): [`BeaconSignal`](../interfaces/BeaconSignal.md)

Defined in: [packages/method/src/interfaces/beacon.ts:57](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L57)

Generates a Beacon Signal (implemented by subclasses).

#### Parameters

##### didUpdatePayload

`string`

#### Returns

[`BeaconSignal`](../interfaces/BeaconSignal.md)

#### Implementation of

[`IBeacon`](../interfaces/IBeacon.md).[`generateSignal`](../interfaces/IBeacon.md#generatesignal)

***

### processSignal()

&gt; `abstract` **processSignal**(`signal`, `signalsMetadata`): `Promise`\<`undefined` \| `DidUpdatePayload`\&gt;

Defined in: [packages/method/src/interfaces/beacon.ts:62](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L62)

Processes a Beacon Signal (implemented by subclasses).

#### Parameters

##### signal

[`RawTransactionV2`](../interfaces/RawTransactionV2.md) | `RawTransactionRest`

##### signalsMetadata

[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)

#### Returns

`Promise`\<`undefined` \| `DidUpdatePayload`\&gt;

#### Implementation of

[`IBeacon`](../interfaces/IBeacon.md).[`processSignal`](../interfaces/IBeacon.md#processsignal)
