import { expect } from 'chai';
import { PrivateKey } from '../src/private-key.js';
import { PublicKey } from '../src/public-key.js';
import { PrivateKeyError } from '@did-btc1/common';

describe('PrivateKey instantiated', () => {
  const bytes = new Uint8Array([
    115, 253, 220, 18, 252, 147, 66, 187,
    41, 174, 155, 94, 212, 118, 50,  59,
    220, 105,  58, 17, 110,  54, 81,  36,
    85, 174, 232, 48, 254, 138, 37, 162
  ]);
  const secret = 52464508790539176856770556715241483442035423615466097401201513777400180778402n;
  const point = 70034219475303640140997251078025716305705157134061811313219629275858557282031n;
  const hex = '73fddc12fc9342bb29ae9b5ed476323bdc693a116e36512455aee830fe8a25a2';

  describe('with invalid seed', () => {
    it('should throw PrivateKeyError if seed is not bytes or bigint', () => {
      expect(() => new PrivateKey('' as any))
        .to.throw(PrivateKeyError, 'Invalid seed: must be 32-byte Uint8Array or bigint secret');
    });

    it('should throw PrivateKeyError if seed is invalid bigint secret', () => {
      expect(() => new PrivateKey(0n))
        .to.throw(PrivateKeyError, 'Invalid seed: must must be a valid bigint secret');
    });

    it('should throw PrivateKeyError if seed is invalid byte array', () => {
      expect(() => new PrivateKey(new Uint8Array([0])))
        .to.throw(PrivateKeyError, 'Invalid seed: must be a valid 32-byte private key');
    });
  });

  describe('with seed as bytes array', () => {
    const privateKey = new PrivateKey(bytes);

    it('should be an instance of PrivateKey', () => {
      expect(privateKey).to.be.instanceOf(PrivateKey);
    });

    it('should have property bytes matching the seed bytes', () => {
      expect(privateKey.bytes).to.deep.equal(bytes);
    });

    it('should have property point matching the expected point', () => {
      expect(privateKey.point).to.deep.equal(point);
    });

    it('should have property secret matching the expected secret', () => {
      expect(privateKey.secret).to.deep.equal(secret);
    });

    it('should compute publicKey', () => {
      expect(privateKey.computePublicKey()).to.be.instanceOf(PublicKey);
    });

    it('should equal the expected PrivateKey', () => {
      expect(privateKey.equals(new PrivateKey(bytes))).to.be.true;
    });

    it('should equal the expected hex', () => {
      expect(privateKey.hex).to.equal(hex);
    });

    it('should equal the expected PrivateKey', () => {
      expect(privateKey.isValid()).to.be.true;
    });

  });

  describe('with seed as bigint secret', () => {
    const privateKey = new PrivateKey(secret);

    it('should be an instance of PrivateKey', () => {
      expect(privateKey).to.be.instanceOf(PrivateKey);
    });

    it('should have property bytes matching the seed bytes', () => {
      expect(privateKey.bytes).to.deep.equal(bytes);
    });

    it('should have property point matching the expected point', () => {
      expect(privateKey.point).to.deep.equal(point);
    });

    it('should have property secret matching the expected secret', () => {
      expect(privateKey.secret).to.deep.equal(secret);
    });

    it('should compute publicKey', () => {
      expect(privateKey.computePublicKey()).to.be.instanceOf(PublicKey);
    });

    it('should equal the expected PrivateKey', () => {
      expect(privateKey.equals(new PrivateKey(secret))).to.be.true;
    });

    it('should have property hex matching the expected hex', () => {
      expect(privateKey.hex).to.equal(hex);
    });

    it('should be valid', () => {
      expect(privateKey.isValid()).to.be.true;
    });

  });
});