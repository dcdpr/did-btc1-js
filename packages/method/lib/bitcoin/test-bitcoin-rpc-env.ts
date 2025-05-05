import dotenv from 'dotenv';
import BitcoinRpc from '../../src/bitcoin/rpc-client.js';
import { BlockV3 } from '../../src/index.js';

dotenv.config({ path: '.env.rpc' });

const BITCOIN_CONNECTION_CONFIG = JSON.parse(process.env.BITCOIN_CONNECTION_CONFIG!);

const rpc = BitcoinRpc.connect(BITCOIN_CONNECTION_CONFIG)
let height = await rpc.getBlockCount();

const block = await rpc.getBlock({ height }) as BlockV3;
console.log(`block #${height}`, block);
