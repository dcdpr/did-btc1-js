[**@did-btc1/common**](../README.md)

***

[@did-btc1/common](../globals.md) / DidUpdatePayload

# Interface: DidUpdatePayload

Defined in: [interfaces.ts:54](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L54)

The unsigned payload object containing instructions for how to update a
did:btc1 DID Document. Once signed, it becomes a
[DID Update Invocation](DidUpdateInvocation.md)

DID BTC1
[4.3.1 Construct DID Update Payload](https://dcdpr.github.io/did-btc1/#construct-did-update-payload).

Found in DID BTC1 Specification [Section 9.4.2](https://dcdpr.github.io/did-btc1/#dereference-root-capability-identifier)

## Example

```
{
 "@context": [
   "https://w3id.org/zcap/v1",
   "https://w3id.org/security/data-integrity/v2",
   "https://w3id.org/json-ld-patch/v1"
 ],
 "patch": [
   {
     "op": "add",
     "path": "/service/4",
     "value": {
       "id": "#linked-domain",
       "type": "LinkedDomains",
       "serviceEndpoint": "https://contact-me.com"
     }
   }
  ],
  "proof":{
  "type": "DataIntegrityProof,
  "cryptosuite": "schnorr-secp256k1-jcs-2025,
  "verificationMethod": "did:btc1:k1qqpuwwde82nennsavvf0lqfnlvx7frrgzs57lchr02q8mz49qzaaxmqphnvcx#initialKey,
  "invocationTarget": "did:btc1:k1qqpuwwde82nennsavvf0lqfnlvx7frrgzs57lchr02q8mz49qzaaxmqphnvcx,
  "capability": "urn:zcap:root:did%3Abtc1%3Ak1qqpuwwde82nennsavvf0lqfnlvx7frrgzs57lchr02q8mz49qzaaxmqphnvcx,
  "capabilityAction": "Write,
  "proofPurpose": "assertionMethod,
  "proofValue": "z381yXYmxU8NudZ4HXY56DfMN6zfD8syvWcRXzT9xD9uYoQToo8QsXD7ahM3gXTzuay5WJbqTswt2BKaGWYn2hHhVFKJLXaD
 }
}
```

## Extended by

- [`DidUpdateInvocation`](DidUpdateInvocation.md)

## Properties

### @context

> **@context**: `string`[]

Defined in: [interfaces.ts:59](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L59)

JSON-LD context URIs for interpreting this payload, including contexts
for ZCAP (capabilities), Data Integrity proofs, and JSON-LD patch ops.

***

### patch

> **patch**: [`JsonPatch`](../type-aliases/JsonPatch.md)

Defined in: [interfaces.ts:66](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L66)

A JSON Patch (or JSON-LD Patch) object defining the mutations to apply to
the DID Document. Applying this patch to the current DID Document yields
the new DID Document (which must remain valid per DID Core spec).

***

### proof?

> `optional` **proof**: [`Proof`](Proof.md)

Defined in: [interfaces.ts:94](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L94)

A proof object (Data Integrity proof) that authorizes this update.
It is a JSON-LD proof indicating a capability invocation on the DID's
root capability, typically signed with the DID's verification key (using
Schnorr secp256k1 in did:btc1).

***

### sourceHash

> **sourceHash**: `string`

Defined in: [interfaces.ts:73](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L73)

The multihash of the current (source) DID Document, encoded as a multibase
base58-btc string. This is a SHA-256 hash of the canonicalized source DID
Document, used to ensure the patch is applied to the correct document state.

***

### targetHash

> **targetHash**: `string`

Defined in: [interfaces.ts:80](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L80)

The multihash of the updated (target) DID Document, encoded as multibase
base58-btc. This is the SHA-256 hash of the canonicalized
DID Document after applying the patch, used to verify the update result.

***

### targetVersionId

> **targetVersionId**: `number`

Defined in: [interfaces.ts:86](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/common/src/interfaces.ts#L86)

The version number of the DID Document after this update.
It is equal to the previous document version + 1.
