import { writeFile } from 'fs/promises';
import { DidBtc1 } from '../../../src/did-btc1.js';
import keyPair0 from '../../in/update/key-pair-0.json' with { type: 'json' };
import { KeyPair } from '@did-btc1/key-pair';

const keyPair = KeyPair.from(keyPair0);
const { did, initialDocument } = await DidBtc1.create({
  idType      : 'KEY',
  pubKeyBytes : keyPair.publicKey.bytes,
  options     : { network: 'regtest', version: 1 }
});
await writeFile(`./lib/in/update/did.txt`, did, { encoding: 'utf-8' });
await writeFile(`./lib/in/update/initial-document.json`, JSON.stringify(initialDocument, null, 4), { encoding: 'utf-8' });
console.log('Created new did: ./lib/in/update/did.txt');
console.log('Created new initial document: ./lib/in/update/initial-document.json');