[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / BeaconSignal

# Interface: BeaconSignal

Defined in: [interfaces.ts:272](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L272)

Represents a transaction discovered on the Bitcoin blockchain that
spends from a Beacon address, thus announcing DID updates.

DID BTC1
[4.2.2.3 Find Next Signals](https://dcdpr.github.io/did-btc1/#find-next-signals)
and
[4.2.2.4 Process Beacon Signals](https://dcdpr.github.io/did-btc1/#process-beacon-signals).

## Properties

### beaconId

> **beaconId**: `string`

Defined in: [interfaces.ts:276](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L276)

The DID Document's `service` ID of the Beacon that produced this signal, e.g. "#cidAggregateBeacon".

***

### beaconType

> **beaconType**: [`BeaconType`](../type-aliases/BeaconType.md)

Defined in: [interfaces.ts:281](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L281)

The type of Beacon, e.g. "SingletonBeacon".

***

### tx

> **tx**: `any`

Defined in: [interfaces.ts:287](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L287)

The Bitcoin transaction that is the actual on-chain Beacon Signal.
Typically you'd store a minimal subset or a reference/ID for real usage.
