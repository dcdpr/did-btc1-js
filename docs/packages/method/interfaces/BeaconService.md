[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / BeaconService

# Interface: BeaconService

Defined in: [packages/method/src/interfaces/ibeacon.ts:61](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L61)

## Extends

- `DidService`

## Extended by

- [`BeaconServiceAddress`](BeaconServiceAddress.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### casType?

> `optional` **casType**: `string`

Defined in: [packages/method/src/interfaces/ibeacon.ts:63](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L63)

***

### serviceEndpoint

> **serviceEndpoint**: `DidServiceEndpoint`

Defined in: [packages/method/src/interfaces/ibeacon.ts:62](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/interfaces/ibeacon.ts#L62)

A URI that can be used to interact with the DID service.

The value of the `serviceEndpoint` property MUST be a string, an object containing key/value
pairs, or an array composed of strings or objects. All string values MUST be valid URIs
conforming to [RFC3986](https://datatracker.ietf.org/doc/html/rfc3986).

#### Overrides

`IDidService.serviceEndpoint`
