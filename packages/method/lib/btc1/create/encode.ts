import { Logger } from '@did-btc1/common';
import { Btc1Identifier } from '../../../src/index.js';

const mutinynet = {
  idType       : 'KEY',
  version      : 1,
  network      : 'mutinynet',
  genesisBytes : Buffer.fromHex('02be8aa46e14038248c5cb6fd744a9f186de440344634b7bef02e830b0e2e90826')
};

Logger.log('Encoding mutinynet => ', mutinynet);
const mnet = Btc1Identifier.encode(mutinynet);
Logger.log(`Encoded mutinynet => ${mnet}`);

const network5 = {
  idType       : 'KEY',
  version      : 1,
  network      : 5,
  genesisBytes : Buffer.fromHex('02be8aa46e14038248c5cb6fd744a9f186de440344634b7bef02e830b0e2e90826')
};

Logger.log('Encoding', network5);
const net5 = Btc1Identifier.encode(network5);
Logger.log(`Encoded ${net5}`);
