[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / SidecarData

# Interface: SidecarData

Defined in: [interfaces.ts:210](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L210)

A container for out-of-band data the resolver may need. This includes the
initial DID document if it isn't stored in IPFS, plus references for each
on-chain Beacon signal.

DID BTC1
[4.2.1.2.1 Sidecar Initial Document Validation](https://dcdpr.github.io/did-btc1/#sidecar-initial-document-validation),
[4.2.2 Resolve Target Document](https://dcdpr.github.io/did-btc1/#resolve-target-document),
[4.2.2.2 Traverse Blockchain History](https://dcdpr.github.io/did-btc1/#traverse-blockchain-history),
[4.2.2.3 Find Next Signals](https://dcdpr.github.io/did-btc1/#find-next-signals).

## Properties

### initialDocument?

&gt; `optional` **initialDocument**: `Record`\<`string`, `any`\&gt;

Defined in: [interfaces.ts:215](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L215)

The initial DID Document for an externally created did:btc1,
if not fetched from IPFS or another CAS.

***

### signalsMetadata?

&gt; `optional` **signalsMetadata**: `object`

Defined in: [interfaces.ts:222](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L222)

A map from Bitcoin transaction IDs to the sidecar info about that signal.
Each signal might provide a single DID Update Payload, or (for aggregator beacons)
a bundle or proofs.

#### Index Signature

\[`txid`: `string`\]: [`SignalSidecarData`](SignalSidecarData.md)
