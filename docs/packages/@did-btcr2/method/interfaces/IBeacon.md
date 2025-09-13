# Interface: IBeacon

Defined in: [packages/method/src/interfaces/ibeacon.ts:12](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/interfaces/ibeacon.ts#L12)

Beacon interface
 IBeacon

## Properties

### id

> **id**: `string`

Defined in: [packages/method/src/interfaces/ibeacon.ts:17](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/interfaces/ibeacon.ts#L17)

A unique identifier for the Beacon

***

### service

> **service**: [`BeaconService`](BeaconService.md)

Defined in: [packages/method/src/interfaces/ibeacon.ts:35](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/interfaces/ibeacon.ts#L35)

Returns the Beacon Service object

***

### serviceEndpoint

> **serviceEndpoint**: `DidServiceEndpoint`

Defined in: [packages/method/src/interfaces/ibeacon.ts:29](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/interfaces/ibeacon.ts#L29)

The service endpoint of the Beacon

***

### type

> **type**: `string`

Defined in: [packages/method/src/interfaces/ibeacon.ts:23](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/interfaces/ibeacon.ts#L23)

The type of the Beacon

## Methods

### broadcastSignal()

> **broadcastSignal**(`didUpdatePayload`): `Promise`&lt;[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)&gt;

Defined in: [packages/method/src/interfaces/ibeacon.ts:58](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/interfaces/ibeacon.ts#L58)

Broadcasts a signal.

#### Parameters

##### didUpdatePayload

[`DidUpdatePayload`](../../common/interfaces/DidUpdatePayload.md)

The DID update payload.

#### Returns

`Promise`&lt;[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)&gt;

The signal metadata.

***

### generateSignal()

> **generateSignal**(`didUpdatePayload`): [`BeaconSignal`](BeaconSignal.md)

Defined in: [packages/method/src/interfaces/ibeacon.ts:42](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/interfaces/ibeacon.ts#L42)

Generates a Beacon Signal Transaction

#### Parameters

##### didUpdatePayload

`string`

The DID update payload

#### Returns

[`BeaconSignal`](BeaconSignal.md)

The Beacon Signal

***

### processSignal()

> **processSignal**(`signal`, `signalsMetadata`): `Promise`&lt;`undefined` \| [`DidUpdatePayload`](../../common/interfaces/DidUpdatePayload.md)&gt;

Defined in: [packages/method/src/interfaces/ibeacon.ts:50](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/interfaces/ibeacon.ts#L50)

Processes a Beacon Signal.

#### Parameters

##### signal

[`RawTransactionV2`](RawTransactionV2.md)

The raw transaction

##### signalsMetadata

[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)

The signals metadata from the sidecar data

#### Returns

`Promise`&lt;`undefined` \| [`DidUpdatePayload`](../../common/interfaces/DidUpdatePayload.md)&gt;

The DID update payload
