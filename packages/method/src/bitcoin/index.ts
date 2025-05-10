import { BitcoinClientConfig, Btc1Error } from '@did-btc1/common';
import { networks } from 'bitcoinjs-lib';
import { getNetwork } from './network.js';
import BitcoinRest from './rest-client.js';
import BitcoinRpc from './rpc-client.js';

/**
 * General class to house the Bitcoin client connections, client config and various utility methods.
 * @name Bitcoin
 * @type {Bitcoin}
 */
export class Bitcoin {
  /**
   * The Bitcoin RPC client instance.
   * @type {BitcoinRpc}
   */
  public rpc: BitcoinRpc;

  /**
   * The Bitcoin REST client instance.
   * @type {BitcoinRest}
   */
  public rest: BitcoinRest;

  /**
   * The Bitcoin client configuration.
   * @type {BitcoinClientConfig}
   */
  public config: BitcoinClientConfig;

  public network: networks.Network;

  /**
   * Creates an instance of the Bitcoin class.
   * @param {BitcoinClientConfig} config - An optional configuration object for the Bitcoin client.
   * @throws {Btc1Error} If the connection config is missing.
   */
  constructor (config?: BitcoinClientConfig) {
    const BITCOIN_CLIENT_CONFIG = process.env.BITCOIN_CLIENT_CONFIG;
    if(!BITCOIN_CLIENT_CONFIG) {
      throw new Btc1Error('Missing connection config', 'MISSING_BITCOIN_CLIENT_CONFIG');
    }

    this.config = config ?? JSON.parse(BITCOIN_CLIENT_CONFIG) as BitcoinClientConfig;
    this.network = getNetwork(this.config.network);
    this.rpc = new BitcoinRpc(this.config.rpc);
    this.rest = new BitcoinRest(this.config.rest);
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