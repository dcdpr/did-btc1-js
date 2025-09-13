# Class: SecretKeyError

Defined in: [packages/common/src/errors.ts:178](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L178)

## Extends

- [`DidMethodError`](DidMethodError.md)

## Constructors

### Constructor

> **new SecretKeyError**(`message`, `type`, `data?`): `SecretKeyError`

Defined in: [packages/common/src/errors.ts:179](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L179)

#### Parameters

##### message

`string`

##### type

`string` = `'SecretKeyError'`

##### data?

`Record`&lt;`string`, `any`&gt;

#### Returns

`SecretKeyError`

#### Overrides

[`DidMethodError`](DidMethodError.md).[`constructor`](DidMethodError.md#constructor)

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

[`DidMethodError`](DidMethodError.md).[`cause`](DidMethodError.md#cause)

***

### data?

> `optional` **data**: `Record`&lt;`string`, `any`&gt;

Defined in: [packages/common/src/errors.ts:122](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L122)

#### Inherited from

[`DidMethodError`](DidMethodError.md).[`data`](DidMethodError.md#data)

***

### message

> **message**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

[`DidMethodError`](DidMethodError.md).[`message`](DidMethodError.md#message)

***

### name

> **name**: `string` = `'DidMethodError'`

Defined in: [packages/common/src/errors.ts:120](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L120)

#### Inherited from

[`DidMethodError`](DidMethodError.md).[`name`](DidMethodError.md#name)

***

### stack?

> `optional` **stack**: `string`

Defined in: node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

[`DidMethodError`](DidMethodError.md).[`stack`](DidMethodError.md#stack)

***

### type

> **type**: `string` = `'DidMethodError'`

Defined in: [packages/common/src/errors.ts:121](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/common/src/errors.ts#L121)

#### Inherited from

[`DidMethodError`](DidMethodError.md).[`type`](DidMethodError.md#type)

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

[`DidMethodError`](DidMethodError.md).[`prepareStackTrace`](DidMethodError.md#preparestacktrace)

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/.pnpm/@types+node@22.13.13/node\_modules/@types/node/globals.d.ts:145

#### Inherited from

[`DidMethodError`](DidMethodError.md).[`stackTraceLimit`](DidMethodError.md#stacktracelimit)

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

[`DidMethodError`](DidMethodError.md).[`captureStackTrace`](DidMethodError.md#capturestacktrace)
