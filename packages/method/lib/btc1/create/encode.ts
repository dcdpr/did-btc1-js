import { Logger } from '@did-btc1/common';
import { Btc1Identifier } from '../../../src/index.js';

const mutinynet = {
  idType       : 'KEY',
  version      : 1,
  network      : 'mutinynet',
  genesisBytes : Buffer.from('02be8aa46e14038248c5cb6fd744a9f186de440344634b7bef02e830b0e2e90826', 'hex')
};

Logger.log('Encoding', mutinynet);
const mnet = Btc1Identifier.encode(mutinynet);
Logger.log(`Encoded ${mnet}`);

const zeroxD = {
  idType       : 'KEY',
  version      : 1,
  network      : 8,
  genesisBytes : Buffer.from('02be8aa46e14038248c5cb6fd744a9f186de440344634b7bef02e830b0e2e90826', 'hex')
};

Logger.log('Encoding', zeroxD);
const zxd = Btc1Identifier.encode(zeroxD);
Logger.log(`Encoded ${zxd}`);
