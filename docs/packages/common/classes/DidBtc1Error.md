[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / DidBtc1Error

# Class: DidBtc1Error

Defined in: [errors.ts:119](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/errors.ts#L119)

## Extends

- `Error`

## Extended by

- [`Btc1Error`](Btc1Error.md)
- [`Btc1ReadError`](Btc1ReadError.md)
- [`Btc1KeyManagerError`](Btc1KeyManagerError.md)
- [`DidDocumentError`](DidDocumentError.md)
- [`CryptosuiteError`](CryptosuiteError.md)
- [`KeyPairError`](KeyPairError.md)
- [`SecretKeyError`](SecretKeyError.md)
- [`PublicKeyError`](PublicKeyError.md)
- [`MultikeyError`](MultikeyError.md)
- [`ProofError`](ProofError.md)
- [`SingletonBeaconError`](SingletonBeaconError.md)
- [`CIDAggregateBeaconError`](CIDAggregateBeaconError.md)
- [`SMTAggregateBeaconError`](SMTAggregateBeaconError.md)
- [`CanonicalizationError`](CanonicalizationError.md)

## Constructors

### Constructor

> **new DidBtc1Error**(`message`, `options`): `DidBtc1Error`

Defined in: [errors.ts:124](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/errors.ts#L124)

#### Parameters

##### message

`string`

##### options

[`ErrorOptions`](../type-aliases/ErrorOptions.md) = `{}`

#### Returns

`DidBtc1Error`

#### Overrides

`Error.constructor`

## Properties

### data?

> `optional` **data**: `Record`\<`string`, `any`\>

Defined in: [errors.ts:122](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/errors.ts#L122)

***

### name

> **name**: `string` = `'DidBtc1Error'`

Defined in: [errors.ts:120](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/errors.ts#L120)

#### Overrides

`Error.name`

***

### type

> **type**: `string` = `'DidBtc1Error'`

Defined in: [errors.ts:121](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/errors.ts#L121)
