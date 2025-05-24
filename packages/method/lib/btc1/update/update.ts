import { KeyPair, PrivateKey } from '@did-btc1/key-pair';
import { writeFile } from 'fs/promises';
import { BeaconUtils, Btc1DidDocument, Btc1KeyManager, DidBtc1, getNetwork } from '../../../src/index.js';
import initialDocument from '../../in/update/initial-document.json' with { type: 'json' };
import keyPair0 from '../../in/update/key-pair-0.json' with { type: 'json' };
import keyPair1 from '../../in/update/key-pair-1.json' with { type: 'json' };

const identifier = initialDocument.id;
const sourceDocument = new Btc1DidDocument(initialDocument);
const sourceVersionId = 1;
const patch = JSON.patch.create([
  {
    op    : 'replace',
    path  : '/service/0',
    value : BeaconUtils.generateBeaconService({
      id          : identifier,
      publicKey   : Buffer.from(keyPair1.publicKey.hex, 'hex'),
      network     : getNetwork('signet'),
      addressType : 'p2pkh',
      beaconType  : 'SingletonBeacon',
    })
  }
]);

sourceDocument.verificationMethod[0].privateKeyMultibase = new PrivateKey(Buffer.from(keyPair0.privateKey.hex, 'hex')).multibase;
await Btc1KeyManager.initialize(KeyPair.from(keyPair0));

const resolutionOptions = await DidBtc1.update({
  identifier,
  sourceDocument,
  sourceVersionId,
  patch,
  verificationMethodId : initialDocument.verificationMethod[0].id,
  beaconIds            : [initialDocument.service[0].id],
});

await writeFile('./lib/in/update/resolutionOptions.json', JSON.stringify(resolutionOptions, null, 4), { encoding: 'utf-8' });
console.log('Created new resolutionOptions: ./lib/in/update/resolutionOptions.json', resolutionOptions);

await writeFile('./lib/in/update/update.json', JSON.stringify(patch, null, 4), { encoding: 'utf-8' });
console.log('Created new did update payload: ./lib/in/update/update.json', patch);

const targetDocument = JSON.patch.apply(sourceDocument, patch);
await writeFile('./lib/in/update/target-document.json', JSON.stringify(targetDocument, null, 4), { encoding: 'utf-8' });
console.log('Created new targetDocument: ./lib/in/update/target-document.json', targetDocument);
