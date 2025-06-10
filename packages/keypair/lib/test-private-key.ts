import { PrivateKey } from '../src/private-key.js';

const bytes =  new Uint8Array([
  115, 253, 220, 18, 252, 147, 66, 187,
  41, 174, 155, 94, 212, 118, 50,  59,
  220, 105,  58, 17, 110,  54, 81,  36,
  85, 174, 232, 48, 254, 138, 37, 162
]);
let privateKey = new PrivateKey(bytes);
console.log('privateKey.bytes', privateKey.bytes);
console.log('privateKey.secret', privateKey.secret);
console.log('privateKey.point', privateKey.point);
console.log('-------------------');
const secret = 52464508790539176856770556715241483442035423615466097401201513777400180778402n;
privateKey = new PrivateKey(secret);
console.log('privateKey.bytes', privateKey.bytes);
console.log('privateKey.secret', privateKey.secret);
console.log('privateKey.point', privateKey.point);
console.log('-------------------');
const publicKey = privateKey.computePublicKey();
console.log('publicKey', publicKey);
console.log('privateKey.hex', privateKey.hex);
const valid = privateKey.isValid();
console.log('valid', valid);
const json = privateKey.json();
console.log('json', json);