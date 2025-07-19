[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / Logger

# Class: Logger

Defined in: [logger.ts:56](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L56)

A flexible, feature-rich logger with:
- Environment-based filtering
- Namespacing
- File/line tracing
- Timestamps
- Colorized output

## Constructors

### Constructor

&gt; **new Logger**(`namespace?`): `Logger`

Defined in: [logger.ts:60](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L60)

#### Parameters

##### namespace?

`string`

#### Returns

`Logger`

## Methods

### debug()

&gt; **debug**(`message?`, ...`args?`): `Logger`

Defined in: [logger.ts:84](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L84)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`Logger`

***

### error()

&gt; **error**(`message?`, ...`args?`): `Logger`

Defined in: [logger.ts:88](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L88)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`Logger`

***

### info()

&gt; **info**(`message?`, ...`args?`): `Logger`

Defined in: [logger.ts:92](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L92)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`Logger`

***

### log()

&gt; **log**(`message?`, ...`args?`): `Logger`

Defined in: [logger.ts:104](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L104)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`Logger`

***

### newline()

&gt; **newline**(): `Logger`

Defined in: [logger.ts:108](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L108)

#### Returns

`Logger`

***

### security()

&gt; **security**(`message?`, ...`args?`): `Logger`

Defined in: [logger.ts:100](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L100)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`Logger`

***

### warn()

&gt; **warn**(`message?`, ...`args?`): `Logger`

Defined in: [logger.ts:96](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L96)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`Logger`

***

### debug()

&gt; `static` **debug**(`message?`, ...`args?`): `void`

Defined in: [logger.ts:115](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L115)

Static methods for convenience (auto-instantiate).

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`void`

***

### error()

&gt; `static` **error**(`message?`, ...`args?`): `void`

Defined in: [logger.ts:119](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L119)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`void`

***

### info()

&gt; `static` **info**(`message?`, ...`args?`): `void`

Defined in: [logger.ts:123](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L123)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`void`

***

### log()

&gt; `static` **log**(`message?`, ...`args?`): `void`

Defined in: [logger.ts:135](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L135)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`void`

***

### newline()

&gt; `static` **newline**(): `void`

Defined in: [logger.ts:139](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L139)

#### Returns

`void`

***

### security()

&gt; `static` **security**(`message?`, ...`args?`): `void`

Defined in: [logger.ts:131](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L131)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`void`

***

### warn()

&gt; `static` **warn**(`message?`, ...`args?`): `void`

Defined in: [logger.ts:127](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/logger.ts#L127)

#### Parameters

##### message?

`unknown`

##### args?

...`unknown`[]

#### Returns

`void`
