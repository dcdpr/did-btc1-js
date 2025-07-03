import { ID_PLACEHOLDER_VALUE } from '@did-btc1/common';
import { PublicKey } from '../../keypair/dist/types/secret/index.js';
import { payments } from 'bitcoinjs-lib';
import { expect } from 'chai';
import { DidBtc1 } from '../src/did-btc1.js';
import { Btc1DidDocument, getNetwork, IntermediateDidDocument } from '../src/index.js';

/**
 * DidBtc1 Create External Test Cases
 * idType=external, intermediateDocument
 * idType=external, intermediateDocument, version
 * idType=external, intermediateDocument, network
 */
describe('DidBtc1 Create External', () => {
  const expectedDidMap = new Map<string, string>([
    ['bitcoin', 'did:btc1:x1qqqdpgqepe54a2nr44kh8jnpuvs0h7k4vjt7pqr9q3e6qjt9mrmsu4nfdnq'],
    ['regtest', 'did:btc1:x1qgqdpgqepe54a2nr44kh8jnpuvs0h7k4vjt7pqr9q3e6qjt9mrmsugy2648'],
    ['testnet4', 'did:btc1:x1qsqdpgqepe54a2nr44kh8jnpuvs0h7k4vjt7pqr9q3e6qjt9mrmsux502lw']
  ]);
  const idType = 'EXTERNAL';
  const publicKey = new PublicKey(new Uint8Array([
    2, 206, 152,  64, 106, 58, 228,  11,
    55, 209,  52,  38,  90, 75, 107, 155,
    163, 176, 226, 175,   3, 40, 184, 133,
    28,   0,  90,  52,  10, 21, 186, 144,
    12
  ]));
  const verificationMethod = [
    {
      id                 : `${ID_PLACEHOLDER_VALUE}#key-0`,
      type               : 'Multikey',
      controller         : ID_PLACEHOLDER_VALUE,
      publicKeyMultibase : publicKey.multibase.address
    }
  ];
  const p2tr = payments.p2tr({ network: getNetwork('bitcoin'), internalPubkey: publicKey.x }).address;
  const service = [{
    id              : `${ID_PLACEHOLDER_VALUE}#key-0`,
    type            : 'SingletonBeacon',
    serviceEndpoint : `bitcoin:${p2tr}`,
  }];

  it('should create new bitcoin DID and initial DID document',
    async () => {
      const network = 'bitcoin';
      const intermediateDocument = new IntermediateDidDocument({ id: ID_PLACEHOLDER_VALUE, verificationMethod, service });
      const {did, initialDocument} = await DidBtc1.create({ idType, intermediateDocument, options: { network }});

      expect(did).to.equal(expectedDidMap.get(network));
      expect(initialDocument).to.be.instanceOf(Btc1DidDocument);

      expect(initialDocument.verificationMethod[0].type).to.equal(intermediateDocument.verificationMethod[0].type);
      expect(initialDocument.verificationMethod[0].publicKeyMultibase).to.equal(intermediateDocument.verificationMethod[0].publicKeyMultibase);

      expect(initialDocument.service[0].type).to.equal(intermediateDocument.service[0].type);
      expect(initialDocument.service[0].serviceEndpoint).to.equal(intermediateDocument.service[0].serviceEndpoint);
    }
  );

  it('should create new regtest DID and initial DID Document',
    async () => {
      const network = 'regtest';
      const intermediateDocument = new IntermediateDidDocument({ id: ID_PLACEHOLDER_VALUE, verificationMethod, service });
      const {did, initialDocument} = await DidBtc1.create({ idType, intermediateDocument, options: { network }});

      expect(did).to.equal(expectedDidMap.get(network));
      expect(initialDocument).to.be.instanceOf(Btc1DidDocument);

      expect(initialDocument.verificationMethod[0].type).to.equal(intermediateDocument.verificationMethod[0].type);
      expect(initialDocument.verificationMethod[0].publicKeyMultibase).to.equal(intermediateDocument.verificationMethod[0].publicKeyMultibase);

      expect(initialDocument.service[0].type).to.equal(intermediateDocument.service[0].type);
      expect(initialDocument.service[0].serviceEndpoint).to.equal(intermediateDocument.service[0].serviceEndpoint);
    }
  );

  it('should create new testnet4 DID and initial DID Document',
    async () => {
      const network = 'testnet4';
      const intermediateDocument = new IntermediateDidDocument({ id: ID_PLACEHOLDER_VALUE, verificationMethod, service });
      const {did, initialDocument} = await DidBtc1.create({ idType, intermediateDocument, options: { network }});

      expect(did).to.equal(expectedDidMap.get(network));
      expect(initialDocument).to.be.instanceOf(Btc1DidDocument);

      expect(initialDocument.verificationMethod[0].type).to.equal(intermediateDocument.verificationMethod[0].type);
      expect(initialDocument.verificationMethod[0].publicKeyMultibase).to.equal(intermediateDocument.verificationMethod[0].publicKeyMultibase);

      expect(initialDocument.service[0].type).to.equal(intermediateDocument.service[0].type);
      expect(initialDocument.service[0].serviceEndpoint).to.equal(intermediateDocument.service[0].serviceEndpoint);
    });
});