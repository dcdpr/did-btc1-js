# Class: DidMethodError

Defined in: [packages/common/src/errors.ts:119](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L119)

## Extends

- `Error`

## Extended by

- [`MethodError`](MethodError.md)
- [`ResolveError`](ResolveError.md)
- [`KeyManagerError`](KeyManagerError.md)
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

> **new DidMethodError**(`message`, `options`): `DidMethodError`

Defined in: [packages/common/src/errors.ts:124](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L124)

#### Parameters

##### message

`string`

##### options

[`ErrorOptions`](../type-aliases/ErrorOptions.md) = `{}`

#### Returns

`DidMethodError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

***

### data?

> `optional` **data**: `Record`&lt;`string`, `any`&gt;

Defined in: [packages/common/src/errors.ts:122](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L122)

***

### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string` = `'DidMethodError'`

Defined in: [packages/common/src/errors.ts:120](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L120)

#### Overrides

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### type

> **type**: `string` = `'DidMethodError'`

Defined in: [packages/common/src/errors.ts:121](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L121)

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/.pnpm/@types+node@22.13.13/node\_modules/@types/node/globals.d.ts:143

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.13.13/node\_modules/@types/node/globals.d.ts:145

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/.pnpm/@types+node@22.13.13/node\_modules/@types/node/globals.d.ts:136

Create .stack property on a target object

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`
