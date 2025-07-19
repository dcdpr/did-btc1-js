[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / IBeacon

# Interface: IBeacon

Defined in: [packages/method/src/interfaces/ibeacon.ts:12](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L12)

Beacon interface
 IBeacon

## Properties

### id

&gt; **id**: `string`

Defined in: [packages/method/src/interfaces/ibeacon.ts:17](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L17)

A unique identifier for the Beacon

***

### service

&gt; **service**: [`BeaconService`](BeaconService.md)

Defined in: [packages/method/src/interfaces/ibeacon.ts:35](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L35)

Returns the Beacon Service object

***

### serviceEndpoint

&gt; **serviceEndpoint**: `DidServiceEndpoint`

Defined in: [packages/method/src/interfaces/ibeacon.ts:29](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L29)

The service endpoint of the Beacon

***

### type

&gt; **type**: `string`

Defined in: [packages/method/src/interfaces/ibeacon.ts:23](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L23)

The type of the Beacon

## Methods

### broadcastSignal()

&gt; **broadcastSignal**(`didUpdatePayload`): `Promise`\<[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)\&gt;

Defined in: [packages/method/src/interfaces/ibeacon.ts:58](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L58)

Broadcasts a signal.

#### Parameters

##### didUpdatePayload

`DidUpdatePayload`

The DID update payload.

#### Returns

`Promise`\<[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)\&gt;

The signal metadata.

***

### generateSignal()

&gt; **generateSignal**(`didUpdatePayload`): [`BeaconSignal`](BeaconSignal.md)

Defined in: [packages/method/src/interfaces/ibeacon.ts:42](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L42)

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

&gt; **processSignal**(`signal`, `signalsMetadata`): `Promise`\<`undefined` \| `DidUpdatePayload`\&gt;

Defined in: [packages/method/src/interfaces/ibeacon.ts:50](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L50)

Processes a Beacon Signal.

#### Parameters

##### signal

[`RawTransactionV2`](RawTransactionV2.md)

The raw transaction

##### signalsMetadata

[`SignalsMetadata`](../type-aliases/SignalsMetadata.md)

The signals metadata from the sidecar data

#### Returns

`Promise`\<`undefined` \| `DidUpdatePayload`\&gt;

The DID update payload
