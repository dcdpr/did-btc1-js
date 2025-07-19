[**@did-btc1/smt**](../README.md)

***

[@did-btc1/smt](../globals.md) / bitIndex

# Function: bitIndex()

> **bitIndex**(`i`, `key`): `number`

Defined in: [utils.ts:49](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/smt/src/utils.ts#L49)

bitIndex extracts the i-th bit (0 or 1) from a 256-bit key (assuming i in [0..255]).
This is used in the compacted-leaf logic and typical SMT insertion/lookup code.

- bytePos = i >>> 3     -> i / 8
- bitPos  = 7 - (i & 7) -> offset from the left

## Parameters

### i

`number`

### key

`Uint8Array`

## Returns

`number`
