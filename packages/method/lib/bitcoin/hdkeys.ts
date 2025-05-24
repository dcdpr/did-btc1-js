import * as bip32 from 'bip32';

import { HDKey } from '@scure/bip32';

const tprv = 'tprv8ZgxMBicQKsPd6jfZTMSpcA7V5hW6rjrfyfJgvDHagKPqm1EUMdbStTejbVy6PTuGp6JiuRZWfm5deuPVMVB6ZQ5i2vQE7BqH386638AwHn';
const path = '/84h/1h/0h/0/0';


const node = bip32.BIP32Factory(await import('tiny-secp256k1')).fromBase58(tprv);

console.log('node', node);
// const mnemonic = generateMnemonic(wordlist, 128);
// console.log('mnemonic', mnemonic);
// const seed = await mnemonicToSeed(mnemonic);
// console.log('seed', seed.toString());
// const master = HDKey.fromMasterSeed(seed);
// console.log('master', master);
// console.log('master.privateExtendedKey', master.privateExtendedKey);
// console.log('master.publicExtendedKey', master.publicExtendedKey);
// const child = master.deriveChild(0);
// console.log('child', child);