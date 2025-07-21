[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / SingletonBeacon

# Class: SingletonBeacon

Defined in: [packages/method/src/btc1/beacon/singleton.ts:26](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/beacon/singleton.ts#L26)

Implements [5.1 Singleton Beacon](https://dcdpr.github.io/did-btc1/#singleton-beacon).

A Singleton Beacon enables a single entity to independently post a DID Update Payload in a Beacon Signal. Its is a
Beacon that can be used to publish a single DID Update Payload targeting a single DID document. The serviceEndpoint
for this Beacon Type is a Bitcoin address represented as a URI following the BIP21 scheme. It is recommended that
this Bitcoin address be under the sole control of the DID controller. How the Bitcoin address and the cryptographic
material that controls it are generated is left to the implementation.

 SingletonBeacon

## Extends

- [`Beacon`](Beacon.md)

## Constructors

### Constructor

&gt; **new SingletonBeacon**(`service`, `sidecar?`): `SingletonBeacon`

Defined in: [packages/method/src/btc1/beacon/singleton.ts:33](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/beacon/singleton.ts#L33)

Creates an instance of SingletonBeacon.

#### Parameters

##### service

[`BeaconService`](../interfaces/BeaconService.md)

The Beacon service.

##### sidecar?

`undefined`

Optional sidecar data.

#### Returns

`SingletonBeacon`

#### Overrides

[`Beacon`](Beacon.md).[`constructor`](Beacon.md#constructor)

## Properties

### id

&gt; **id**: `string`

Defined in: [packages/method/src/interfaces/beacon.ts:37](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L37)

A unique identifier for the Beacon

#### Inherited from

[`Beacon`](Beacon.md).[`id`](Beacon.md#id)

***

### serviceEndpoint

&gt; **serviceEndpoint**: `DidServiceEndpoint`

Defined in: [packages/method/src/interfaces/beacon.ts:39](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L39)

The service endpoint of the Beacon

#### Inherited from

[`Beacon`](Beacon.md).[`serviceEndpoint`](Beacon.md#serviceendpoint)

***

### sidecar?

&gt; `optional` **sidecar**: `undefined`

Defined in: [packages/method/src/interfaces/beacon.ts:40](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L40)

#### Inherited from

[`Beacon`](Beacon.md).[`sidecar`](Beacon.md#sidecar)

***

### type

&gt; **type**: `string`

Defined in: [packages/method/src/interfaces/beacon.ts:38](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/beacon.ts#L38)

The type of the Beacon

#### Inherited from

[`Beacon`](Beacon.md).[`type`](Beacon.md#type)

## Accessors

### service

#### Get Signature

&gt; **get** **service**(): [`BeaconService`](../interfaces/BeaconService.md)

Defined in: [packages/method/src/btc1/beacon/singleton.ts:42](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/beacon/singleton.ts#L42)

Get the Beacon service.

##### Returns

[`BeaconService`](../interfaces/BeaconService.md)

Returns the Beacon Service object

#### Overrides

[`Beacon`](Beacon.md).[`service`](Beacon.md#service)

## Methods

### broadcastSignal()

&gt; **broadcastSignal**(`didUpdatePayload`): `Promise`&lt;[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)&gt;

Defined in: [packages/method/src/btc1/beacon/singleton.ts:179](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/beacon/singleton.ts#L179)

Implements [5.1.2 Broadcast Singleton Beacon Signal](https://dcdpr.github.io/did-btc1/#broadcast-singleton-beacon-signal).

The Broadcast Singleton Beacon Signal algorithm is called by the Announce DID Update algorithm as part of the
Update operation, if the Beacon being used is of the type SingletonBeacon. It takes as input a Beacon service and a
secured didUpdatePayload. The algorithm constructs a Bitcoin transaction that spends from the Beacon address
identified in the service and contains a transaction output of the format [OP_RETURN, OP_PUSH32, &lt;hashBytes&gt;],
where hashBytes is the SHA256 hash of the canonical didUpdatePayload. The Bitcoin transaction is then signed and
broadcast to the Bitcoin network, thereby publicly announcing a DID update in a Beacon Signal. It returns a
signalMetadata object mapping the Bitcoin transaction identifier of the Beacon Signal to the necessary data needed
to verify the signal announces a specific DID Update Payload.

TODO: Design and implement a way to construct, sign and send via RPC

#### Parameters

##### didUpdatePayload

`DidUpdatePayload`

The verificationMethod object to be used for signing.

#### Returns

`Promise`&gt;[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)&gt;

Successful output of a bitcoin transaction.

#### Throws

if the bitcoin address is invalid or unfunded.

#### Overrides

[`Beacon`](Beacon.md).[`broadcastSignal`](Beacon.md#broadcastsignal)

***

### generateSignal()

&gt; **generateSignal**(`didUpdatePayload`): [`BeaconSignal`](../interfaces/BeaconSignal.md)

Defined in: [packages/method/src/btc1/beacon/singleton.ts:76](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/beacon/singleton.ts#L76)

TODO: Figure out if this is necessary or not.

#### Parameters

##### didUpdatePayload

`string`

The DID Update Payload to generate the signal for.

#### Returns

[`BeaconSignal`](../interfaces/BeaconSignal.md)

The generated signal.

#### Throws

if the signal is invalid.

#### Overrides

[`Beacon`](Beacon.md).[`generateSignal`](Beacon.md#generatesignal)

***

### processSignal()

&gt; **processSignal**(`signal`, `signalsMetadata`): `Promise`&gt;`undefined` \| `DidUpdatePayload`&gt;

Defined in: [packages/method/src/btc1/beacon/singleton.ts:96](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/beacon/singleton.ts#L96)

TODO: Finish implementation per spec

Implements [5.1.3 Process Singleton Beacon Signal](https://dcdpr.github.io/did-btc1/#process-singleton-beacon-signal).
See [Abstract Beacon Interface Method processSignal](Beacon.md#processsignal) for more details.

The Process Singleton Beacon Signal algorithm is called by the Process Beacon Signals algorithm as part of the Read
operation. It takes a Bitcoin transaction representing a Beacon Signal and optional signalSidecarData containing
any sidecar data provided to the resolver for the Beacon Signal identified by the Bitcoin transaction identifier.
It returns the DID Update payload announced by the Beacon Signal or throws an error.

#### Parameters

##### signal

Bitcoin transaction representing a Beacon Signal.

[`RawTransactionV2`](../interfaces/RawTransactionV2.md) | `RawTransactionRest`

##### signalsMetadata

[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)

#### Returns

`Promise`&gt;`undefined` \| `DidUpdatePayload`&gt;

The DID Update payload announced by the Beacon Signal.

#### Throws

if the signalTx is invalid or the signalSidecarData is invalid.

#### Overrides

[`Beacon`](Beacon.md).[`processSignal`](Beacon.md#processsignal)

***

### establish()

&gt; `static` **establish**(`service`, `sidecar`): `SingletonBeacon`

Defined in: [packages/method/src/btc1/beacon/singleton.ts:66](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/beacon/singleton.ts#L66)

Implements [5.1.1 Establish Singleton Beacon](https://dcdpr.github.io/did-btc1/#establish-singleton-beacon).

Static, convenience method for establishing a Beacon object.

A Singleton Beacon is a Beacon that can be used to publish a single DID Update Payload targeting a single DID
document. The serviceEndpoint for this Beacon Type is a Bitcoin address represented as a URI following the BIP21
scheme. It is RECOMMENDED that this Bitcoin address be under the sole control of the DID controller. How the
Bitcoin address and the cryptographic material that controls it are generated is left to the implementation.
The Establish Singleton Beacon algorithm takes in a Bitcoin address and a serviceId and returns a Singleton Beacon service.
It returns a SignletonBeacon object with the given id, type, and serviceEndpoint.

#### Parameters

##### service

[`BeaconService`](../interfaces/BeaconService.md)

The Beacon service.

##### sidecar

`never`

The sidecar data.

#### Returns

`SingletonBeacon`

The Singleton Beacon.
