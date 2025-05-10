import { DidBtc1 } from '../../src/index.js';
import resolutionOptions from '../in/resolve/k1qgp6/resolutionOptions.json' with { type: 'json' };

const identifier = 'did:btc1:k1qgp6haekj3w5zgk56h92juynjl4ag4pt2p9wl4ajwu7yhklyp0ngcfskwzack';
const resolution = await DidBtc1.resolve(identifier, resolutionOptions);
console.log('resolution:', resolution);