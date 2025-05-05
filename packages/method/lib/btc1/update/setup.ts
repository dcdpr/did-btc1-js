import { KeyPairUtils } from '@did-btc1/key-pair';
import { writeFile } from 'fs/promises';
import { DidBtc1 } from '../../../src/did-btc1.js';

// Step 1: Create a new key pair
const keyPair0 = KeyPairUtils.generate();
const kp0json = keyPair0.json();
const keyPair1 = KeyPairUtils.generate();
const kp1json = keyPair1.json();
await writeFile(`./lib/in/update/key-pair-0.json`, JSON.stringify(kp0json, null, 4), { encoding: 'utf-8' });
console.log('Created keyPair0: ./lib/in/update/key-pair-0.json', kp0json);
await writeFile(`./lib/in/update/key-pair-1.json`, JSON.stringify(kp1json, null, 4), { encoding: 'utf-8' });
console.log('Created keyPair1: ./lib/in/update/key-pair-1.json', kp1json);

// Step 2: Create a new DID and DID document
const keyPair = keyPair0;
const { did, initialDocument } = await DidBtc1.create({
  idType      : 'KEY',
  pubKeyBytes : keyPair.publicKey.bytes,
  options     : { network: 'signet', version: 1 }
});
await writeFile(`./lib/in/update/did.txt`, did, { encoding: 'utf-8' });
console.log('Created new did: ./lib/in/update/did.txt', did);
await writeFile(`./lib/in/update/initial-document.json`, JSON.stringify(initialDocument, null, 4), { encoding: 'utf-8' });
console.log('Created new initial document: ./lib/in/update/initial-document.json', initialDocument);