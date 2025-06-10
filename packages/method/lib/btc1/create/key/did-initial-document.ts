import { readFile, writeFile } from 'fs/promises';
import { DidBtc1 } from '../../../../src/did-btc1.js';
import { SchnorrKeyPair } from '@did-btc1/key-pair';

const cwd = process.cwd();
const network = process.argv.slice(2)[0] || 'regtest';
console.log('Running for network:', network);

const latestdir = `${cwd}/data/${network}/latest`;
const keys = JSON.parse(await readFile(`${latestdir}/keys.json`, { encoding: 'utf-8' }));

const privateKey = Buffer.from(keys.genesisKey.sk, 'hex');
const keys = new SchnorrKeyPair({ privateKey });
const { did, initialDocument } = await DidBtc1.create({
  idType      : 'KEY',
  pubKeyBytes : keyPair.publicKey.bytes,
  options     : { network, version: 1 }
});
await writeFile(`${latestdir}/did.txt`, did, { encoding: 'utf-8' });
console.log(`Created new did: ${latestdir}/did.txt`);

await writeFile(`${latestdir}/initialDocument.json`, JSON.stringify(initialDocument, null, 4), { encoding: 'utf-8' });
console.log(`Created new initial document: ${latestdir}/initialDocument.json`);