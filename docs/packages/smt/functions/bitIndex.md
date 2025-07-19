[**@did-btc1/smt**](../README.md)

***

[@did-btc1/smt](../globals.md) / bitIndex

# Function: bitIndex()

&gt; **bitIndex**(`i`, `key`): `number`

Defined in: [utils.ts:49](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/smt/src/utils.ts#L49)

bitIndex extracts the i-th bit (0 or 1) from a 256-bit key (assuming i in [0..255]).
This is used in the compacted-leaf logic and typical SMT insertion/lookup code.

- bytePos = i &gt;&gt;&gt; 3     -&gt; i / 8
- bitPos  = 7 - (i & 7) -&gt; offset from the left

## Parameters

### i

`number`

### key

`Uint8Array`

## Returns

`number`
