import { KeyPair } from '@did-btc1/key-pair';
import { writeFile } from 'fs/promises';
import initialDocument from '../../in/btc1-update-signet-test/initial-document.json' with { type: 'json' };
import keyPair0 from '../../in/btc1-update-signet-test/key-pair-0.json' with { type: 'json' };
import keyPair1 from '../../in/btc1-update-signet-test/key-pair-1.json' with { type: 'json' };
import { BeaconUtils, Btc1DidDocument, Btc1KeyManager, DidBtc1, getNetwork } from '../../../src/index.js';

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

await Btc1KeyManager.initialize(KeyPair.from(keyPair0));

const signalsMetadata = await DidBtc1.update({
  identifier,
  sourceDocument,
  sourceVersionId,
  patch,
  verificationMethodId : initialDocument.verificationMethod[0].id,
  beaconIds            : [initialDocument.service[0].id],
});
const did = identifier;
const targetTime = Date.now();
const resolutionOptions = { targetTime, sidecarData: { did, signalsMetadata }};
await writeFile('./lib/in/btc1-update-signet-test/resolution-options.json', JSON.stringify(resolutionOptions, null, 4), { encoding: 'utf-8' });
console.log('Created new resolutionOptions: ./lib/in/btc1-update-signet-test/resolution-options.json', );

const targetDocument = JSON.patch.apply(sourceDocument, patch);
await writeFile('./lib/in/btc1-update-signet-test/target-document.json', JSON.stringify(targetDocument, null, 4), { encoding: 'utf-8' });
console.log('Created new targetDocument: ./lib/in/btc1-update-signet-test/target-document.json', targetDocument);
