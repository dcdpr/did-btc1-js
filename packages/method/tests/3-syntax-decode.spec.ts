import { bytesToHex } from '@noble/hashes/utils';
import { expect } from 'chai';
import { Btc1Identifier } from '../src/index.js';

describe('3 Syntax => 3.2 did:btc1 Identifier Encoding', () => {
  const vectors = [
    {
      did                  : 'did:btc1:k1qqptaz4ydc2q8qjgch9kl46y48ccdhjyqdzxxjmmaupwsv9sut5ssfsm0s3dn',
      components : {
        idType       : 'KEY',
        version      : 1,
        network      : 'bitcoin',
        genesisBytes : Buffer.from('02be8aa46e14038248c5cb6fd744a9f186de440344634b7bef02e830b0e2e90826', 'hex'),
      }
    },
    {
      did                  : 'did:btc1:k1qvpxlu8m9l4jw9czmthaf7zf6e96pfv2ak05utxmwhrv0zrtgrgdrwggpepd9',
      components : {
        idType       : 'KEY',
        version      : 1,
        network      : 'testnet3',
        genesisBytes : Buffer.from('026ff0fb2feb271702daefd4f849d64ba0a58aed9f4e2cdb75c6c7886b40d0d1b9', 'hex'),
      }
    },
    {
      did                  : 'did:btc1:k1qypvksjk8vfxpp0pl6jzwvc4sw7knmv8q4l2j5j2vgsjwfrfer2vqqqgrc3cx',
      components : {
        idType       : 'KEY',
        version      : 1,
        network      : 'signet',
        genesisBytes : Buffer.from('02cb42563b126085e1fea427331583bd69ed87057ea9524a6221272469c8d4c000', 'hex'),
      }
    },
    {
      did                  : 'did:btc1:k1psppl550jkrj9l2caef72m98k3z2ytvfkjv9uftv3htkn8n54979cwg5ht5py',
      components : {
        idType       : 'KEY',
        version      : 1,
        network      : 5,
        genesisBytes : Buffer.from('021fd28f958722fd58ee53e56ca7b444a22d89b4985e256c8dd7699e74a97c5c39', 'hex'),
      }
    },
    {
      did                  : 'did:btc1:x1qzlqmvawa6ya5fx4qyf27a85p34z07z060h352qxgl65fr6d4ugmzm5tzxq',
      components : {
        idType       : 'EXTERNAL',
        version      : 1,
        network      : 'bitcoin',
        genesisBytes : Buffer.from('be0db3aeee89da24d50112af74f40c6a27f84fd3ef1a280647f5448f4daf11b1', 'hex'),
      }
    },
    {
      did                  : 'did:btc1:x1q2lqmvawa6ya5fx4qyf27a85p34z07z060h352qxgl65fr6d4ugmzxrg4q8',
      components : {
        idType       : 'EXTERNAL',
        version      : 1,
        network      : 'regtest',
        genesisBytes : Buffer.from('be0db3aeee89da24d50112af74f40c6a27f84fd3ef1a280647f5448f4daf11b1', 'hex'),
      }
    },
    {
      did                  : 'did:btc1:x1qjlqmvawa6ya5fx4qyf27a85p34z07z060h352qxgl65fr6d4ugmzgnd92w',
      components : {
        idType       : 'EXTERNAL',
        version      : 1,
        network      : 'testnet4',
        genesisBytes : Buffer.from('be0db3aeee89da24d50112af74f40c6a27f84fd3ef1a280647f5448f4daf11b1', 'hex'),
      }
    }
  ];

  it('should properly encode each vector and match the corresponding did', () => {
    vectors.map(({ did, components: { version, network, genesisBytes } }) => {
      const decoded = Btc1Identifier.decode(did);
      expect(decoded.version).to.equal(version);
      if(typeof decoded.network === 'number') {
        expect(decoded.network).to.equal(network);
      } else {
        expect(decoded.network).to.equal(network);
      }
      expect(bytesToHex(decoded.genesisBytes)).to.equal(bytesToHex(genesisBytes));
    });
  });
});