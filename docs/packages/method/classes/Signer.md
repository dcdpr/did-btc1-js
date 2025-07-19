[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Signer

# Class: Signer

Defined in: [packages/method/src/btc1/key-manager/index.ts:343](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/index.ts#L343)

## Constructors

### Constructor

&gt; **new Signer**(`params`): `Signer`

Defined in: [packages/method/src/btc1/key-manager/index.ts:347](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/index.ts#L347)

#### Parameters

##### params

[`Btc1Signer`](../interfaces/Btc1Signer.md)

#### Returns

`Signer`

## Properties

### multikey

&gt; **multikey**: `SchnorrMultikey`

Defined in: [packages/method/src/btc1/key-manager/index.ts:344](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/index.ts#L344)

***

### network

&gt; **network**: keyof `AvailableNetworks`

Defined in: [packages/method/src/btc1/key-manager/index.ts:345](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/index.ts#L345)

## Accessors

### publicKey

#### Get Signature

&gt; **get** **publicKey**(): `Bytes`

Defined in: [packages/method/src/btc1/key-manager/index.ts:352](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/index.ts#L352)

##### Returns

`Bytes`

## Methods

### sign()

&gt; **sign**(`hash`): `Bytes`

Defined in: [packages/method/src/btc1/key-manager/index.ts:357](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/index.ts#L357)

#### Parameters

##### hash

`Hex`

#### Returns

`Bytes`

***

### signSchnorr()

&gt; **signSchnorr**(`hash`): `Bytes`

Defined in: [packages/method/src/btc1/key-manager/index.ts:361](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/index.ts#L361)

#### Parameters

##### hash

`Hex`

#### Returns

`Bytes`
