[**@did-btc1/keypair**](../README.md)

***

[@did-btc1/keypair](../globals.md) / PublicKey

# Class: PublicKey

Defined in: [public.ts:102](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L102)

Encapsulates a secp256k1 public key compliant to BIP-340 BIP schnorr signature scheme.
Provides get methods for different formats (compressed, x-only, multibase).
Provides helpers methods for comparison and serialization.
 PublicKey

## Implements

- `PublicKey`

## Constructors

### Constructor

&gt; **new PublicKey**(`bytes`): `PublicKey`

Defined in: [public.ts:118](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L118)

Creates a PublicKey instance.

#### Parameters

##### bytes

`Bytes`

The public key byte array.

#### Returns

`PublicKey`

#### Throws

if the byte length is not 32 (x-only) or 33 (compressed)

## Accessors

### compressed

#### Get Signature

&gt; **get** **compressed**(): `Bytes`

Defined in: [public.ts:138](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L138)

Get the compressed public key.

##### Returns

`Bytes`

The 33-byte compressed public key (0x02 or 0x03, x).

#### Implementation of

`PublicKey.compressed`

***

### hex

#### Get Signature

&gt; **get** **hex**(): `Hex`

Defined in: [public.ts:192](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L192)

Returns the raw public key as a hex string.

##### Returns

`Hex`

The public key as a hex string.

#### Implementation of

`PublicKey.hex`

***

### multibase

#### Get Signature

&gt; **get** **multibase**(): `MultibaseObject`

Defined in: [public.ts:183](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L183)

Get the multibase public key.

##### Returns

`MultibaseObject`

An object containing the multibase bytes, address and prefix.

#### Implementation of

`PublicKey.multibase`

***

### parity

#### Get Signature

&gt; **get** **parity**(): `number`

Defined in: [public.ts:156](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L156)

Get the parity byte of the public key.

##### Returns

`number`

The parity byte of the public key.

#### Implementation of

`PublicKey.parity`

***

### point

#### Get Signature

&gt; **get** **point**(): [`Point`](../interfaces/Point.md)

Defined in: [public.ts:201](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L201)

Return the public key point.

##### Returns

[`Point`](../interfaces/Point.md)

The public key point.

#### Implementation of

`PublicKey.point`

***

### uncompressed

#### Get Signature

&gt; **get** **uncompressed**(): `Bytes`

Defined in: [public.ts:147](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L147)

Get the uncompressed public key.

##### Returns

`Bytes`

The 65-byte uncompressed public key (0x04, x, y).

#### Implementation of

`PublicKey.uncompressed`

***

### x

#### Get Signature

&gt; **get** **x**(): `Bytes`

Defined in: [public.ts:165](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L165)

Get the x-coordinate of the public key.

##### Returns

`Bytes`

The 32-byte x-coordinate of the public key.

#### Implementation of

`PublicKey.x`

***

### y

#### Get Signature

&gt; **get** **y**(): `Bytes`

Defined in: [public.ts:174](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L174)

Get the y-coordinate of the public key.

##### Returns

`Bytes`

The 32-byte y-coordinate of the public key.

#### Implementation of

`PublicKey.y`

## Methods

### decode()

&gt; **decode**(): `Bytes`

Defined in: [public.ts:238](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L238)

Decodes the multibase string to the 35-byte corresponding public key (2 byte prefix + 32 byte public key).

#### Returns

`Bytes`

The decoded public key: prefix and public key bytes

#### Implementation of

`PublicKey.decode`

***

### encode()

&gt; **encode**(): `string`

Defined in: [public.ts:272](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L272)

Encodes compressed secp256k1 public key from bytes to BIP340 multibase format.

#### Returns

`string`

The public key encoded in base-58-btc multibase format.

#### Implementation of

`PublicKey.encode`

***

### equals()

&gt; **equals**(`other`): `boolean`

Defined in: [public.ts:299](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L299)

Compares this public key to another public key.

#### Parameters

##### other

`PublicKey`

The other public key to compare

#### Returns

`boolean`

True if the public keys are equal, false otherwise.

#### Implementation of

`PublicKey.equals`

***

### json()

&gt; **json**(): `PublicKeyObject`

Defined in: [public.ts:307](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L307)

JSON representation of a PublicKey object.

#### Returns

`PublicKeyObject`

The PublicKey as a JSON object.

#### Implementation of

`PublicKey.json`

***

### liftX()

&gt; **liftX**(): `Uint8Array`

Defined in: [public.ts:384](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L384)

Lifts a 32-byte x-only coordinate into a full secp256k1 point (x, y).

#### Returns

`Uint8Array`

65-byte uncompressed public key (starts with `0x04`)

#### Implementation of

`PublicKey.liftX`

***

### modPow()

&gt; **modPow**(`base`, `exp`, `mod`): `bigint`

Defined in: [public.ts:358](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L358)

Computes modular exponentiation: (base^exp) % mod.
Used for computing modular square roots.

#### Parameters

##### base

`bigint`

The base value

##### exp

`bigint`

The exponent value

##### mod

`bigint`

The modulus value

#### Returns

`bigint`

The result of the modular exponentiation

#### Implementation of

`PublicKey.modPow`

***

### sqrtMod()

&gt; **sqrtMod**(`a`, `p`): `bigint`

Defined in: [public.ts:375](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L375)

Computes `sqrt(a) mod p` using Tonelli-Shanks algorithm.
This finds `y` such that `y^2 ≡ a mod p`.

#### Parameters

##### a

`bigint`

The value to find the square root of

##### p

`bigint`

The prime modulus

#### Returns

`bigint`

The square root of `a` mod `p`

#### Implementation of

`PublicKey.sqrtMod`

***

### fromJSON()

&gt; `static` **fromJSON**(`json`): `PublicKey`

Defined in: [public.ts:324](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L324)

Creates a PublicKey object from a JSON representation.

#### Parameters

##### json

`any`

The JSON object to initialize the PublicKey.

#### Returns

`PublicKey`

The initialized PublicKey object.

***

### fromSecretKey()

&gt; `static` **fromSecretKey**(`sk`): `PublicKey`

Defined in: [public.ts:334](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L334)

Computes the deterministic public key for a given private key.

#### Parameters

##### sk

The PrivateKey object or the private key bytes

`Bytes` | [`SecretKey`](SecretKey.md)

#### Returns

`PublicKey`

A new PublicKey object

***

### point()

&gt; `static` **point**(`pk`): [`Point`](../interfaces/Point.md)

Defined in: [public.ts:214](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L214)

Returns the point of the public key.

#### Parameters

##### pk

`Hex`

The public key in hex (Uint8Array or string) format.

#### Returns

[`Point`](../interfaces/Point.md)

The point of the public key.

#### Throws

If the public key is not a valid hex string or byte array.

***

### xOnly()

&gt; `static` **xOnly**(`x`): `Uint8Array`

Defined in: [public.ts:414](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/keypair/src/public.ts#L414)

Static version of liftX method.

#### Parameters

##### x

`Bytes`

The 32-byte x-coordinate to lift.

#### Returns

`Uint8Array`

The 65-byte uncompressed public key (0x04, x, y).
