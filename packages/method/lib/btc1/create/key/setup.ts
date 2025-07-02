import { KeyPairUtils } from '../../../../../keypair/dist/types/secret/index.js';
import { Did } from '@web5/dids';
import { mkdir, readdir, readFile, rename, writeFile } from 'fs/promises';
import path from 'path';
import { DidBtc1 } from '../../../../src/did-btc1.js';

const cwd = process.cwd();
const network = process.argv[2] || 'regtest';
console.log('Setting up for network:', network);

const basedir = `${cwd}/data/${network}`;
const latestdir = path.join(basedir, 'latest');
const latestTxtPath = path.join(latestdir, 'latest.txt');

// Step 0: Check if latest.txt exists, read UUID and move files to old folder
try {
  const latestUUID = await readFile(latestTxtPath, { encoding: 'utf-8' });
  const oldDir = path.join(basedir, latestUUID);

  // Create old directory if not exists
  await mkdir(oldDir, { recursive: true });

  // Move all files except latest.txt from latestdir to oldDir
  const files = await readdir(latestdir);
  for (const file of files) {
    if (file === 'latest.txt') continue;
    const src = path.join(latestdir, file);
    const dest = path.join(oldDir, file);
    await rename(src, dest);
  }

  console.log(`Moved previous files to folder: ${oldDir}`);
} catch (err) {
  if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
    // latest.txt doesn't exist, so no previous folder to archive
    console.log('No latest.txt found, starting fresh.');
  } else {
    throw err;
  }
}

// Step 1: Generate new key pairs
const genesisKey = KeyPairUtils.generate();
const replacementKey = KeyPairUtils.generate();

// Step 2: Create a new DID and initial DID document
const { did, initialDocument } = await DidBtc1.create({
  idType      : 'KEY',
  pubKeyBytes : genesisKey.publicKey.bytes,
  options     : { network, version: 1 },
});

const parts = Did.parse(did);
if(!parts) {
  throw new Error('Failed to parse DID');
}
const keyId = parts.id;
const keys = {
  genesisKey : {
    sk : genesisKey.privateKey.hex,
    pk : genesisKey.publicKey.hex,
  },
  [keyId] : {
    sk : replacementKey.privateKey.hex,
    pk : replacementKey.publicKey.hex,
  }
};

// Step 3: Write new files to latestdir
await mkdir(latestdir, { recursive: true });
const keysPath = path.join(latestdir, 'keys.json');
await writeFile(keysPath, JSON.stringify(keys, null, 4), { encoding: 'utf-8' });

const didpath = path.join(latestdir, 'did.txt');
await writeFile(didpath, did, { encoding: 'utf-8' });

const initialDocumentPath = path.join(latestdir, 'initialDocument.json');
await writeFile(initialDocumentPath, JSON.stringify(initialDocument, null, 4), { encoding: 'utf-8' });

// Step 4: Write the new latest.txt file with the new UUID
await writeFile(latestTxtPath, keyId, { encoding: 'utf-8' });

console.log(`New output UUID: ${keyId}`);
console.log(`Output files written to: ${latestdir}`);