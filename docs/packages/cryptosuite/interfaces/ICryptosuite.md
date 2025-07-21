[**@did-btc1/cryptosuite**](../README.md)

***

[@did-btc1/cryptosuite](../globals.md) / ICryptosuite

# Interface: ICryptosuite

Defined in: [cryptosuite/interface.ts:50](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L50)

Interface representing a BIP-340 Cryptosuite.
 ICryptosuite

## Properties

### cryptosuite

&gt; **cryptosuite**: `string`

Defined in: [cryptosuite/interface.ts:55](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L55)

***

### multikey

&gt; **multikey**: [`SchnorrMultikey`](../classes/SchnorrMultikey.md)

Defined in: [cryptosuite/interface.ts:58](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L58)

***

### type

&gt; **type**: `"DataIntegrityProof"`

Defined in: [cryptosuite/interface.ts:52](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L52)

## Methods

### createProof()

&gt; **createProof**(`params`): `Promise`\<`Proof`\&gt;

Defined in: [cryptosuite/interface.ts:67](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L67)

Create a proof for an insecure document.

#### Parameters

##### params

[`CreateProofParams`](CreateProofParams.md)

See [CreateProofParams](CreateProofParams.md) for details.

#### Returns

`Promise`\<`Proof`\&gt;

The proof for the document.

***

### generateHash()

&gt; **generateHash**(`params`): `Hex`

Defined in: [cryptosuite/interface.ts:93](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L93)

Generate a hash of the canonical proof configuration and document.

#### Parameters

##### params

[`GenerateHashParams`](GenerateHashParams.md)

See [GenerateHashParams](GenerateHashParams.md) for details.

#### Returns

`Hex`

The hash string of the proof configuration and document.

***

### proofConfiguration()

&gt; **proofConfiguration**(`options`): `Promise`\<`string`\&gt;

Defined in: [cryptosuite/interface.ts:101](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L101)

Configure the proof by canonicalzing it.

#### Parameters

##### options

`ProofOptions`

The options to use when transforming the proof.

#### Returns

`Promise`\<`string`\&gt;

The canonicalized proof configuration.

#### Throws

if the proof configuration cannot be canonicalized.

***

### proofSerialization()

&gt; **proofSerialization**(`params`): `Bytes`

Defined in: [cryptosuite/interface.ts:111](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L111)

Serialize the proof into a byte array.

#### Parameters

##### params

[`ProofSerializationParams`](ProofSerializationParams.md)

See [ProofSerializationParams](ProofSerializationParams.md) for details.

#### Returns

`Bytes`

The serialized proof.

#### Throws

if the multikey does not match the verification method.

***

### proofVerification()

&gt; **proofVerification**(`params`): `boolean`

Defined in: [cryptosuite/interface.ts:122](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L122)

Verify the proof by comparing the hash of the proof configuration and document to the proof bytes.

#### Parameters

##### params

[`ProofVerificationParams`](ProofVerificationParams.md)

See [ProofVerificationParams](ProofVerificationParams.md) for details.

#### Returns

`boolean`

True if the proof is verified, false otherwise.

#### Throws

if the multikey does not match the verification method.

***

### transformDocument()

&gt; **transformDocument**(`params`): `Promise`\<`string`\&gt;

Defined in: [cryptosuite/interface.ts:84](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L84)

Transform a document (secure didUpdateInvocation or insecure didUpdatePayload) into canonical form.

#### Parameters

##### params

[`TransformDocumentParams`](TransformDocumentParams.md)

See [TransformDocumentParams](TransformDocumentParams.md) for details.

#### Returns

`Promise`\<`string`\&gt;

The canonicalized document.

#### Throws

if the document cannot be transformed.

***

### verifyProof()

&gt; **verifyProof**(`document`): `Promise`\<[`VerificationResult`](VerificationResult.md)\&gt;

Defined in: [cryptosuite/interface.ts:74](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/cryptosuite/interface.ts#L74)

Verify a proof for a secure document.

#### Parameters

##### document

`DidUpdateInvocation`

The secure document to verify.

#### Returns

`Promise`\<[`VerificationResult`](VerificationResult.md)\&gt;

The result of the verification.
