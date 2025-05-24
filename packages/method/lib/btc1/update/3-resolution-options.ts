import { KeyPair, PrivateKey } from '@did-btc1/key-pair';
import { writeFile } from 'fs/promises';
import { Btc1DidDocument, Btc1KeyManager, Btc1Update, DidBtc1 } from '../../../src/index.js';
import initialDidDocument from '../../in/update/initial-document.json' with { type: 'json' };
import keyPair0 from '../../in/update/key-pair-0.json' with { type: 'json' };
import didUpdatePayload from '../../in/update/update.json' with { type: 'json' };

const identifier = initialDidDocument.id;
const sourceDocument = new Btc1DidDocument(initialDidDocument);

const verificationMethodId = initialDidDocument.verificationMethod[0].id;

const verificationMethod = DidBtc1.getSigningMethod({ didDocument: sourceDocument, methodId: verificationMethodId, });

sourceDocument.verificationMethod[0].privateKeyMultibase = new PrivateKey(Buffer.from(keyPair0.privateKey.hex, 'hex')).multibase;

await Btc1KeyManager.initialize(KeyPair.from(keyPair0));
console.log('Btc1KeyManager.instance', Btc1KeyManager.instance);

const didUpdateInvocation = await Btc1Update.invoke({ identifier, verificationMethod, didUpdatePayload, });

const beaconIds = [initialDidDocument.service[0].id];
const signalsMetadata = await Btc1Update.announce({ sourceDocument, beaconIds, didUpdateInvocation });
console.log('signalsMetadata', signalsMetadata);
const did = identifier;
const targetTime = Date.now();
const resolutionOptions = { targetTime, sidecarData: { did, signalsMetadata }};
await writeFile('./lib/in/update/resolutionOptions.json', JSON.stringify(resolutionOptions, null, 4), { encoding: 'utf-8' });
console.log('Created resolution options: ./lib/in/update/resolutionOptions.json');