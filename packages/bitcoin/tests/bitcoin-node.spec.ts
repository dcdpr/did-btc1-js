import { expect } from 'chai';
import { Bitcoin } from '../src/bitcoin.node.js';

/**
 * Bitcoin Network Node Connection - Node (CJS) Tests
 */
describe('Bitcoin Network Node Connection - Node (CJS) Tests', () => {
  it('should initialize the browser Bitcoin class', () => {
    const bitcoin = new Bitcoin();
    expect(bitcoin).to.exist;
  });
});