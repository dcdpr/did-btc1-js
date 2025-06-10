import { PublicKey } from '../src/public-key.js';

const bytes =  new Uint8Array([
  2, 154, 213, 246, 168,  93,  39, 238,
  105, 177,  51, 174, 210, 115, 180, 242,
  245, 215,  14, 212, 167,  22, 117,   1,
  156,  26, 118, 240,  76, 102,  53,  38,
  239
]);
let publicKey = new PublicKey(bytes);
console.log('publicKey.bytes', publicKey.bytes);
console.log('publicKey.hex', publicKey.hex);
console.log('publicKey.multibase', publicKey.multibase);
console.log('publicKey.parity', publicKey.parity);
console.log('publicKey.x', publicKey.x);
console.log('publicKey.y', publicKey.y);
console.log('publicKey.uncompressed', publicKey.uncompressed);
console.log('publicKey.prefix', publicKey.prefix);
console.log('-------------------');
const json = publicKey.json();
console.log('json', json);
const decoded = publicKey.decode();
console.log('decoded', decoded);
const encoded = publicKey.encode();
console.log('encoded', encoded);
const eq = publicKey.equals(publicKey);
console.log('eq', eq);
