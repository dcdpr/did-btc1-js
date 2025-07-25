[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / Btc1Appendix

# Class: Btc1Appendix

Defined in: [packages/method/src/utils/appendix.ts:31](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/appendix.ts#L31)

Implements [9. Appendix](https://dcdpr.github.io/did-btc1/#appendix) methods.

 Btc1Appendix

## Constructors

### Constructor

&gt; **new Btc1Appendix**(): `Btc1Appendix`

#### Returns

`Btc1Appendix`

## Methods

### derefernceRootCapabilityIdentifier()

&gt; `static` **derefernceRootCapabilityIdentifier**(`capabilityId`): [`Btc1RootCapability`](../interfaces/Btc1RootCapability.md)

Defined in: [packages/method/src/utils/appendix.ts:185](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/appendix.ts#L185)

Implements [9.4.2 Dereference Root Capability Identifier](https://dcdpr.github.io/did-btc1/#dereference-root-capability-identifier).

This algorithm takes in capabilityId, a root capability identifier, and dereferences it to rootCapability, the root
capability object.

#### Parameters

##### capabilityId

`string`

The root capability identifier to dereference.

#### Returns

[`Btc1RootCapability`](../interfaces/Btc1RootCapability.md)

The root capability object.

#### Example

for did:btc1:k1q0rnnwf657vuu8trztlczvlmphjgc6q598h79cm6sp7c4fgqh0fkc0vzd9u SHOULD be mutated.
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
 "proof": {
   "type": "DataIntegrityProof",
   "cryptosuite": "schnorr-secp256k1-jcs-2025",
   "verificationMethod": "did:btc1:k1q0rnnwf657vuu8trztlczvlmphjgc6q598h79cm6sp7c4fgqh0fkc0vzd9u#initialKey",
   "invocationTarget": "did:btc1:k1q0rnnwf657vuu8trztlczvlmphjgc6q598h79cm6sp7c4fgqh0fkc0vzd9u",
   "capability": "urn:zcap:root:did%3Abtc1%3Ak1q0rnnwf657vuu8trztlczvlmphjgc6q598h79cm6sp7c4fgqh0fkc0vzd9u",
   "capabilityAction": "Write",
   "proofPurpose": "assertionMethod",
   "proofValue": "z381yXYmxU8NudZ4HXY56DfMN6zfD8syvWcRXzT9xD9uYoQToo8QsXD7ahM3gXTzuay5WJbqTswt2BKaGWYn2hHhVFKJLXaDz"
  }
}

***

### deriveRootCapability()

&gt; `static` **deriveRootCapability**(`identifier`): [`Btc1RootCapability`](../interfaces/Btc1RootCapability.md)

Defined in: [packages/method/src/utils/appendix.ts:121](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/appendix.ts#L121)

Implements [9.4.1 Derive Root Capability from did:btc1 Identifier](https://dcdpr.github.io/did-btc1/#derive-root-capability-from-didbtc1-identifier).

The Derive Root Capability algorithm deterministically generates a ZCAP-LD root capability from a given did:btc1
identifier. Each root capability is unique to the identifier. This root capability is defined and understood by the
did:btc1 specification as the root capability to authorize updates to the specific did:btc1 identifiers DID
document. It takes in a did:btc1 identifier and returns a rootCapability object. It returns the root capability.

#### Parameters

##### identifier

`string`

The did-btc1 identifier to derive the root capability from

#### Returns

[`Btc1RootCapability`](../interfaces/Btc1RootCapability.md)

The root capability object

#### Example

did:btc1:k1q0rnnwf657vuu8trztlczvlmphjgc6q598h79cm6sp7c4fgqh0fkc0vzd9u
```
{
 "@context": "https://w3id.org/zcap/v1",
 "id": "urn:zcap:root:did:btc1:k1q0rnnwf657vuu8trztlczvlmphjgc6q598h79cm6sp7c4fgqh0fkc0vzd9u",
 "controller": "did:btc1:k1q0rnnwf657vuu8trztlczvlmphjgc6q598h79cm6sp7c4fgqh0fkc0vzd9u",
 "invocationTarget": "did:btc1:k1q0rnnwf657vuu8trztlczvlmphjgc6q598h79cm6sp7c4fgqh0fkc0vzd9u"
}
```

***

### extractDidFragment()

&gt; `static` **extractDidFragment**(`input`): `undefined` \| `string`

Defined in: [packages/method/src/utils/appendix.ts:37](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/appendix.ts#L37)

Extracts a DID fragment from a given input

#### Parameters

##### input

`unknown`

The input to extract the DID fragment from

#### Returns

`undefined` \| `string`

The extracted DID fragment or undefined if not found

***

### fetchFromCas()

&gt; `static` **fetchFromCas**(`hashBytes`): `Promise`\<`undefined` \| `string`\&gt;

Defined in: [packages/method/src/utils/appendix.ts:242](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/appendix.ts#L242)

Implements [9.3. Fetch Content from Addressable Storage](https://dcdpr.github.io/did-btc1/#fetch-content-from-addressable-storage).

The Fetch Content from Addressable Storage function takes in SHA256 hash of some content, hashBytes, converts these
bytes to a IPFS v1 Content Identifier and attempts to retrieve the identified content from Content Addressable
Storage (CAS). It returns the retrieved content or null.

#### Parameters

##### hashBytes

`Bytes`

The SHA256 hash of the content to be fetched.

#### Returns

`Promise`\<`undefined` \| `string`\&gt;

The fetched content or null if not found.

***

### getVerificationMethods()

&gt; `static` **getVerificationMethods**(`didDocument`): [`Btc1VerificationMethod`](Btc1VerificationMethod.md)[]

Defined in: [packages/method/src/utils/appendix.ts:84](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/appendix.ts#L84)

Extracts the verification methods from a given DID Document

#### Parameters

##### didDocument

`DidDocument`

#### Returns

[`Btc1VerificationMethod`](Btc1VerificationMethod.md)[]

An array of DidVerificationMethod objects

#### Throws

if the didDocument is not provided

***

### isDidService()

&gt; `static` **isDidService**(`obj`): `obj is DidService`

Defined in: [packages/method/src/utils/appendix.ts:67](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/appendix.ts#L67)

Validates that the given object is a DidService

#### Parameters

##### obj

`unknown`

The object to validate

#### Returns

`obj is DidService`

A boolean indicating whether the object is a DidService

***

### isDidVerificationMethod()

&gt; `static` **isDidVerificationMethod**(`obj`): `obj is DidVerificationMethod`

Defined in: [packages/method/src/utils/appendix.ts:48](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/utils/appendix.ts#L48)

Validates that the given object is a DidVerificationMethod

#### Parameters

##### obj

`unknown`

The object to validate

#### Returns

`obj is DidVerificationMethod`

A boolean indicating whether the object is a DidVerificationMethod
