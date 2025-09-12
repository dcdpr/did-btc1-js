import { SchnorrKeyPair } from "@did-btcr2/keypair";
import { DidBtcr2 } from "../../../../src/did-btcr2.js";
import { writeFile } from 'fs/promises';

const kp = SchnorrKeyPair.generate()
for(const network of ['bitcoin', 'signet', 'regtest', 'testnet3', 'testnet4', 'mutinynet']) {
    const response = await DidBtcr2.create({
        idType: 'KEY',
        pubKeyBytes: kp.publicKey.compressed,
        options: { version: 1, network }
    });
    const data = { ...response, keyPair: { secret: kp.secretKey.hex, public: kp.publicKey.hex } };
    await writeFile(`./data/${network}-k.json`, JSON.stringify(data, null, 2));
}