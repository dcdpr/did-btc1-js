[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / BitcoinSigner

# Interface: BitcoinSigner

Defined in: [packages/method/src/btc1/key-manager/interface.ts:121](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/interface.ts#L121)

## Methods

### signTransaction()

&gt; **signTransaction**(`txHex`, `keyUri?`): `Promise`\<`Hex`\&gt;

Defined in: [packages/method/src/btc1/key-manager/interface.ts:128](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/btc1/key-manager/interface.ts#L128)

Signs a Bitcoin transaction with a key pair.

#### Parameters

##### txHex

`Hex`

The hex-encoded transaction to sign.

##### keyUri?

`string`

The URI of the key to sign the transaction with.

#### Returns

`Promise`\<`Hex`\&gt;

A promise that resolves to the hex-encoded signed transaction.
