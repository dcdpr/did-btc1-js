import { KeyIdentifier } from "@did-btc1/common";
import { DidBtc1 } from "../../../../src/did-btc1.js";
import { Btc1DidDocument, Btc1KeyManager, Btc1Update, defaultKeyStore } from "../../../../src/index.js";
import initialDidDoc from '../../../in/resolve/k1qgp6/initialDidDoc.json' with { type: 'json' };
import { KeyValueStore, MemoryStore } from '@web5/common';
import { KeyPair, PrivateKey } from "@did-btc1/key-pair";

/*
  identifier: string;
  sourceDocument: Btc1DidDocument;
  sourceVersionId: number;
  patch: PatchOperation[];
  verificationMethodId: string;
  beaconIds: string[];
*/
const keyPair = new KeyPair({privateKey: new PrivateKey(new Uint8Array(Buffer.from('b193d273a8ed8167f2de94e70c6d340dfdb13f2ec8f8d0b5d435c5b1b247635d', 'hex')))});
const keyManager = new Btc1KeyManager({ keys: keyPair });
console.log('keyManager:', keyManager);
const keys = await keyManager.exportKey(keyManager.activeKeyUri)
console.log('keys:', keys);
const sourceDocument = new Btc1DidDocument(initialDidDoc);
const identifier = sourceDocument.id;
const sourceVersionId = 1;
const patch = [
  {
    "op": "add",
    "path": "/service/3",
    "value": {
      "id": "did:btc1:k1qgp6haekj3w5zgk56h92juynjl4ag4pt2p9wl4ajwu7yhklyp0ngcfskwzack#service-3",
      "type": "SingletonBeacon",
      "serviceEndpoint": "bitcoin:bcrt1qktf6vtfunylcgg62ltwj60k5rp4kr9h5y7kvyc"
    }
  }
];

const verificationMethodId = 'did:btc1:k1qgp6haekj3w5zgk56h92juynjl4ag4pt2p9wl4ajwu7yhklyp0ngcfskwzack#initialKey';
// const beaconIds = [''];

const didUpdatePayload = await Btc1Update.construct({
  identifier,
  sourceDocument,
  sourceVersionId,
  patch
});
console.log('didUpdatePayload:', didUpdatePayload);

const verificationMethod = DidBtc1.getSigningMethod({
  didDocument: sourceDocument,
  methodId: verificationMethodId,
});
verificationMethod.privateKeyMultibase = keys?.privateKey.multibase;
console.log('verificationMethod:', verificationMethod);

const didUpdateInvocation = await Btc1Update.invoke({
  identifier,
  verificationMethod,
  didUpdatePayload
});
console.log('didUpdateInvocation:', didUpdateInvocation);

// const signalsMetadata = await Btc1Update.announce({
//   sourceDocument,
//   beaconIds,
//   didUpdateInvocation,
// });
// console.log('signalsMetadata:', signalsMetadata);

// const update = await DidBtc1.update({
//   identifier: sourceDocument.id,
//   sourceDocument,
//   sourceVersionId,
//   patch,
//   verificationMethodId: "",
//   beaconIds: [],
// })
// console.log('Update Response:', update);