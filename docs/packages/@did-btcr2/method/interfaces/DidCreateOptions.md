# Interface: DidCreateOptions

Defined in: [packages/method/src/core/crud/create.ts:30](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/crud/create.ts#L30)

## Extends

- `DidCreateOptions`&lt;[`KeyManager`](../classes/KeyManager.md)&gt;

## Properties

### network?

> `optional` **network**: `string`

Defined in: [packages/method/src/core/crud/create.ts:34](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/crud/create.ts#L34)

Bitcoin Network

***

### verificationMethods?

> `optional` **verificationMethods**: `DidCreateVerificationMethod`&lt;[`KeyManager`](../classes/KeyManager.md)&gt;[]

Defined in: node\_modules/.pnpm/@web5+dids@1.2.0/node\_modules/@web5/dids/dist/types/methods/did-method.d.ts:17

Optional. An array of verification methods to be included in the DID document.

#### Inherited from

`IDidCreateOptions.verificationMethods`

***

### version?

> `optional` **version**: `number`

Defined in: [packages/method/src/core/crud/create.ts:32](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/core/crud/create.ts#L32)

DID BTCR2 Version Number
