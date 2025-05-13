import { BitcoinClientConfig } from '@did-btc1/common';
import dotenv from 'dotenv';
import BitcoinRest from '../../src/bitcoin/rest-client.js';
import { BlockV3 } from '../../src/index.js';

dotenv.config({ path: '.env.regtest' });
const config = process.env.BITCOIN_CONNECTION_CONFIG;

const { rest } = JSON.parse(config!) as BitcoinClientConfig;

const client = BitcoinRest.connect(rest);
let height = await client.getBlockCount();

const block = await client.getBlock({ height }) as BlockV3;
console.log(`block #${height}`, block);
