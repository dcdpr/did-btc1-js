import { PublicKey } from '@did-btc1/keypair';
import { expect } from 'chai';
import { DidBtc1 } from '../src/did-btc1.js';
import { BeaconUtils, Btc1DidDocument, getNetwork } from '../src/index.js';

/**
 * DidBtc1 Create Key Test Cases
 * pubKeyBytes
 * idType=key, pubKeyBytes
 * idType=key, pubKeyBytes, version
 * idType=key, pubKeyBytes, network
 */
describe('DidBtc1 Create Deterministic', () => {
  const version = 1;
  const expectedDidMap = new Map<string, string>([
    ['bitcoin', 'did:btc1:k1qqpexkrg4808au9rydeglsk3rnl53740krmheawht0wgr0cdzsaz7gq3dnzlj'],
    ['signet', 'did:btc1:k1qypexkrg4808au9rydeglsk3rnl53740krmheawht0wgr0cdzsaz7gq4xsaah'],
    ['regtest', 'did:btc1:k1qgpexkrg4808au9rydeglsk3rnl53740krmheawht0wgr0cdzsaz7gqem44mc'],
    ['testnet3', 'did:btc1:k1qvpexkrg4808au9rydeglsk3rnl53740krmheawht0wgr0cdzsaz7gqask2ea'],
    ['testnet4', 'did:btc1:k1qspexkrg4808au9rydeglsk3rnl53740krmheawht0wgr0cdzsaz7gqpgl9hx']
  ]);
  const networkDidEntries = Object.entries(expectedDidMap);
  const idType = 'KEY';
  const pubKeyBytes = new Uint8Array([
    3, 147,  88, 104, 169, 222, 126, 240,
    163,  35, 114, 143, 194, 209,  28, 255,
    72, 250, 175, 176, 247, 124, 245, 215,
    91, 220, 129, 191,  13,  20,  58,  47,
    32
  ]);
  const publicKey = new PublicKey(pubKeyBytes);
  const publicKeyMultibase = publicKey.multibase;

  it('should create a deterministic key identifier and DID document from a publicKey',
    async () => {
      const { did, initialDocument } = await DidBtc1.create({ idType, pubKeyBytes });
      const verificationMethod = [
        {
          id                 : `${did}#initialKey`,
          type               : 'Multikey',
          controller         : did,
          publicKeyMultibase : publicKeyMultibase.address
        }
      ];
      const service = BeaconUtils.generateBeaconServices({
        identifier : did,
        network    : getNetwork('bitcoin'),
        type       : 'SingletonBeacon',
        publicKey  : publicKey.compressed
      });
      const didDocument = new Btc1DidDocument({ id: did, verificationMethod, service });
      expect(did).to.equal(expectedDidMap.get('bitcoin'));
      expect(initialDocument).to.be.instanceOf(Btc1DidDocument);
      expect(initialDocument.verificationMethod[0].id).to.equals(didDocument.verificationMethod[0].id);
      expect(initialDocument.verificationMethod[0].type).to.equals(didDocument.verificationMethod[0].type);
      expect(initialDocument.verificationMethod[0].controller).to.equals(didDocument.verificationMethod[0].controller);
      expect(initialDocument.verificationMethod[0].publicKeyMultibase).to.equals(didDocument.verificationMethod[0].publicKeyMultibase);
      expect(initialDocument.service[0].id).to.equals(didDocument.service[0].id);
      expect(initialDocument.service[0].type).to.equals(didDocument.service[0].type);
      expect(initialDocument.service[0].serviceEndpoint).to.equals(didDocument.service[0].serviceEndpoint);
    });

  it('should create a deterministic key identifier and DID document from a publicKey and version',
    async () => {
      const { did, initialDocument } = await DidBtc1.create({ idType, pubKeyBytes, options: { version } });
      const verificationMethod = [
        {
          id                 : `${did}#initialKey`,
          type               : 'Multikey',
          controller         : did,
          publicKeyMultibase : publicKeyMultibase.address
        }
      ];
      const service = BeaconUtils.generateBeaconServices({
        identifier : did,
        network    : getNetwork('bitcoin'),
        type       : 'SingletonBeacon',
        publicKey  : publicKey.compressed
      });
      const didDocument = new Btc1DidDocument({ id: did, verificationMethod, service });
      expect(did).to.equal(did);
      expect(initialDocument).to.be.instanceOf(Btc1DidDocument);
      expect(initialDocument.verificationMethod[0].id).to.equals(didDocument.verificationMethod[0].id);
      expect(initialDocument.verificationMethod[0].type).to.equals(didDocument.verificationMethod[0].type);
      expect(initialDocument.verificationMethod[0].controller).to.equals(didDocument.verificationMethod[0].controller);
      expect(initialDocument.verificationMethod[0].publicKeyMultibase).to.equals(didDocument.verificationMethod[0].publicKeyMultibase);
      expect(initialDocument.service[0].id).to.equals(didDocument.service[0].id);
      expect(initialDocument.service[0].type).to.equals(didDocument.service[0].type);
      expect(initialDocument.service[0].serviceEndpoint).to.equals(didDocument.service[0].serviceEndpoint);
    });

  it('should create a deterministic key identifier and DID document from a publicKey and network',
    async () => {
      await Promise.all(
        networkDidEntries.map(
          async ([network, did]) => {
            const verificationMethod = [
              {
                id                 : `${did}#initialKey`,
                type               : 'Multikey',
                controller         : did,
                publicKeyMultibase : publicKeyMultibase.address
              }
            ];
            const service = BeaconUtils.generateBeaconServices({
              identifier : did,
              network    : getNetwork('bitcoin'),
              type       : 'SingletonBeacon',
              publicKey  : publicKey.compressed
            });
            const didDocument = new Btc1DidDocument({ id: did, verificationMethod, service });
            const result = await DidBtc1.create({ idType, pubKeyBytes, options: { network } });
            expect(result.did).to.equal(did);
            expect(result.initialDocument).to.be.instanceOf(Btc1DidDocument);
            expect(result.initialDocument.verificationMethod[0].id).to.equals(didDocument.verificationMethod[0].id);
            expect(result.initialDocument.verificationMethod[0].type).to.equals(didDocument.verificationMethod[0].type);
            expect(result.initialDocument.verificationMethod[0].controller).to.equals(didDocument.verificationMethod[0].controller);
            expect(result.initialDocument.verificationMethod[0].publicKeyMultibase).to.equals(didDocument.verificationMethod[0].publicKeyMultibase);
            expect(result.initialDocument.service[0].id).to.equals(didDocument.service[0].id);
            expect(result.initialDocument.service[0].type).to.equals(didDocument.service[0].type);
            expect(result.initialDocument.service[0].serviceEndpoint).to.equals(didDocument.service[0].serviceEndpoint);
          })
      );
    });
});
