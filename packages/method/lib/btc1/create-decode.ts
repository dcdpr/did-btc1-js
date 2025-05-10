
import { Btc1Identifier } from '../../src/index.js';
import vectors from '../in/encode-decode.js';

const did = 'did:btc1:x1q20n602dgh7awm6akhgne0mjcmfpnjpc9jrqnrzuuexglrmklzm6u98hgvp';
const decoded = Btc1Identifier.decode(did);
console.log('decoded:', decoded);

for(const vector of vectors) {
  const decoded = Btc1Identifier.decode(vector.did);
  console.log('decoded:', decoded);
}