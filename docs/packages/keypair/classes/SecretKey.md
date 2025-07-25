[**@did-btc1/keypair**](../README.md)

***

[@did-btc1/keypair](../globals.md) / SecretKey

# Class: SecretKey

Defined in: [secret.ts:79](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L79)

Encapsulates a secp256k1 secret key
Provides get methods for different formats (raw, secret, point).
Provides helpers methods for comparison, serialization and publicKey generation.
 SecretKey

## Implements

- [`ISecretKey`](../interfaces/ISecretKey.md)

## Constructors

### Constructor

&gt; **new SecretKey**(`entropy`): `SecretKey`

Defined in: [secret.ts:94](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L94)

Instantiates an instance of SecretKey.

#### Parameters

##### entropy

`Entropy`

bytes (Uint8Array) or secret (bigint)

#### Returns

`SecretKey`

#### Throws

If entropy is not provided, not a valid 32-byte secret key or not a valid bigint seed

## Accessors

### bytes

#### Get Signature

&gt; **get** **bytes**(): `Uint8Array`

Defined in: [secret.ts:139](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L139)

Get the secret key entropy as a byte array.

##### Returns

`Uint8Array`

The secret key bytes as a Uint8Array

Get the secret key bytes.

#### Implementation of

[`ISecretKey`](../interfaces/ISecretKey.md).[`bytes`](../interfaces/ISecretKey.md#bytes)

***

### hex

#### Get Signature

&gt; **get** **hex**(): `Hex`

Defined in: [secret.ts:159](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L159)

Returns the raw secret key as a hex string.

##### Returns

`Hex`

The secret key as a hex string

Get the secret key as a hex string.

#### Implementation of

[`ISecretKey`](../interfaces/ISecretKey.md).[`hex`](../interfaces/ISecretKey.md#hex)

***

### multibase

#### Get Signature

&gt; **get** **multibase**(): `string`

Defined in: [secret.ts:169](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L169)

Encode the secret key bytes as a secretKeyMultibase string.

##### Returns

`string`

The secret key in base58btc multibase format

***

### seed

#### Get Signature

&gt; **get** **seed**(): `bigint`

Defined in: [secret.ts:149](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L149)

Get the secret key entropy as a bigint.

##### Returns

`bigint`

The secret key as a bigint

Getter returns the secret key bytes in bigint format.
Setter allows alternative method of using a bigint seed for the entropy.

#### Implementation of

[`ISecretKey`](../interfaces/ISecretKey.md).[`seed`](../interfaces/ISecretKey.md#seed)

## Methods

### computePublicKey()

&gt; **computePublicKey**(): `Bytes`

Defined in: [secret.ts:212](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L212)

Computes the public key from the secret key bytes.

#### Returns

`Bytes`

The computed public key

#### Implementation of

[`ISecretKey`](../interfaces/ISecretKey.md).[`computePublicKey`](../interfaces/ISecretKey.md#computepublickey)

***

### encode()

&gt; **encode**(): `string`

Defined in: [secret.ts:178](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L178)

Encodes the secret key bytes to BIP340 multibase format.

#### Returns

`string`

The secret key in BIP340 multibase format.

***

### equals()

&gt; **equals**(`other`): `boolean`

Defined in: [secret.ts:203](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L203)

Checks if this secret key is equal to another.

#### Parameters

##### other

`SecretKey`

The other secret key

#### Returns

`boolean`

True if the private keys are equal, false otherwise

#### Implementation of

[`ISecretKey`](../interfaces/ISecretKey.md).[`equals`](../interfaces/ISecretKey.md#equals)

***

### isValid()

&gt; **isValid**(): `boolean`

Defined in: [secret.ts:251](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L251)

Checks if the secret key is valid.

#### Returns

`boolean`

True if the secret key is valid, false otherwise

#### Implementation of

[`ISecretKey`](../interfaces/ISecretKey.md).[`isValid`](../interfaces/ISecretKey.md#isvalid)

***

### isValidPair()

&gt; **isValidPair**(`pk`): `boolean`

Defined in: [secret.ts:260](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L260)

Checks if the public key is a valid secp256k1 point.

#### Parameters

##### pk

[`PublicKey`](PublicKey.md)

The public key to validate

#### Returns

`boolean`

True if the public key is valid, false otherwise

***

### json()

&gt; **json**(): `SecretKeyObject`

Defined in: [secret.ts:239](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L239)

Converts the secret key to a JSON object.

#### Returns

`SecretKeyObject`

The secret key as a JSON object

#### Implementation of

[`ISecretKey`](../interfaces/ISecretKey.md).[`json`](../interfaces/ISecretKey.md#json)

***

### decode()

&gt; `static` **decode**(`multibase`): `Bytes`

Defined in: [secret.ts:275](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L275)

Decodes the multibase string to the 34-byte secret key (2 byte prefix + 32 byte key).

#### Parameters

##### multibase

`string`

The multibase string to decode

#### Returns

`Bytes`

The decoded secret key.

***

### fromJSON()

&gt; `static` **fromJSON**(`json`): `SecretKey`

Defined in: [secret.ts:310](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L310)

Creates a SecretKey object from a JSON object.

#### Parameters

##### json

`SecretKeyObject`

The JSON object containing the secret key bytes

#### Returns

`SecretKey`

A new SecretKey object

***

### fromSecret()

&gt; `static` **fromSecret**(`secret`): `SecretKey`

Defined in: [secret.ts:367](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L367)

Creates a new SecretKey object from a bigint secret.

#### Parameters

##### secret

`bigint`

The secret bigint

#### Returns

`SecretKey`

A new SecretKey object

***

### generate()

&gt; `static` **generate**(): `SecretKey`

Defined in: [secret.ts:393](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L393)

Creates a new SecretKey from random secret key bytes.

#### Returns

`SecretKey`

A new SecretKey object

***

### getPublicKey()

&gt; `static` **getPublicKey**(`bytes`): `Bytes`

Defined in: [secret.ts:406](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L406)

Generates a public key from the given secret key bytes.

#### Parameters

##### bytes

`Bytes`

The secret key bytes

#### Returns

`Bytes`

The computed public key bytes

***

### random()

&gt; `static` **random**(): `Bytes`

Defined in: [secret.ts:380](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L380)

Generates random secret key bytes.

#### Returns

`Bytes`

Uint8Array of 32 random bytes.

***

### toBytes()

&gt; `static` **toBytes**(`secret`): `Bytes`

Defined in: [secret.ts:345](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L345)

Convert a secret key bytes to a bigint secret.

#### Parameters

##### secret

`bigint`

The secret key secret.

#### Returns

`Bytes`

The secret key secret as secret key bytes.

***

### toKeyPair()

&gt; `static` **toKeyPair**(`bytes`): [`SchnorrKeyPair`](SchnorrKeyPair.md)

Defined in: [secret.ts:320](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L320)

Converts a SecretKey or KeyBytes to a Pair.

#### Parameters

##### bytes

`Bytes`

#### Returns

[`SchnorrKeyPair`](SchnorrKeyPair.md)

The SchnorrKeyPair object containing the public and private keys

#### Throws

If the secret key is not valid

***

### toSecret()

&gt; `static` **toSecret**(`bytes`): `bigint`

Defined in: [secret.ts:336](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/secret.ts#L336)

Convert a bigint secret to secret key bytes.

#### Parameters

##### bytes

`Bytes`

The secret key bytes

#### Returns

`bigint`

The secret key bytes as a bigint secret
