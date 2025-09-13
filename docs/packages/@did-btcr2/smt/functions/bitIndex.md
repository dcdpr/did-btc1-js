# Function: bitIndex()

> **bitIndex**(`i`, `key`): `number`

Defined in: [utils.ts:49](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/smt/src/utils.ts#L49)

bitIndex extracts the i-th bit (0 or 1) from a 256-bit key (assuming i in [0..255]).
This is used in the compacted-leaf logic and typical SMT insertion/lookup code.

- bytePos = i \>\>\> 3     -\> i / 8
- bitPos  = 7 - (i & 7) -\> offset from the left

## Parameters

### i

`number`

### key

`Uint8Array`

## Returns

`number`
