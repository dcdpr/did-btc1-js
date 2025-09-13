# Class: Signer

Defined in: [packages/method/src/core/key-manager/index.ts:343](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/key-manager/index.ts#L343)

## Constructors

### Constructor

> **new Signer**(`params`): `Signer`

Defined in: [packages/method/src/core/key-manager/index.ts:347](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/key-manager/index.ts#L347)

#### Parameters

##### params

[`SignerParams`](../interfaces/SignerParams.md)

#### Returns

`Signer`

## Properties

### multikey

> **multikey**: [`SchnorrMultikey`](../../cryptosuite/classes/SchnorrMultikey.md)

Defined in: [packages/method/src/core/key-manager/index.ts:344](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/key-manager/index.ts#L344)

***

### network

> **network**: keyof `AvailableNetworks`

Defined in: [packages/method/src/core/key-manager/index.ts:345](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/key-manager/index.ts#L345)

## Accessors

### publicKey

#### Get Signature

> **get** **publicKey**(): [`Bytes`](../../common/type-aliases/Bytes.md)

Defined in: [packages/method/src/core/key-manager/index.ts:352](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/key-manager/index.ts#L352)

##### Returns

[`Bytes`](../../common/type-aliases/Bytes.md)

## Methods

### sign()

> **sign**(`hash`): [`Bytes`](../../common/type-aliases/Bytes.md)

Defined in: [packages/method/src/core/key-manager/index.ts:357](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/key-manager/index.ts#L357)

#### Parameters

##### hash

[`Hex`](../../common/type-aliases/Hex.md)

#### Returns

[`Bytes`](../../common/type-aliases/Bytes.md)

***

### signSchnorr()

> **signSchnorr**(`hash`): [`Bytes`](../../common/type-aliases/Bytes.md)

Defined in: [packages/method/src/core/key-manager/index.ts:361](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/key-manager/index.ts#L361)

#### Parameters

##### hash

[`Hex`](../../common/type-aliases/Hex.md)

#### Returns

[`Bytes`](../../common/type-aliases/Bytes.md)
