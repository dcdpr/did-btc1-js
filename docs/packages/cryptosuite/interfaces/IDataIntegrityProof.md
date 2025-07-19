[**@did-btc1/cryptosuite**](../README.md)

***

[@did-btc1/cryptosuite](../globals.md) / IDataIntegrityProof

# Interface: IDataIntegrityProof

Defined in: [data-integrity-proof/interface.ts:23](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/data-integrity-proof/interface.ts#L23)

Interface representing a BIP-340 DataIntegrityProof.
 IDataIntegrityProof

## Properties

### cryptosuite

> **cryptosuite**: [`Cryptosuite`](../classes/Cryptosuite.md)

Defined in: [data-integrity-proof/interface.ts:25](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/data-integrity-proof/interface.ts#L25)

## Methods

### addProof()

> **addProof**(`params`): `Promise`\<`DidUpdateInvocation`\>

Defined in: [data-integrity-proof/interface.ts:34](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/data-integrity-proof/interface.ts#L34)

Add a proof to a document.

#### Parameters

##### params

[`AddProofParams`](../type-aliases/AddProofParams.md)

Parameters for adding a proof to a document.

#### Returns

`Promise`\<`DidUpdateInvocation`\>

A document with a proof added.

***

### verifyProof()

> **verifyProof**(`params`): `Promise`\<[`VerificationResult`](VerificationResult.md)\>

Defined in: [data-integrity-proof/interface.ts:46](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/cryptosuite/src/data-integrity-proof/interface.ts#L46)

Verify a proof.

#### Parameters

##### params

[`VerifyProofParams`](VerifyProofParams.md)

Parameters for verifying a proof.

#### Returns

`Promise`\<[`VerificationResult`](VerificationResult.md)\>

The result of verifying the proof.
