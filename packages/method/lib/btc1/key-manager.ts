import { KeyPair, PrivateKey } from '@did-btc1/key-pair';
import { Btc1KeyManager } from '../../src/index.js';

const bytes = new Uint8Array(Buffer.from('b193d273a8ed8167f2de94e70c6d340dfdb13f2ec8f8d0b5d435c5b1b247635d', 'hex'));
const privateKey = new PrivateKey(bytes);
const keys = new KeyPair({ privateKey });

console.log('keys.multibase:', keys.multibase);
const keyManager = await Btc1KeyManager.initialize(keys);
console.log('keyManager:', keyManager);
