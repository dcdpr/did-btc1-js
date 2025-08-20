import { networks } from 'bitcoinjs-lib';

export function getNetwork(network: string): networks.Network {
  switch (network) {
    case 'bitcoin':
      return networks.bitcoin;
    case 'testnet3':
    case 'testnet4':
    case 'signet':
      return networks.testnet;
    case 'regtest':
      return networks.regtest;
    default:
      throw new Error(`Unknown network "${network}"`);
  }
}
