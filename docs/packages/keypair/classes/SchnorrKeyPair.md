[**@did-btc1/keypair**](../README.md)

***

[@did-btc1/keypair](../globals.md) / SchnorrKeyPair

# Class: SchnorrKeyPair

Defined in: [pair.ts:54](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L54)

Encapsulates a PublicKey and a SecretKey object as a single Keys object.
 SchnorrKeyPair

## Implements

- [`KeyPair`](../interfaces/KeyPair.md)

## Constructors

### Constructor

> **new SchnorrKeyPair**(`secretKey`): `SchnorrKeyPair`

Defined in: [pair.ts:72](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L72)

Creates an instance of Keys. Must provide a at least a secret key.
Can optionally provide both a private and public key, but must be a valid pair.

#### Parameters

##### secretKey

`KeyParams` = `{}`

The secret key object

#### Returns

`SchnorrKeyPair`

## Accessors

### multibase

#### Get Signature

> **get** **multibase**(): `MultibaseKeys`

Defined in: [pair.ts:156](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L156)

Get the Keys in multibase format.

##### Returns

`MultibaseKeys`

The SecretKey in multibase format

***

### publicKey

#### Get Signature

> **get** **publicKey**(): [`PublicKey`](PublicKey.md)

Defined in: [pair.ts:136](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L136)

Get the PublicKey.

##### Returns

[`PublicKey`](PublicKey.md)

The PublicKey object

#### Set Signature

> **set** **publicKey**(`publicKey`): `void`

Defined in: [pair.ts:122](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L122)

Set the PublicKey.

##### Throws

If the public key is not a valid pair with the secret key.

##### Parameters

###### publicKey

[`PublicKey`](PublicKey.md)

The PublicKey object

##### Returns

`void`

#### Implementation of

[`KeyPair`](../interfaces/KeyPair.md).[`publicKey`](../interfaces/KeyPair.md#publickey)

***

### raw

#### Get Signature

> **get** **raw**(): `RawKeyPair`

Defined in: [pair.ts:145](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L145)

Get the Keys as a raw key pair.

##### Returns

`RawKeyPair`

The Keys as a raw key pair

***

### secretKey

#### Get Signature

> **get** **secretKey**(): [`SecretKey`](SecretKey.md)

Defined in: [pair.ts:103](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L103)

Get the SecretKey.

##### Throws

If the secret key is not available

##### Returns

[`SecretKey`](SecretKey.md)

The SecretKey object

#### Throws

If the secret key is not available.

#### Implementation of

[`KeyPair`](../interfaces/KeyPair.md).[`secretKey`](../interfaces/KeyPair.md#secretkey)

## Methods

### json()

> **json**(): `SchnorrKeyPairObject`

Defined in: [pair.ts:167](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L167)

JSON representation of a Keys.

#### Returns

`SchnorrKeyPairObject`

The Keys as a JSON object

#### Implementation of

[`KeyPair`](../interfaces/KeyPair.md).[`json`](../interfaces/KeyPair.md#json)

***

### equals()

> `static` **equals**(`keys`, `otherKeys`): `boolean`

Defined in: [pair.ts:236](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L236)

Compares two Keys objects for equality.

#### Parameters

##### keys

`SchnorrKeyPair`

The main keys.

##### otherKeys

`SchnorrKeyPair`

The other keys to compare.

#### Returns

`boolean`

True if the public key and secret key are equal, false otherwise.

***

### fromJSON()

> `static` **fromJSON**(`keys`): `SchnorrKeyPair`

Defined in: [pair.ts:179](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L179)

Static method creates a new Keys from a JSON object.

#### Parameters

##### keys

`SchnorrKeyPairObject`

The JSON object to initialize the Keys.

#### Returns

`SchnorrKeyPair`

The initialized Keys object.

***

### fromPrivateKey()

> `static` **fromPrivateKey**(`data`): `SchnorrKeyPair`

Defined in: [pair.ts:190](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L190)

Static method creates a new SchnorrKeyPair from a SecretKey object or secret key bytes.

#### Parameters

##### data

The secret key bytes

`Bytes` | [`SecretKey`](SecretKey.md)

#### Returns

`SchnorrKeyPair`

A new SchnorrKeyPair object

***

### fromSecret()

> `static` **fromSecret**(`secret`): `SchnorrKeyPair`

Defined in: [pair.ts:215](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L215)

Static method creates a new Keys (SecretKey/PublicKey) bigint secret.

#### Parameters

##### secret

`bigint`

The secret key secret

#### Returns

`SchnorrKeyPair`

A new Keys object

***

### generate()

> `static` **generate**(): `SchnorrKeyPair`

Defined in: [pair.ts:261](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L261)

Static method to generate a new random SchnorrKeyPair instance.

#### Returns

`SchnorrKeyPair`

A new SecretKey object.

***

### toHex()

> `static` **toHex**(`keyBytes`): `Hex`

Defined in: [pair.ts:226](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/pair.ts#L226)

Converts key bytes to a hex string.

#### Parameters

##### keyBytes

`Bytes`

The key bytes (private or public).

#### Returns

`Hex`

The key bytes as a hex string.
