[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1Identifier

# Class: Btc1Identifier

Defined in: [packages/method/src/utils/identifier.ts:17](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/identifier.ts#L17)

Implements [3 Syntax](https://dcdpr.github.io/did-btc1/#syntax).
A did:btc1 DID consists of a did:btc1 prefix, followed by an id-bech32 value, which is a Bech32m encoding of:
   - the specification version;
   - the Bitcoin network identifier; and
   - either:
     - a key-value representing a secp256k1 public key; or
     - a hash-value representing the hash of an initiating external DID document.
 Btc1Identifier

## Constructors

### Constructor

&gt; **new Btc1Identifier**(): `Btc1Identifier`

#### Returns

`Btc1Identifier`

## Methods

### decode()

&gt; `static` **decode**(`identifier`): [`DidComponents`](../interfaces/DidComponents.md)

Defined in: [packages/method/src/utils/identifier.ts:135](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/identifier.ts#L135)

Implements [3.3 did:btc1 Identifier Decoding](https://dcdpr.github.io/did-btc1/#didbtc1-identifier-decoding).

#### Parameters

##### identifier

`string`

The BTC1 DID to be parsed

#### Returns

[`DidComponents`](../interfaces/DidComponents.md)

The parsed identifier components. See [DidComponents](../interfaces/DidComponents.md) for details.

#### Throws

if an error occurs while parsing the identifier

#### Throws

if identifier is invalid

#### Throws

if the method is not supported

***

### encode()

&gt; `static` **encode**(`params`): `string`

Defined in: [packages/method/src/utils/identifier.ts:35](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/identifier.ts#L35)

Implements [3.2 did:btc1 Identifier Encoding](https://dcdpr.github.io/did-btc1/#didbtc1-identifier-encoding).

A did:btc1 DID consists of a did:btc1 prefix, followed by an id-bech32 value, which is a Bech32m encoding of:
 - the specification version;
 - the Bitcoin network identifier; and
 - either:
   - a key-value representing a secp256k1 public key; or
   - a hash-value representing the hash of an initiating external DID document.

#### Parameters

##### params

See [CreateIdentifierParams](../interfaces/CreateIdentifierParams.md) for details.

###### genesisBytes

`Bytes`

Public key or an intermediate document bytes.

###### idType

`string`

Identifier type (key or external).

###### network

`string` \| `number`

Bitcoin network name.

###### version

`number`

Identifier version.

#### Returns

`string`

The new did:btc1 identifier.

***

### generate()

&gt; `static` **generate**(): `object`

Defined in: [packages/method/src/utils/identifier.ts:265](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/identifier.ts#L265)

Generates a new did:btc1 identifier based on a newly generated key pair.

#### Returns

`object`

The new did:btc1 identifier.

##### identifier

&gt; **identifier**: `object`

###### identifier.controller

&gt; **controller**: `string`

###### identifier.id

&gt; **id**: `string`

##### keys

&gt; **keys**: `SchnorrKeyPair`
