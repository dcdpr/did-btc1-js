import { DidBtc1 } from '../../src/index.js';
import resolutionOptions from '../in/resolve/x1q20n/resolutionOptions.json' with { type: 'json' };

const identifier = 'did:btc1:x1q20n602dgh7awm6akhgne0mjcmfpnjpc9jrqnrzuuexglrmklzm6u98hgvp';
const resolution = await DidBtc1.resolve(identifier, resolutionOptions);
console.log('resolution:', resolution);