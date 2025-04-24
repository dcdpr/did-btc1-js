import { ID_PLACEHOLDER_VALUE } from '@did-btc1/common';
import { KeyPair, PrivateKeyUtils } from '@did-btc1/key-pair';
import { payments } from 'bitcoinjs-lib';
import { DidBtc1, getNetwork, IntermediateDidDocument } from '../../../../src/index.js';

const networks = ['bitcoin', 'signet', 'regtest', 'testnet3', 'testnet4'];
const keys = new KeyPair({
  publicKey: new Uint8Array([
  2, 206, 152,  64, 106, 58, 228,  11,
  55, 209,  52,  38,  90, 75, 107, 155,
 163, 176, 226, 175,   3, 40, 184, 133,
  28,   0,  90,  52,  10, 21, 186, 144,
  12
])});

for(const network of networks) {
  const options = { version: 1, network };
  const verificationMethod = [
    {
      id                 : `${ID_PLACEHOLDER_VALUE}#key-0`,
      type               : 'Multikey',
      controller         : ID_PLACEHOLDER_VALUE,
      publicKeyMultibase : keys.publicKey.multibase
    }
  ];
  const p2tr = payments.p2tr({ network: getNetwork('bitcoin'), internalPubkey: keys.publicKey.x }).address;
  const service = [{
    id              : `${ID_PLACEHOLDER_VALUE}#key-0`,
    type            : 'SingletonBeacon',
    serviceEndpoint : `bitcoin:${p2tr}`,
  }];
  const intermediateDocument = new IntermediateDidDocument({ id: ID_PLACEHOLDER_VALUE, verificationMethod, service });
  const response = await DidBtc1.create({ idType: 'EXTERNAL', intermediateDocument, options });
  console.log('network:', network);
  console.log('response.did:', response.did);
}