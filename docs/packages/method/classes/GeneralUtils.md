[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / GeneralUtils

# Class: GeneralUtils

Defined in: [packages/method/src/utils/general.ts:14](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L14)

Static class of general utility functions for the did-btc1 spec implementation
 GeneralUtils

## Constructors

### Constructor

&gt; **new GeneralUtils**(): `GeneralUtils`

#### Returns

`GeneralUtils`

## Methods

### bigintToBuffer()

&gt; `static` **bigintToBuffer**(`value`): `Buffer`

Defined in: [packages/method/src/utils/general.ts:37](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L37)

Converts a bigint to a buffer

#### Parameters

##### value

`bigint`

The bigint to convert

#### Returns

`Buffer`

The buffer representation of the bigint

***

### deriveChildKey()

&gt; `static` **deriveChildKey**(`hdkey`, `path`): `HDKey`

Defined in: [packages/method/src/utils/general.ts:194](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L194)

Derives a child key from an HDKey

#### Parameters

##### hdkey

`HDKey`

The HDKey to derive the child key from

##### path

`string`

The path to derive the child key from

#### Returns

`HDKey`

A Promise resolving to the child key

#### Throws

Error if the child key cannot be derived

***

### encode()

&gt; `static` **encode**(`xOnlyKeyBytes`): `string`

Defined in: [packages/method/src/utils/general.ts:20](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L20)

Helper function to encode a secp256k1 key in SchnorrSecp256k1 Multikey Format

#### Parameters

##### xOnlyKeyBytes

`Bytes`

#### Returns

`string`

***

### generateCompressedSecp256k1KeyPair()

&gt; `static` **generateCompressedSecp256k1KeyPair**(): `object`

Defined in: [packages/method/src/utils/general.ts:61](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L61)

#### Returns

`object`

##### privateKey

&gt; **privateKey**: `Bytes`

##### publicKey

&gt; **publicKey**: `Bytes`

***

### generateHdWallet()

&gt; `static` **generateHdWallet**(): `Promise`\<`HdWallet`\&gt;

Defined in: [packages/method/src/utils/general.ts:47](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L47)

Generates a new mnemonic phrase and HD wallet

#### Returns

`Promise`\<`HdWallet`\&gt;

Promise resolving to a new hdwallet object w/ mnemonic and hdkey

#### Throws

if the public key bytes cannot be derived

***

### recoverHdChildFromMnemonic()

&gt; `static` **recoverHdChildFromMnemonic**(`mnemonic`, `path`): `Promise`\<`Uint8Array`\<`ArrayBufferLike`\&gt;\&gt;

Defined in: [packages/method/src/utils/general.ts:172](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L172)

Recovers an HDKey from a mnemonic phrase

#### Parameters

##### mnemonic

`string`

The mnemonic phrase to recover the HDKey from

##### path

`string`

The path to derive the child key from

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\&gt;\&gt;

Promise resolving to the recovered private key bytes

#### Throws

if the HDKey cannot be recovered

***

### recoverHdWallet()

&gt; `static` **recoverHdWallet**(`mnemonic`, `seed?`): `Promise`\<`HDKey`\&gt;

Defined in: [packages/method/src/utils/general.ts:76](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L76)

Recovers an HDKey from a mnemonic phrase

#### Parameters

##### mnemonic

`string`

The mnemonic phrase to recover the HDKey from

##### seed?

`Uint8Array`\<`ArrayBufferLike`\&gt;

Optional seed to recover the HDKey from

#### Returns

`Promise`\<`HDKey`\&gt;

Promise resolving to the recovered HDKey

#### Throws

Error if the HDKey cannot be recovered

***

### recoverRawPrivateKey()

&gt; `static` **recoverRawPrivateKey**(`entropy`): `Uint8Array`

Defined in: [packages/method/src/utils/general.ts:119](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L119)

Recovers a secp256k1 privateKey from its original entropy

#### Parameters

##### entropy

`Uint8Array`

The entropy to recover the privateKey from

#### Returns

`Uint8Array`

The recovered privateKey

#### Throws

if the privateKey cannot be recovered

***

### recoverTweakedRawPrivateKey()

&gt; `static` **recoverTweakedRawPrivateKey**(`xorEntropy`, `salt`): `Uint8Array`

Defined in: [packages/method/src/utils/general.ts:95](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L95)

Recovers a secp256k1 privateKey from its original entropy

#### Parameters

##### xorEntropy

`Uint8Array`

The original entropy to recover the privateKey from

##### salt

`Uint8Array`

The salt used to tweak the privateKey

#### Returns

`Uint8Array`

The recovered privateKey

#### Throws

if the privateKey cannot be recovered

***

### XNOR()

&gt; `static` **XNOR**(`tweakedEntropy`, `salt`): `Uint8Array`

Defined in: [packages/method/src/utils/general.ts:157](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L157)

Untweak the entropy with a salt using XNOR

#### Parameters

##### tweakedEntropy

`Uint8Array`

The tweaked entropy to untweak

##### salt

`Uint8Array`

The salt to untweak the entropy with

#### Returns

`Uint8Array`

The original entropy

***

### XOR()

&gt; `static` **XOR**(`entropy`, `salt`): `Uint8Array`

Defined in: [packages/method/src/utils/general.ts:142](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/general.ts#L142)

Tweak the entropy with a salt using XOR

#### Parameters

##### entropy

`Uint8Array`

The entropy to tweak

##### salt

`Uint8Array`

The salt to tweak the entropy with

#### Returns

`Uint8Array`

The tweaked entropy
