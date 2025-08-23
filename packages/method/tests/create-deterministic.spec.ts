import { PublicKey } from '@did-btcr2/keypair';
import { expect } from 'chai';
import { DidBtc1 } from '../src/did-btcr2.js';
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
    ['bitcoin', 'did:btcr2:k1qqpkyr20hr2ugzcdctulmprrdkz5slj3an64l0x4encgc6kpfz7g5dsaaw53r'],
    ['mutinynet', 'did:btcr2:k1q5pkyr20hr2ugzcdctulmprrdkz5slj3an64l0x4encgc6kpfz7g5dsfnpvmj'],
    ['regtest', 'did:btcr2:k1qgpkyr20hr2ugzcdctulmprrdkz5slj3an64l0x4encgc6kpfz7g5ds4tgr4f'],
    ['signet', 'did:btcr2:k1qypkyr20hr2ugzcdctulmprrdkz5slj3an64l0x4encgc6kpfz7g5dsekdtnx'],
    ['testnet3', 'did:btcr2:k1qvpkyr20hr2ugzcdctulmprrdkz5slj3an64l0x4encgc6kpfz7g5ds3qtuhv'],
    ['testnet4', 'did:btcr2:k1qspkyr20hr2ugzcdctulmprrdkz5slj3an64l0x4encgc6kpfz7g5dsdczneh']
  ]);
  const networkDidEntries = Object.entries(expectedDidMap);
  const idType = 'KEY';
  const pubKeyBytes = Buffer.fromHex('03620d4fb8d5c40b0dc2f9fd84636d85487e51ecf55fbcd5ccf08c6ac148bc8a36');
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
