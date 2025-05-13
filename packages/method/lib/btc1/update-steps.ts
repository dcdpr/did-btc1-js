import { PrivateKey } from '@did-btc1/key-pair';
import { DidBtc1 } from '../../src/did-btc1.js';
import { BeaconUtils, Btc1DidDocument, Btc1Update } from '../../src/index.js';
import initialDidDoc from '../in/resolve/k1qgp6/initialDidDoc.json' with { type: 'json' };

/*
  identifier: string;
  sourceDocument: Btc1DidDocument;
  sourceVersionId: number;
  patch: PatchOperation[];
  verificationMethodId: string;
  beaconIds: string[];
*/
const bytes = new Uint8Array(Buffer.from('b193d273a8ed8167f2de94e70c6d340dfdb13f2ec8f8d0b5d435c5b1b247635d', 'hex'));
const privateKey = new PrivateKey(bytes);
const sourceDocument = new Btc1DidDocument(initialDidDoc);
const identifier = sourceDocument.id;
const sourceVersionId = 1;
const patch = [
  {
    op    : 'add',
    path  : '/service/3',
    value : {
      id              : 'did:btc1:k1qgp6haekj3w5zgk56h92juynjl4ag4pt2p9wl4ajwu7yhklyp0ngcfskwzack#service-3',
      type            : 'SingletonBeacon',
      serviceEndpoint : 'bitcoin:bcrt1qktf6vtfunylcgg62ltwj60k5rp4kr9h5y7kvyc'
    }
  }
];

const verificationMethodId = 'did:btc1:k1qgp6haekj3w5zgk56h92juynjl4ag4pt2p9wl4ajwu7yhklyp0ngcfskwzack#initialKey';
const beaconIds = BeaconUtils.getBeaconServiceIds(sourceDocument);

// console.log('Btc1Update.construct => args:', { identifier, sourceDocument, sourceVersionId, patch, });

const didUpdatePayload = await Btc1Update.construct({ identifier, sourceDocument, sourceVersionId, patch, });
console.log('didUpdatePayload:', JSON.stringify(didUpdatePayload, null, 4));

// console.log('DidBtc1.getSigningMethod => args:', { didDocument: sourceDocument, methodId: verificationMethodId, });

const verificationMethod = DidBtc1.getSigningMethod({ didDocument: sourceDocument, methodId: verificationMethodId, });
verificationMethod.privateKeyMultibase = privateKey.multibase;
console.log('verificationMethod:', JSON.stringify(verificationMethod, null, 4));

// console.log('Btc1Update.invoke => args:', { identifier, verificationMethod, didUpdatePayload, });

const didUpdateInvocation = await Btc1Update.invoke({ identifier, verificationMethod, didUpdatePayload, });
console.log('didUpdateInvocation:', JSON.stringify(didUpdateInvocation, null, 4));

// console.log('Btc1Update.construct => args:', { sourceDocument, beaconIds, didUpdateInvocation });

const signalsMetadata = await Btc1Update.announce({ sourceDocument, beaconIds, didUpdateInvocation });
console.log('signalsMetadata:', signalsMetadata);

// const update = await DidBtc1.update({
//   identifier: sourceDocument.id,
//   sourceDocument,
//   sourceVersionId,
//   patch,
//   verificationMethodId: "",
//   beaconIds: [],
// })
// console.log('Update Response:', update);