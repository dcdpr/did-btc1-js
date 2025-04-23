import { Btc1Identifier, Btc1Read, DidResolutionOptions } from '../../../../src/index.js';
import resolutionOptions from '../../../in/key/resolutionOptions.json' with { type: 'json' };
import initialDocument from '../../../in/key/initialDidDocument.json' with { type: 'json' };
const options =  resolutionOptions as DidResolutionOptions;
options.versionTime = 1736430590;

const identifier = 'did:btc1:x1qtdr376lhfvyxe466n67kyl2hzdxeh59z3axv4ud5jsxul75xac0yyrwykt';
const components = Btc1Identifier.decode(identifier);
console.log('components:', components);

// const initialDocument = await Btc1Read.initialDocument({ identifier, components, options });
// console.log('initialDocument:', initialDocument);

const targetDocument = await Btc1Read.targetDocument({ initialDocument, options });
console.log('targetDocument:', targetDocument);