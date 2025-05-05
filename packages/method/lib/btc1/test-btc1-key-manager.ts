import { KeyPair, PrivateKey } from '@did-btc1/key-pair';
import { Btc1KeyManager } from '../../src/index.js';

// Properly format the id
// const id = '#initialKey';

// Default to bip340-jcs-2025 cryptosuite
// const type = 'bip340-jcs-2025';

// const controller = 'did:btc1:k1qgp6haekj3w5zgk56h92juynjl4ag4pt2p9wl4ajwu7yhklyp0ngcfskwzack';
// Create a new Multikey instance
// const multikey = new Multikey({ id, controller, keyPair });

// Create a new Cryptosuite instance
// const cryptosuite = new Cryptosuite({ cryptosuite: type, multikey });

// Create a new DataIntegrityProof instance
// const proof = new DataIntegrityProof(cryptosuite);

const keys = new KeyPair({
    privateKey: new PrivateKey(new Uint8Array(Buffer.from('b193d273a8ed8167f2de94e70c6d340dfdb13f2ec8f8d0b5d435c5b1b247635d', 'hex')))
});

console.log('keys.multibase:', keys.multibase);
const keyManager = new Btc1KeyManager({ keys });
console.log('keyManager:', keyManager);
