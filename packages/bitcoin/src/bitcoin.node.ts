import { MethodError } from '@did-btcr2/common';
import { networks } from 'bitcoinjs-lib';
import { DEFAULT_REST_CLIENT_CONFIG, DEFAULT_RPC_CLIENT_CONFIG } from './constants.js';
import { getNetwork } from './network.js';
import { BitcoinRest } from './rest-client.js';
import { BitcoinRpc } from './rpc-client.js';
import { AvailableNetworks, BitcoinClientConfig } from './types.js';

export type BitcoinNetworkConfig = {
  name: keyof AvailableNetworks;
  rpc: BitcoinRpc;
  rest: BitcoinRest;
  config: BitcoinClientConfig;
  data: networks.Network;
};

export type BitcoinNetworkConfigMap = {
  [key in keyof AvailableNetworks]?: BitcoinNetworkConfig;
};

/**
 * General class to house the Bitcoin client connections, client config and various utility methods.
 * @name Bitcoin
 * @type {Bitcoin}
 */
export class Bitcoin {
  public network: BitcoinNetworkConfig;
  public mainnet?: BitcoinNetworkConfig;
  public testnet?: BitcoinNetworkConfig;
  public signet?: BitcoinNetworkConfig;
  public mutinynet?: BitcoinNetworkConfig;
  public regtest?: BitcoinNetworkConfig;

  /**
   * Creates an instance of the Bitcoin class.
   * @param {BitcoinNetworkConfigMap} configs Optional configuration object for the Bitcoin client. If not provided, it will
   * be loaded from the BITCOIN_CLIENT_CONFIG environment variables.
   * @throws {MethodError} If no configs is passed and BITCOIN_NETWORK_CONFIG is missing or invalid.
   */
  constructor(configs?: BitcoinNetworkConfigMap) {
    const BITCOIN_NETWORK_CONFIG = process.env.BITCOIN_NETWORK_CONFIG ?? JSON.stringify(configs ?? {
      regtest : {
        rpc  : DEFAULT_RPC_CLIENT_CONFIG,
        rest : DEFAULT_REST_CLIENT_CONFIG
      }
    });

    if(!BITCOIN_NETWORK_CONFIG) {
      throw new MethodError(
        'No BITCOIN_NETWORK_CONFIG available: must pass `configs` to constructor or set `BITCOIN_NETWORK_CONFIG` in env',
        'MISSING_BITCOIN_NETWORK_CONFIG',
        { BITCOIN_NETWORK_CONFIG }
      );
    }

    // Check if BITCOIN_NETWORK_CONFIG is parsable JSON string
    if (!JSON.parsable(BITCOIN_NETWORK_CONFIG)) {
      throw new MethodError(
        'Parsing failed: malformed BITCOIN_NETWORK_CONFIG',
        'MISSING_MALFORMED_BITCOIN_NETWORK_CONFIG',
        { BITCOIN_NETWORK_CONFIG }
      );
    }

    // Parse the BITCOIN_NETWORK_CONFIG
    const networkConfigs: Record<string, BitcoinClientConfig> = JSON.parse(BITCOIN_NETWORK_CONFIG);

    // Set a list of available networks
    const networks: (keyof AvailableNetworks)[] = ['mainnet', 'testnet', 'signet', 'mutinynet', 'regtest'];

    // Iterate over the networks and create the client connections
    for (const network of networks) {
      const networkConfig: BitcoinClientConfig = (configs?.[network] ?? networkConfigs[network]) as BitcoinClientConfig;
      if (networkConfig) {
        this[network] = {
          name   : network,
          config : networkConfig,
          rpc    : new BitcoinRpc(networkConfig.rpc ?? DEFAULT_RPC_CLIENT_CONFIG),
          rest   : new BitcoinRest(networkConfig.rest ?? DEFAULT_REST_CLIENT_CONFIG) ,
          data   : getNetwork(network),
        };
      }
    }

    // Load and check the ACTIVE_NETWORK variable
    const ACTIVE_NETWORK = (process.env.ACTIVE_NETWORK?.toLowerCase() ?? 'regtest') as keyof AvailableNetworks;
    if (!ACTIVE_NETWORK) {
      throw new MethodError('Missing ACTIVE_NETWORK environment variable', 'MISSING_ACTIVE_NETWORK', { ACTIVE_NETWORK });
    }


    if (!this[ACTIVE_NETWORK]) {
      throw new MethodError(
        `No configuration found for ACTIVE_NETWORK='${ACTIVE_NETWORK}'`,
        'MISSING_CONFIG_FOR_NETWORK'
      );
    }

    this.network = this[ACTIVE_NETWORK];
  }

  /**
   * Converts Bitcoin (BTC) to satoshis (SAT).
   * @param {number} btc - The amount in BTC.
   * @returns {number} The amount in SAT.
   */
  public static btcToSats (btc: number): number {
    return Math.round(btc * 1e8);
  };

  /**
   * Converts satoshis (SAT) to Bitcoin (BTC).
   * @param {number} sats - The amount in SAT.
   * @returns {number} The amount in BTC.
   */
  public static satsToBtc (sats: number): number {
    return sats / 1e8;
  };
}

export const bitcoin = new Bitcoin();