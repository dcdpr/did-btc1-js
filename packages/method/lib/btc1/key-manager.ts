// import { SchnorrKeyPair, SecretKey } from '@did-btc1/keypair';
import { Btc1Identifier, Btc1KeyManager } from '../../src/index.js';

// const bytes = new Uint8Array(Buffer.from('b193d273a8ed8167f2de94e70c6d340dfdb13f2ec8f8d0b5d435c5b1b247635d', 'hex'));
// const secretKey = new SecretKey(bytes);
// const keys = new SchnorrKeyPair({ secretKey });
const { keys, identifier: { controller, id } } = Btc1Identifier.generate();
console.log('keys.multibase:', keys.multibase);
const keyUri = Btc1KeyManager.computeKeyUri(id, controller);
const keyManager = await Btc1KeyManager.initialize(keys, keyUri);
console.log('keyManager:', keyManager);
