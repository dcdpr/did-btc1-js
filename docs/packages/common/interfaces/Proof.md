[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / Proof

# Interface: Proof

Defined in: [interfaces.ts:121](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L121)

Proof is the Data Integrity proof (ZCAP-LD style) added to a did:btc1 DID
Update Payload.

Verifiable Credential Data Integrity
[2.1 Proofs](https://w3c.github.io/vc-data-integrity/#proofs).

DID BTC1
[4.3.2 Invoke DID Update Payload](https://dcdpr.github.io/did-btc1/#invoke-did-update-payload).

## Extends

- [`ProofOptions`](ProofOptions.md)

## Properties

### capability?

> `optional` **capability**: `string`

Defined in: [interfaces.ts:166](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L166)

The root capability being invoked. In did:btc1, this is typically
`urn:zcap:root:<urlencoded-did>` (see Section 9.4.1).

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`capability`](ProofOptions.md#capability)

***

### capabilityAction?

> `optional` **capabilityAction**: `string`

Defined in: [interfaces.ts:172](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L172)

The action performed under the capability—set to "Write" in the spec
for DID document updates.

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`capabilityAction`](ProofOptions.md#capabilityaction)

***

### challenge?

> `optional` **challenge**: `string`

Defined in: [interfaces.ts:181](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L181)

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`challenge`](ProofOptions.md#challenge)

***

### created?

> `optional` **created**: `string`

Defined in: [interfaces.ts:179](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L179)

(Optional) Some cryptosuites or proofs may include a timestamp, domain,
or challenge. Although not explicitly required in the doc's steps, they
often appear in Data Integrity proofs and may be included as needed.

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`created`](ProofOptions.md#created)

***

### cryptosuite

> **cryptosuite**: `string`

Defined in: [interfaces.ts:149](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L149)

The cryptographic suite used, e.g. "schnorr-secp256k1-jcs-2025".

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`cryptosuite`](ProofOptions.md#cryptosuite)

***

### domain?

> `optional` **domain**: `string`

Defined in: [interfaces.ts:180](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L180)

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`domain`](ProofOptions.md#domain)

***

### proofPurpose

> **proofPurpose**: `string`

Defined in: [interfaces.ts:160](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L160)

The purpose of the proof, which the spec sets to "capabilityInvocation".

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`proofPurpose`](ProofOptions.md#proofpurpose)

***

### proofValue

> **proofValue**: `string`

Defined in: [interfaces.ts:127](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L127)

The cryptographic signature value. The exact property name may be defined
by the cryptosuite (for instance, `proofValue` for a raw signature) and
contains the actual signature bytes in an encoded form.

***

### type

> **type**: `string`

Defined in: [interfaces.ts:144](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L144)

The proof type—per the spec’s example, "DataIntegrityProof".

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`type`](ProofOptions.md#type)

***

### verificationMethod

> **verificationMethod**: `string`

Defined in: [interfaces.ts:155](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/common/src/interfaces.ts#L155)

DID URL of the key invoking the capability, i.e. the DID
Document's verificationMethod.id used to sign this update.

#### Inherited from

[`ProofOptions`](ProofOptions.md).[`verificationMethod`](ProofOptions.md#verificationmethod)
