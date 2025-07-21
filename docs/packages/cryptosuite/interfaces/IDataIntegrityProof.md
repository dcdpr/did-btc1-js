[**@did-btc1/cryptosuite**](../README.md)

***

[@did-btc1/cryptosuite](../globals.md) / IDataIntegrityProof

# Interface: IDataIntegrityProof

Defined in: [data-integrity-proof/interface.ts:23](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/data-integrity-proof/interface.ts#L23)

Interface representing a BIP-340 DataIntegrityProof.
 IDataIntegrityProof

## Properties

### cryptosuite

&gt; **cryptosuite**: [`Cryptosuite`](../classes/Cryptosuite.md)

Defined in: [data-integrity-proof/interface.ts:25](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/data-integrity-proof/interface.ts#L25)

## Methods

### addProof()

&gt; **addProof**(`params`): `Promise`\<`DidUpdateInvocation`\&gt;

Defined in: [data-integrity-proof/interface.ts:34](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/data-integrity-proof/interface.ts#L34)

Add a proof to a document.

#### Parameters

##### params

[`AddProofParams`](../type-aliases/AddProofParams.md)

Parameters for adding a proof to a document.

#### Returns

`Promise`\<`DidUpdateInvocation`\&gt;

A document with a proof added.

***

### verifyProof()

&gt; **verifyProof**(`params`): `Promise`\<[`VerificationResult`](VerificationResult.md)\&gt;

Defined in: [data-integrity-proof/interface.ts:46](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cryptosuite/src/data-integrity-proof/interface.ts#L46)

Verify a proof.

#### Parameters

##### params

[`VerifyProofParams`](VerifyProofParams.md)

Parameters for verifying a proof.

#### Returns

`Promise`\<[`VerificationResult`](VerificationResult.md)\&gt;

The result of verifying the proof.
