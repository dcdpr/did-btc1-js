import { expect } from 'chai';
import { Bitcoin } from '../src/bitcoin.browser.js';

/**
 * Bitcoin Network Node Connection - Browser Tests
 */
describe('Bitcoin Network Node Connection - Browser Tests', () => {
  it('should initialize the browser Bitcoin class', () => {
    const bitcoin = new Bitcoin();
    expect(bitcoin).to.exist;
  });
});