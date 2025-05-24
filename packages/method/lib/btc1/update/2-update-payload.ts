import { writeFile } from 'fs/promises';
import { BeaconUtils, Btc1DidDocument, Btc1Update, getNetwork } from '../../../src/index.js';
import initialDidDocument from '../../in/update/initial-document.json' with { type: 'json' };
import keyPair1 from '../../in/update/key-pair-1.json' with { type: 'json' };

const identifier = initialDidDocument.id;
const sourceDocument = new Btc1DidDocument(initialDidDocument);
const sourceVersionId = 1;
const patch = JSON.patch.create([
  {
    op    : 'add',
    path  : '/service/3',
    value : BeaconUtils.generateBeaconService({
      id          : identifier,
      publicKey   : Buffer.from(keyPair1.publicKey.hex, 'hex'),
      network     : getNetwork('regtest'),
      addressType : 'p2pkh',
      beaconType  : 'SingletonBeacon',
    })
  }
]);
const didUpdatePayload = await Btc1Update.construct({ identifier, sourceDocument, sourceVersionId, patch, });
await writeFile('./lib/in/update/update.json', JSON.stringify(didUpdatePayload, null, 4), { encoding: 'utf-8' });
console.log('Created update payload: ./lib/in/update/update.json');