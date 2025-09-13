# Interface: DidUpdateBundle

Defined in: [packages/common/src/interfaces.ts:191](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/interfaces.ts#L191)

A JSON object that maps did:btcr2 identifiers to the CID of the corresponding
DID Update Payload.

DID BTCR2
[5.2 CIDAggregate Beacons](https://dcdpr.github.io/did-btcr2/#cidaggregate-beacon).

## Indexable

\[`didbtcr2Identifier`: `string`\]: `string`

The keys are did:btcr2 identifiers as strings. The values are
IPFS CIDs (or other CAS IDs) referencing the actual DID Update Payload.
