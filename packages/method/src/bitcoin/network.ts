import { networks } from 'bitcoinjs-lib';

/**
 * Represents the Signet network configuration.
 * Signet is a Bitcoin test network that requires block signing.
 */
export const signet = {
  /** The message prefix used for signing Bitcoin messages on Signet. */
  messagePrefix : '\x18Bitcoin Signed Message:\n',

  /** The Bech32 prefix used for Signet addresses (same as Testnet). */
  bech32 : 'tb',

  /** The BIP32 key prefixes for Signet (same as Testnet). */
  bip32         : {
    /** The public key prefix for BIP32 extended public keys. */
    public  : 0x043587cf,
    /** The private key prefix for BIP32 extended private key. */
    private : 0x04358394,
  },

  /** The prefix for Signet public key hashes (same as Testnet). */
  pubKeyHash : 0x6f,

  /** The prefix for Signet script hashes (same as Testnet). */
  scriptHash : 0xc4,

  /** The prefix for Signet Wallet Import Format (WIF) private keys (same as Testnet). */
  wif : 0xef,
};


export function getNetwork(network: string): networks.Network {
  switch (network) {
    case 'bitcoin':
      return networks.bitcoin;
    case 'mutinynet':
    case 'signet':
      return signet;
    case 'regtest':
      return networks.regtest;
    case 'testnet3':
    case 'testnet4':
      return networks.testnet;
    default:
      throw new Error(`Unknown network "${network}"`);
  }
}
