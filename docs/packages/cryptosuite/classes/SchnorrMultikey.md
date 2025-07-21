[**@did-btc1/cryptosuite**](../README.md)

***

[@did-btc1/cryptosuite](../globals.md) / SchnorrMultikey

# Class: SchnorrMultikey

Defined in: [multikey/index.ts:28](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L28)

SchnorrMultikey is an implementation of [2.1.1 Multikey](https://dcdpr.github.io/data-integrity-schnorr-secp256k1/#multikey).
The publicKeyMultibase value of the verification method MUST be a base-58-btc Multibase encoding of a Multikey encoded secp256k1 public key.
The secretKeyMultibase value of the verification method MUST be a Multikey encoding of a secp256k1 secret key.
 SchnorrMultikey

## Implements

- [`Multikey`](../interfaces/Multikey.md)

## Constructors

### Constructor

> **new SchnorrMultikey**(`params`): `SchnorrMultikey`

Defined in: [multikey/index.ts:51](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L51)

Creates an instance of SchnorrMultikey.

#### Parameters

##### params

`MultikeyParams`

The parameters to create the multikey

#### Returns

`SchnorrMultikey`

#### Throws

if neither a publicKey nor a privateKey is provided

## Properties

### controller

> `readonly` **controller**: `string`

Defined in: [multikey/index.ts:36](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L36)

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`controller`](../interfaces/Multikey.md#controller)

***

### id

> `readonly` **id**: `string`

Defined in: [multikey/index.ts:33](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L33)

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`id`](../interfaces/Multikey.md#id)

***

### type

> `readonly` `static` **type**: `string` = `'Multikey'`

Defined in: [multikey/index.ts:30](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L30)

## Accessors

### keys

#### Get Signature

> **get** **keys**(): `SchnorrKeyPair`

Defined in: [multikey/index.ts:69](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L69)

##### Returns

`SchnorrKeyPair`

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`keys`](../interfaces/Multikey.md#keys)

***

### publicKey

#### Get Signature

> **get** **publicKey**(): `PublicKey`

Defined in: [multikey/index.ts:76](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L76)

##### Returns

`PublicKey`

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`publicKey`](../interfaces/Multikey.md#publickey)

***

### secretKey

#### Get Signature

> **get** **secretKey**(): `SecretKey`

Defined in: [multikey/index.ts:83](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L83)

##### Returns

`SecretKey`

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`secretKey`](../interfaces/Multikey.md#secretkey)

***

### signer

#### Get Signature

> **get** **signer**(): `boolean`

Defined in: [multikey/index.ts:242](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L242)

##### Returns

`boolean`

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`signer`](../interfaces/Multikey.md#signer)

## Methods

### fromVerificationMethod()

> **fromVerificationMethod**(`verificationMethod`): [`Multikey`](../interfaces/Multikey.md)

Defined in: [multikey/index.ts:192](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L192)

Convert a verification method to a multikey.

#### Parameters

##### verificationMethod

`DidVerificationMethod`

The verification method to convert.

#### Returns

[`Multikey`](../interfaces/Multikey.md)

Multikey instance.

#### Throws

if the verification method is missing required fields.
if the verification method has an invalid type.
if the publicKeyMultibase has an invalid prefix.

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`fromVerificationMethod`](../interfaces/Multikey.md#fromverificationmethod)

***

### fullId()

> **fullId**(): `string`

Defined in: [multikey/index.ts:164](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L164)

Get the full id of the multikey

#### Returns

`string`

The full id of the multikey

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`fullId`](../interfaces/Multikey.md#fullid)

***

### json()

> **json**(): [`MultikeyObject`](../type-aliases/MultikeyObject.md)

Defined in: [multikey/index.ts:250](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L250)

Convert the multikey to a JSON object.

#### Returns

[`MultikeyObject`](../type-aliases/MultikeyObject.md)

The multikey as a JSON object.

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`json`](../interfaces/Multikey.md#json)

***

### sign()

> **sign**(`data`, `opts?`): `Bytes`

Defined in: [multikey/index.ts:109](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L109)

Produce a schnorr signature over arbitrary data.

#### Parameters

##### data

`Hex`

Data to be signed.

##### opts?

`CryptoOptions`

#### Returns

`Bytes`

Signature byte array.

#### Throws

if no private key is provided.

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`sign`](../interfaces/Multikey.md#sign)

***

### toCryptosuite()

> **toCryptosuite**(`cryptosuite?`): [`Cryptosuite`](Cryptosuite.md)

Defined in: [multikey/index.ts:99](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L99)

Constructs an instance of Cryptosuite from the current Multikey instance.

#### Parameters

##### cryptosuite?

`"bip340-jcs-2025"` | `"bip340-rdfc-2025"`

#### Returns

[`Cryptosuite`](Cryptosuite.md)

***

### toVerificationMethod()

> **toVerificationMethod**(): `DidVerificationMethod`

Defined in: [multikey/index.ts:173](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L173)

Convert the multikey to a verification method.

#### Returns

`DidVerificationMethod`

The verification method.

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`toVerificationMethod`](../interfaces/Multikey.md#toverificationmethod)

***

### verify()

> **verify**(`signature`, `data`, `opts?`): `boolean`

Defined in: [multikey/index.ts:137](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L137)

Verify a schnorr signature.

#### Parameters

##### signature

`Bytes`

Signature for verification.

##### data

`Hex`

Data for verification.

##### opts?

`CryptoOptions`

#### Returns

`boolean`

If the signature is valid against the public key.

#### Implementation of

[`Multikey`](../interfaces/Multikey.md).[`verify`](../interfaces/Multikey.md#verify)

***

### verifyEcdsa()

> **verifyEcdsa**(`signature`, `data`): `boolean`

Defined in: [multikey/index.ts:155](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L155)

Verify an ecdsa signature.

#### Parameters

##### signature

`Bytes`

Signature for verification.

##### data

`Hex`

Data for verification.

#### Returns

`boolean`

If the signature is valid against the public key.

***

### fromPrivateKey()

> `static` **fromPrivateKey**(`params`): `SchnorrMultikey`

Defined in: [multikey/index.ts:284](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L284)

Creates a `Multikey` instance from a private key

#### Parameters

##### params

[`FromSecretKey`](../interfaces/FromSecretKey.md)

The parameters to create the multikey

#### Returns

`SchnorrMultikey`

The new multikey instance

***

### fromPublicKey()

> `static` **fromPublicKey**(`params`): [`Multikey`](../interfaces/Multikey.md)

Defined in: [multikey/index.ts:306](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L306)

Creates a `Multikey` instance from a public key

#### Parameters

##### params

[`FromPublicKey`](../interfaces/FromPublicKey.md)

The parameters to create the multikey

#### Returns

[`Multikey`](../interfaces/Multikey.md)

The new multikey instance

***

### fromPublicKeyMultibase()

> `static` **fromPublicKeyMultibase**(`params`): `SchnorrMultikey`

Defined in: [multikey/index.ts:322](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L322)

Creates a `Multikey` instance from a public key multibase.

#### Parameters

##### params

[`FromPublicKeyMultibaseParams`](../interfaces/FromPublicKeyMultibaseParams.md)

See [FromPublicKeyMultibaseParams](../interfaces/FromPublicKeyMultibaseParams.md) for details.

#### Returns

`SchnorrMultikey`

The new multikey instance.

***

### initialize()

> `static` **initialize**(`params`): `SchnorrMultikey`

Defined in: [multikey/index.ts:272](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/multikey/index.ts#L272)

Static convenience method to create a new Multikey instance.

#### Parameters

##### params

`MultikeyParams`

The parameters to create the multikey

#### Returns

`SchnorrMultikey`

A new Multikey instance

#### Throws

if neither a publicKey nor a privateKey is provided
