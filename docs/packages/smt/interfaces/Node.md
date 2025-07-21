[**@did-btc1/smt**](../README.md)

***

[@did-btc1/smt](../globals.md) / Node

# Interface: Node

Defined in: [node.ts:4](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/smt/src/node.ts#L4)

## Methods

### copy()

&gt; **copy**(): `Node`

Defined in: [node.ts:15](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/smt/src/node.ts#L15)

copy performs a deep copy (or "computed" reference).
In real usage, you might store partial subtrees or do a shallow copy.

#### Returns

`Node`

***

### getHash()

&gt; **getHash**(): `Uint8Array`

Defined in: [node.ts:6](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/smt/src/node.ts#L6)

getHash returns the Merkle hash of this node.

#### Returns

`Uint8Array`

***

### getSum()

&gt; **getSum**(): `bigint`

Defined in: [node.ts:9](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/smt/src/node.ts#L9)

getSum returns the 64-bit sum that this node contributes upward.

#### Returns

`bigint`
