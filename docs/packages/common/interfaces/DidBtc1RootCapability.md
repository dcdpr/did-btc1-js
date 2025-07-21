[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / DidBtc1RootCapability

# Interface: DidBtc1RootCapability

Defined in: [interfaces.ts:306](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L306)

A ZCAP-LD root capability object that authorizes updates for a particular did:btc1.

DID BTC1
[9.4.1 Derive Root Capability from did:btc1 Identifier](https://dcdpr.github.io/did-btc1/#derive-root-capability-from-didbtc1-identifier).

## Example

```
{
  "@context": "https://w3id.org/zcap/v1",
  "id": "urn:zcap:root:did%3Abtc1%3Ak1qq...",
  "controller": "did:btc1:k1qq...",
  "invocationTarget": "did:btc1:k1qq..."
}
```

## Properties

### @context

> **@context**: `string` \| `string`[]

Defined in: [interfaces.ts:307](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L307)

***

### controller

> **controller**: `string`

Defined in: [interfaces.ts:309](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L309)

***

### id

> **id**: `string`

Defined in: [interfaces.ts:308](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L308)

***

### invocationTarget

> **invocationTarget**: `string`

Defined in: [interfaces.ts:310](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L310)
