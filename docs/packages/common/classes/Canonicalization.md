[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / Canonicalization

# Class: Canonicalization

Defined in: [canonicalization.ts:16](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L16)

Canonicalization class provides methods for canonicalizing JSON objects
and hashing them using SHA-256. It supports different canonicalization
algorithms and encoding formats (hex and base58).
 Canonicalization

## Constructors

### Constructor

> **new Canonicalization**(`algorithm`): `Canonicalization`

Defined in: [canonicalization.ts:23](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L23)

Initializes the Canonicalization class with the specified algorithm.

#### Parameters

##### algorithm

[`CanonicalizationAlgorithm`](../type-aliases/CanonicalizationAlgorithm.md) = `'jcs'`

The canonicalization algorithm to use ('jcs' or 'rdfc').

#### Returns

`Canonicalization`

## Accessors

### algorithm

#### Get Signature

> **get** **algorithm**(): [`CanonicalizationAlgorithm`](../type-aliases/CanonicalizationAlgorithm.md)

Defined in: [canonicalization.ts:47](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L47)

Gets the canonicalization algorithm.

##### Returns

[`CanonicalizationAlgorithm`](../type-aliases/CanonicalizationAlgorithm.md)

The current canonicalization algorithm.

#### Set Signature

> **set** **algorithm**(`algorithm`): `void`

Defined in: [canonicalization.ts:31](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L31)

Sets the canonicalization algorithm.

##### Parameters

###### algorithm

Either 'jcs' or 'rdfc'.

`"jcs"` | `"rdfc"`

##### Returns

`void`

## Methods

### base58()

> **base58**(`hashBytes`): `string`

Defined in: [canonicalization.ts:143](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L143)

Step 3.2: Encodes HashBytes (Uint8Array) to a base58btc string.

#### Parameters

##### hashBytes

[`Bytes`](../type-aliases/Bytes.md)

The hash as a Uint8Array.

#### Returns

`string`

The hash as a hex string.

***

### canonicalhash()

> **canonicalhash**(`object`): `Promise`\<[`Bytes`](../type-aliases/Bytes.md)\>

Defined in: [canonicalization.ts:153](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L153)

Canonicalizes an object, hashes it and returns it as hash bytes.
Step 1-2: Canonicalize → Hash.

#### Parameters

##### object

[`JSONObject`](../type-aliases/JSONObject.md)

The object to process.

#### Returns

`Promise`\<[`Bytes`](../type-aliases/Bytes.md)\>

The final SHA-256 hash bytes.

***

### canonicalize()

> **canonicalize**(`object`): `Promise`\<`string`\>

Defined in: [canonicalization.ts:80](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L80)

Step 1: Uses this.algorithm to determine the method (JCS/RDFC).

#### Parameters

##### object

[`JSONObject`](../type-aliases/JSONObject.md)

The object to canonicalize.

#### Returns

`Promise`\<`string`\>

The canonicalized object.

***

### encode()

> **encode**(`canonicalizedhash`, `encoding`): `string`

Defined in: [canonicalization.ts:118](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L118)

Step 3: Encodes SHA-256 hashed, canonicalized object as a hex or base58 string.

#### Parameters

##### canonicalizedhash

[`Bytes`](../type-aliases/Bytes.md)

The canonicalized object to encode.

##### encoding

`string` = `'hex'`

The encoding format ('hex' or 'base58').

#### Returns

`string`

The encoded string.

#### Throws

If the encoding format is not supported.

***

### hash()

> **hash**(`canonicalized`): [`Bytes`](../type-aliases/Bytes.md)

Defined in: [canonicalization.ts:107](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L107)

Step 2: SHA-256 hashes a canonicalized object.

#### Parameters

##### canonicalized

`string`

The canonicalized object.

#### Returns

[`Bytes`](../type-aliases/Bytes.md)

The SHA-256 HashBytes (Uint8Array).

***

### hashb58()

> **hashb58**(`canonicalized`): `string`

Defined in: [canonicalization.ts:174](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L174)

Computes the SHA-256 hashes of canonicalized object and encodes it as a base58 string.
Step 2-3: Hash → Encode(base58).

#### Parameters

##### canonicalized

`string`

The canonicalized object to hash.

#### Returns

`string`

The SHA-256 hash as a base58 string.

***

### hashhex()

> **hashhex**(`canonicalized`): `string`

Defined in: [canonicalization.ts:164](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L164)

Computes the SHA-256 hash of a canonicalized object and encodes it as a hex string.
Step 2-3: Hash → Encode(Hex).

#### Parameters

##### canonicalized

`string`

The canonicalized object to hash.

#### Returns

`string`

The SHA-256 hash as a hex string.

***

### hex()

> **hex**(`hashBytes`): `string`

Defined in: [canonicalization.ts:134](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L134)

Step 3.1: Encodes HashBytes (Uint8Array) to a hex string.

#### Parameters

##### hashBytes

[`Bytes`](../type-aliases/Bytes.md)

The hash as a Uint8Array.

#### Returns

`string`

The hash as a hex string.

***

### jcs()

> **jcs**(`object`): `any`

Defined in: [canonicalization.ts:89](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L89)

Step 1: Canonicalizes an object using JCS (JSON Canonicalization Scheme).

#### Parameters

##### object

[`JSONObject`](../type-aliases/JSONObject.md)

The object to canonicalize.

#### Returns

`any`

The canonicalized object.

***

### process()

> **process**(`object`, `encoding`): `Promise`\<`string`\>

Defined in: [canonicalization.ts:64](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L64)

Implements [9.2 JSON Canonicalization and Hash](http://dcdpr.github.io/did-btc1/#json-canonicalization-and-hash).

A macro function that takes in a JSON document, document, and canonicalizes it following the JSON Canonicalization
Scheme. The function returns the canonicalizedBytes.

Optionally encodes a sha256 hashed canonicalized JSON object.
Step 1 Canonicalize (JCS/RDFC) → Step 2 Hash (SHA256) → Step 3 Encode (Hex/Base58).

#### Parameters

##### object

[`JSONObject`](../type-aliases/JSONObject.md)

The object to process.

##### encoding

`string` = `'hex'`

The encoding format ('hex' or 'base58').

#### Returns

`Promise`\<`string`\>

The final SHA-256 hash bytes as a hex string.

***

### rdfc()

> **rdfc**(`object`): `Promise`\<`string`\>

Defined in: [canonicalization.ts:98](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/canonicalization.ts#L98)

Step 1: Canonicalizes an object using RDF Canonicalization (RDFC).

#### Parameters

##### object

[`JSONObject`](../type-aliases/JSONObject.md)

The object to canonicalize.

#### Returns

`Promise`\<`string`\>

The canonicalized object.
