import { canonicalization } from '@did-btc1/common';
import sourceDocument from '../in/update/test/initial-document.json' with { type: 'json' };
import targetDocument from '../in/update/test/target-document.json' with { type: 'json' };

const sourceHash = (await canonicalization.process(sourceDocument, 'base58')).slice(1);
console.log('sourceHash:', sourceHash);

const targetHash = (await canonicalization.process(targetDocument, 'base58')).slice(1);
console.log('targetHash:', targetHash);