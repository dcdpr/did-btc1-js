[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / ImportDescriptorRequest

# Type Alias: ImportDescriptorRequest

&gt; **ImportDescriptorRequest** = `object`

Defined in: [packages/method/src/types/bitcoin.ts:603](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L603)

## Properties

### active?

&gt; `optional` **active**: `boolean`

Defined in: [packages/method/src/types/bitcoin.ts:615](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L615)

(boolean, optional, default=false) Make descriptor "active" for corresponding output type/externality

***

### desc

&gt; **desc**: `string`

Defined in: [packages/method/src/types/bitcoin.ts:605](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L605)

(string, required) Descriptor to import.

***

### internal?

&gt; `optional` **internal**: `boolean`

Defined in: [packages/method/src/types/bitcoin.ts:621](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L621)

(boolean, optional, default=false) Whether matching outputs should be treated as not incoming payments (e.g. change)

***

### label?

&gt; `optional` **label**: `string`

Defined in: [packages/method/src/types/bitcoin.ts:623](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L623)

(string, optional, default="") Label to assign to the address, only allowed with internal=false. Disabled for ranged descriptors

***

### next\_index?

&gt; `optional` **next\_index**: `number`

Defined in: [packages/method/src/types/bitcoin.ts:619](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L619)

(numeric, optional) If a ranged descriptor is set to active, this specifies the next index to generate addresses from

***

### range?

&gt; `optional` **range**: `number` \| `number`[]

Defined in: [packages/method/src/types/bitcoin.ts:617](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L617)

(numeric or array, optional) If a ranged descriptor is used, this specifies the end or the range (in the form [begin,end]) to import

***

### timestamp

&gt; **timestamp**: `number` \| `string`

Defined in: [packages/method/src/types/bitcoin.ts:613](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L613)

(integer / string, required) Time from which to start rescanning the blockchain for this descriptor, in UNIX epoch time
Use the string "now" to substitute the current synced blockchain time.
"now" can be specified to bypass scanning, for outputs which are known to never have been used, and
0 can be specified to scan the entire blockchain. Blocks up to 2 hours before the earliest timestamp
of all descriptors being imported will be scanned as well as the mempool.
