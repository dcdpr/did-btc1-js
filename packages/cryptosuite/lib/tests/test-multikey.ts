import { SchnorrKeyPair } from '../../../keypair/dist/types/secret/index.js';
import { SchnorrMultikey } from '../../src/index.js';
import data from '../data/test-data.js';

const { did, document, keyPair: keys } = data;

const keys = new SchnorrKeyPair(keys);
console.log('keyPair', keyPair);

const { verificationMethod } = document;
const { id, controller } = verificationMethod[0];

const message = Buffer.from('Hello BTC1!');
const multikey = new Multikey({ id, controller, keyPair });
console.log('multikey', multikey);

const signature = multikey.sign(message);
console.log('signature', signature);

const encoded = multikey.publicKey.encode();
console.log('encoded', encoded);

let decoded = multikey.publicKey.decode();
console.log('decoded', decoded);

const prefix = decoded.subarray(0, 2);
console.log('prefix', prefix);

const publicKeyBytes = decoded.subarray(2);
console.log('publicKeyBytes', publicKeyBytes);

const toVM = multikey.toVerificationMethod();
console.log('toVM', toVM);

const multikeyFromVm = multikey.fromVerificationMethod(verificationMethod[0]);
console.log('multikeyFromVm', multikeyFromVm);

const fullId = multikey.fullId();
console.log('fullId', fullId);