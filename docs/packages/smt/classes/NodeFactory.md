[**@did-btc1/smt**](../README.md)

***

[@did-btc1/smt](../globals.md) / NodeFactory

# Class: NodeFactory

Defined in: [factory.ts:9](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/smt/src/factory.ts#L9)

## Constructors

### Constructor

> **new NodeFactory**(`hasher`): `NodeFactory`

Defined in: [factory.ts:10](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/smt/src/factory.ts#L10)

#### Parameters

##### hasher

[`HashStrategy`](../interfaces/HashStrategy.md)

#### Returns

`NodeFactory`

## Methods

### createBranch()

> **createBranch**(`left`, `right`): [`Branch`](Branch.md)

Defined in: [factory.ts:21](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/smt/src/factory.ts#L21)

#### Parameters

##### left

[`Node`](../interfaces/Node.md)

##### right

[`Node`](../interfaces/Node.md)

#### Returns

[`Branch`](Branch.md)

***

### createEmptyLeaf()

> **createEmptyLeaf**(): [`Leaf`](Leaf.md)

Defined in: [factory.ts:16](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/smt/src/factory.ts#L16)

#### Returns

[`Leaf`](Leaf.md)

***

### createLeaf()

> **createLeaf**(`value`, `sum`): [`Leaf`](Leaf.md)

Defined in: [factory.ts:12](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/smt/src/factory.ts#L12)

#### Parameters

##### value

`Uint8Array`

##### sum

`bigint`

#### Returns

[`Leaf`](Leaf.md)
