[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / SignalSidecarData

# Interface: SignalSidecarData

Defined in: [interfaces.ts:233](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L233)

Sidecar data for a specific Beacon Signal. Different Beacon types store different fields.
- SingletonBeacon might just store one `updatePayload`.
- CIDAggregateBeacon might store `updateBundle` + an `updatePayload`.
- SMTAggregateBeacon might store `updatePayload` + a `smtProof`.

## Properties

### smtProof?

> `optional` **smtProof**: [`SmtProof`](SmtProof.md)

Defined in: [interfaces.ts:240](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L240)

For SMTAggregateBeacon, a Merkle proof that the `updatePayload`
is included (or not included) in the aggregator's Sparse Merkle Tree.

***

### updateBundle?

> `optional` **updateBundle**: [`DidUpdateBundle`](DidUpdateBundle.md)

Defined in: [interfaces.ts:235](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L235)

***

### updatePayload?

> `optional` **updatePayload**: [`DidUpdateInvocation`](DidUpdateInvocation.md)

Defined in: [interfaces.ts:234](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L234)
