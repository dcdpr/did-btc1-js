import { canonicalization } from '@did-btc1/common';
import iDoc0 from '../../data/jintek/update/initial-document.json' with { type: 'json' };
import iDoc1 from '../in/update/test/initial-document.json' with { type: 'json' };

const iDocHash0 = (await canonicalization.process(iDoc0, 'base58')).slice(1);
console.log('iDocHash0:', iDocHash0);

const iDocHash1 = (await canonicalization.process(iDoc1, 'base58')).slice(1);
console.log('iDocHash1:', iDocHash1);