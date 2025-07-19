[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / BeaconUtils

# Class: BeaconUtils

Defined in: [packages/method/src/utils/beacons.ts:40](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L40)

Static class of utility functions for the Beacon Service
 BeaconUtils

## Constructors

### Constructor

> **new BeaconUtils**(): `BeaconUtils`

#### Returns

`BeaconUtils`

## Methods

### generateBeacon()

> `static` **generateBeacon**(`params`): [`BeaconService`](../interfaces/BeaconService.md)

Defined in: [packages/method/src/utils/beacons.ts:219](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L219)

Generate a single beacon service.

#### Parameters

##### params

Required parameters for generating a single Beacon Service.

###### identifier

`string`

The identifier for the beacon service.

###### network

`Network`

The name of the Bitcoin network to use.

###### publicKey

`Bytes`

Byte array representation of a public key used to generate a new btc1 key-id-type.

###### type

`string`

The type of beacon service to create.

#### Returns

[`BeaconService`](../interfaces/BeaconService.md)

A BeaconService object.

#### Throws

if the bitcoin address is invalid.

***

### generateBeaconAddresses()

> `static` **generateBeaconAddresses**(`params`): `string`[][]

Defined in: [packages/method/src/utils/beacons.ts:97](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L97)

Generate all 3 Beacon Service Endpoints for a given public key.

#### Parameters

##### params

Required parameters for generating Beacon Services.

###### identifier

`string`

###### network

`Network`

Bitcoin network interface from bitcoinlib-js.

###### publicKey

`Bytes`

Public key bytes used to generate the beacon object serviceEndpoint.

#### Returns

`string`[][]

2D Array of bitcoin addresses (p2pkh, p2wpkh, p2tr).

#### Throws

if the bitcoin address is invalid.

***

### generateBeaconService()

> `static` **generateBeaconService**(`params`): [`BeaconService`](../interfaces/BeaconService.md)

Defined in: [packages/method/src/utils/beacons.ts:130](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L130)

Generate a set of Beacon Services for a given public key.

#### Parameters

##### params

Required parameters for generating Beacon Services.

###### addressType

`"p2pkh"` \| `"p2wpkh"` \| `"p2tr"`

The type of address to create (p2pkh, p2wpkh, p2tr).

###### id

`string`

###### network

`Network`

Bitcoin network interface from bitcoinlib-js.

###### publicKey

`Bytes`

Public key bytes used to generate the beacon object serviceEndpoint.

###### type

`string`

#### Returns

[`BeaconService`](../interfaces/BeaconService.md)

A BeaconService object.

#### Throws

if the bitcoin address is invalid.

***

### generateBeaconServiceCustom()

> `static` **generateBeaconServiceCustom**(`params`): [`BeaconService`](../interfaces/BeaconService.md)

Defined in: [packages/method/src/utils/beacons.ts:158](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L158)

Generate a custom Beacon Service.

#### Parameters

##### params

Required parameters for generating Beacon Services.

###### addressType

`"p2pkh"` \| `"p2wpkh"` \| `"p2tr"`

###### id

`string`

###### network

`Network`

###### publicKey

`Bytes`

###### type

`string`

#### Returns

[`BeaconService`](../interfaces/BeaconService.md)

***

### generateBeaconServices()

> `static` **generateBeaconServices**(`params`): [`BeaconService`](../interfaces/BeaconService.md)[]

Defined in: [packages/method/src/utils/beacons.ts:189](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L189)

Generate beacon services.

#### Parameters

##### params

Required parameters for generating Beacon Services.

###### identifier

`string`

###### network

`Network`

The name of the Bitcoin network to use.

###### publicKey

`Bytes`

Byte array representation of a public key used to generate a new btc1 key-id-type.

###### type

`string`

#### Returns

[`BeaconService`](../interfaces/BeaconService.md)[]

Array of DidService objects.

***

### getBeaconServiceAddressMap()

> `static` **getBeaconServiceAddressMap**(`beacons`): `Map`\<`string`, [`BeaconServiceAddress`](../interfaces/BeaconServiceAddress.md)\>

Defined in: [packages/method/src/utils/beacons.ts:267](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L267)

Create a map of address => beaconService with address field.

#### Parameters

##### beacons

[`BeaconService`](../interfaces/BeaconService.md)[]

The list of beacon services.

#### Returns

`Map`\<`string`, [`BeaconServiceAddress`](../interfaces/BeaconServiceAddress.md)\>

A map of address => beaconService.

***

### getBeaconServiceIds()

> `static` **getBeaconServiceIds**(`didDocument`): `string`[]

Defined in: [packages/method/src/utils/beacons.ts:277](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L277)

Get the beacon service ids from a list of beacon services.

#### Parameters

##### didDocument

[`Btc1DidDocument`](Btc1DidDocument.md)

The DID Document to extract the services from.

#### Returns

`string`[]

An array of beacon service ids.

***

### getBeaconServices()

> `static` **getBeaconServices**(`didDocument`): [`BeaconService`](../interfaces/BeaconService.md)[]

Defined in: [packages/method/src/utils/beacons.ts:82](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L82)

Extracts the services from a given DID Document

#### Parameters

##### didDocument

`DidDocument`

The DID Document to extract the services from

#### Returns

[`BeaconService`](../interfaces/BeaconService.md)[]

An array of DidService objects

#### Throws

if the didDocument is not provided

***

### isBeaconService()

> `static` **isBeaconService**(`obj`): `boolean`

Defined in: [packages/method/src/utils/beacons.ts:59](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L59)

Validates that the given object is a Beacon Service

#### Parameters

##### obj

`any`

The object to validate

#### Returns

`boolean`

A boolean indicating whether the object is a Beacon Service

***

### manufactureBeacon()

> `static` **manufactureBeacon**(`params`): [`BeaconService`](../interfaces/BeaconService.md)

Defined in: [packages/method/src/utils/beacons.ts:249](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L249)

Manufacture a pre-filled Beacon using the BeaconFactory.

#### Parameters

##### params

[`BeaconService`](../interfaces/BeaconService.md)

Required parameters for generating a single Beacon Service.

#### Returns

[`BeaconService`](../interfaces/BeaconService.md)

One BeaconService object.

***

### parseBitcoinAddress()

> `static` **parseBitcoinAddress**(`uri`): `string`

Defined in: [packages/method/src/utils/beacons.ts:47](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L47)

Converts a BIP21 Bitcoin URI to a Bitcoin address

#### Parameters

##### uri

`string`

The BIP21 Bitcoin URI to convert

#### Returns

`string`

The Bitcoin address extracted from the URI

#### Throws

if the URI is not a valid Bitcoin URI

***

### toBeaconServiceAddress()

> `static` **toBeaconServiceAddress**(`beacons`): [`BeaconServiceAddress`](../interfaces/BeaconServiceAddress.md)[]

Defined in: [packages/method/src/utils/beacons.ts:258](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/utils/beacons.ts#L258)

Convert beacon service endpoints from BIP-21 URIs to addresses.

#### Parameters

##### beacons

[`BeaconService`](../interfaces/BeaconService.md)[]

The list of beacon services.

#### Returns

[`BeaconServiceAddress`](../interfaces/BeaconServiceAddress.md)[]

An array of beacon services with address: bitcoinAddress.
