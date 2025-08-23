import { writeFile } from 'fs/promises';
import { DidBtc1 } from "../../../../src/did-btcr2.js";
import { BeaconUtils, getNetwork, IntermediateDidDocument } from "../../../../src/index.js";
import { SchnorrKeyPair } from '@did-btcr2/keypair';
import { ID_PLACEHOLDER_VALUE } from '@did-btcr2/common';

const key0 = SchnorrKeyPair.generate();
const service0 = SchnorrKeyPair.generate();

for(const network of ['bitcoin', 'signet', 'regtest', 'testnet3', 'testnet4', 'mutinynet']) {

const service = BeaconUtils.generateBeaconService({
  id          : `${ID_PLACEHOLDER_VALUE}#service-0`,
  publicKey   : service0.publicKey.compressed,
  network     : getNetwork(network),
  addressType : 'p2pkh',
  type        : 'SingletonBeacon',
});

const relationships = {
  authentication       : [`${ID_PLACEHOLDER_VALUE}#key-0`],
  assertionMethod      : [`${ID_PLACEHOLDER_VALUE}#key-0`],
  capabilityInvocation : [`${ID_PLACEHOLDER_VALUE}#key-0`],
  capabilityDelegation : [`${ID_PLACEHOLDER_VALUE}#key-0`]
};
const verificationMethod = [
  {
    id                 : `${ID_PLACEHOLDER_VALUE}#key-0`,
    type               : 'Multikey',
    controller         : ID_PLACEHOLDER_VALUE,
    publicKeyMultibase : key0.publicKey.multibase.address,
  }
];
const intermediateDocument = IntermediateDidDocument.create(verificationMethod, relationships, [service]);


    const response = await DidBtc1.create({
        idType: 'EXTERNAL',
        intermediateDocument,
        options: { version: 1, network }
    });
    await writeFile(`./data/${network}-x.json`, JSON.stringify(response, null, 2));
}