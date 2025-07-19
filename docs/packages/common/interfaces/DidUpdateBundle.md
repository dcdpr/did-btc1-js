[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / DidUpdateBundle

# Interface: DidUpdateBundle

Defined in: [interfaces.ts:191](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L191)

A JSON object that maps did:btc1 identifiers to the CID of the corresponding
DID Update Payload.

DID BTC1
[5.2 CIDAggregate Beacons](https://dcdpr.github.io/did-btc1/#cidaggregate-beacon).

## Indexable

\[`didBtc1Identifier`: `string`\]: `string`

The keys are did:btc1 identifiers as strings. The values are
IPFS CIDs (or other CAS IDs) referencing the actual DID Update Payload.
