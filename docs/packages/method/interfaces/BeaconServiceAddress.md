[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / BeaconServiceAddress

# Interface: BeaconServiceAddress

Defined in: [packages/method/src/interfaces/ibeacon.ts:66](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L66)

## Extends

- [`BeaconService`](BeaconService.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### address

&gt; **address**: `string`

Defined in: [packages/method/src/interfaces/ibeacon.ts:67](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L67)

***

### casType?

&gt; `optional` **casType**: `string`

Defined in: [packages/method/src/interfaces/ibeacon.ts:63](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L63)

#### Inherited from

[`BeaconService`](BeaconService.md).[`casType`](BeaconService.md#castype)

***

### serviceEndpoint

&gt; **serviceEndpoint**: `DidServiceEndpoint`

Defined in: [packages/method/src/interfaces/ibeacon.ts:62](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L62)

A URI that can be used to interact with the DID service.

The value of the `serviceEndpoint` property MUST be a string, an object containing key/value
pairs, or an array composed of strings or objects. All string values MUST be valid URIs
conforming to [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986).

#### Inherited from

[`BeaconService`](BeaconService.md).[`serviceEndpoint`](BeaconService.md#serviceendpoint)
