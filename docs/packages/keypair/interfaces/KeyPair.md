[**@did-btc1/keypair**](../README.md)

***

[@did-btc1/keypair](../globals.md) / KeyPair

# Interface: KeyPair

Defined in: [pair.ts:15](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L15)

Interface for KeyPair class.
 KeyPair

## Properties

### publicKey

> `readonly` **publicKey**: [`PublicKey`](../classes/PublicKey.md)

Defined in: [pair.ts:19](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L19)

***

### secretKey?

> `readonly` `optional` **secretKey**: [`SecretKey`](../classes/SecretKey.md)

Defined in: [pair.ts:25](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L25)

#### Throws

If the secret key is not available.

## Methods

### json()

> **json**(): `SchnorrKeyPairObject`

Defined in: [pair.ts:31](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L31)

JSON representation of the SchnorrKeyPair object.

#### Returns

`SchnorrKeyPairObject`

The SchnorrKeyPair as a JSON object.
