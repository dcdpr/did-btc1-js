import { SchnorrKeyPair } from "@did-btc1/keypair";
import { DidBtc1 } from "../../../../src/did-btc1.js";

const secretKey = Buffer.from('b8e9cdde0453f6608df2dde9f4b0000416537361d08b8981ea0187455113c259', 'hex');
const kp = new SchnorrKeyPair({ secretKey });
console.log('kp', kp);
const response = await DidBtc1.create({ idType: 'KEY', pubKeyBytes: kp.publicKey.compressed, options: { version: 1, network: 'mutinynet' } });
console.log('response', response.initialDocument.service);