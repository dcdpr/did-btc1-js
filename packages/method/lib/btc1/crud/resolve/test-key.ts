import { /*Btc1Identifier, Btc1Read,*/ Btc1Identifier, Btc1Read, DidBtc1, DidResolutionOptions } from '../../../../src/index.js';
import resolutionOptions from '../../../in/resolve/k1qgp6/resolutionOptions.json' with { type: 'json' };
const options =  resolutionOptions as DidResolutionOptions;
options.versionTime = 1746015324;

const identifier = 'did:btc1:k1qgp6haekj3w5zgk56h92juynjl4ag4pt2p9wl4ajwu7yhklyp0ngcfskwzack';
// const components = Btc1Identifier.decode(identifier);
// console.log('components:', components);

// const initialDocument = await Btc1Read.initialDocument({ identifier, components, options });
// console.log('initialDocument:', initialDocument);

// const targetDocument = await Btc1Read.targetDocument({ initialDocument, options });
// console.log('targetDocument:', targetDocument);

const resolution = await DidBtc1.resolve(identifier, options);
console.log('resolution:', resolution);