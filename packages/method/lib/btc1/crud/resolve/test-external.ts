import { DidBtc1, DidResolutionOptions } from '../../../../src/index.js';
import resolutionOptions from '../../../in/resolve/x1q20n/resolutionOptions.json' with { type: 'json' };
const options = resolutionOptions as DidResolutionOptions;
options.versionTime = 1746015324;

const identifier = 'did:btc1:x1q20n602dgh7awm6akhgne0mjcmfpnjpc9jrqnrzuuexglrmklzm6u98hgvp';
// const components = Btc1Identifier.decode(identifier);
// console.log('components:', components);

// const initialDocument = await Btc1Read.initialDocument({ identifier, components, options });
// console.log('initialDocument:', initialDocument);

// const targetDocument = await Btc1Read.targetDocument({ initialDocument, options });
// console.log('targetDocument:', targetDocument);

const resolution = await DidBtc1.resolve(identifier, options);
console.log('resolution:', resolution);