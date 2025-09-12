import { expect } from 'chai';
import { DidBtc1CLI } from '../src/cli.js';

/**
 * TODO: Figure out how to test the CLI more effectively.
 * DidBtc1 CLI Test
 * -v, --version
 * -n, --network
 * create -t, --type | -p, --pubkey | -d, --document | -o, --options
 * read / resolve -i, --identifier | -o, --options
 * update -i, --identifier | -o, --options
 * deactivate / delete -i, --identifier | -o, --options
 */
describe('CLI Tests', () => {
  it('should initialize the CLI', () => {
    const btcr2 = new DidBtc1CLI();
    expect(btcr2).to.exist;
  });
});