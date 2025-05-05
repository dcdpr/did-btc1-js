import { KeyPairUtils } from '@did-btc1/key-pair';
import { writeFile } from 'fs/promises';

const keyPair0 = KeyPairUtils.generate();
await writeFile(`./lib/in/update/key-pair-0.json`, JSON.stringify(keyPair0.json(), null, 4), { encoding: 'utf-8' });
console.log('Created keyPair0: ./lib/in/update/key-pair-0.json');

const keyPair1 = KeyPairUtils.generate();
await writeFile(`./lib/in/update/key-pair-1.json`, JSON.stringify(keyPair1.json(), null, 4), { encoding: 'utf-8' });
console.log('Created keyPair1: ./lib/in/update/key-pair-1.json');