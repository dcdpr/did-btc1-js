import { BeaconUtils, Btc1DidDocument, DidBtc1, getNetwork } from '../../../src/index.js';
import initialDocument from '../../in/update/initial-document.json' with { type: 'json' };
import keyPair1 from '../../in/update/key-pair-1.json' with { type: 'json' };

const identifier = initialDocument.id;
const sourceDocument = new Btc1DidDocument(initialDocument);
const sourceVersionId = 1;
const patch = JSON.patch.create([
  {
    op    : 'add',
    path  : '/service/3',
    value : BeaconUtils.generateBeaconService({
      id          : identifier,
      publicKey   : Buffer.from(keyPair1.publicKey.hex, 'hex'),
      network     : getNetwork('regtest'),
      addressType : 'p2wpkh',
      beaconType  : 'SingletonBeacon',
    })
  }
]);
const verificationMethodId = initialDocument.verificationMethod[0].id;
const update = await DidBtc1.update({
  identifier,
  sourceDocument,
  sourceVersionId,
  patch,
  verificationMethodId,
  beaconIds : [],
});
console.log('Update Response:', update);