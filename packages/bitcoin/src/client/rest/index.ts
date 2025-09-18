import { MethodError, UnixTimestamp } from '@did-btcr2/common';
import { TxInPrevout } from '../../types.js';
import { BitcoinAddress } from './address.js';
import { BitcoinBlock } from './block.js';
import { BitcoinTransaction } from './transaction.js';
import { DEFAULT_BITCOIN_NETWORK_CONFIG } from '../../constants.js';

export type TransactionStatus = {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: UnixTimestamp;
};

export interface Vin {
  txid: string;
  vout: number;
  prevout?: TxInPrevout;
  scriptsig: string;
  scriptsig_asm: string;
  witness: string[];
  is_coinbase: boolean;
  sequence: number;
};

export interface Vout {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address?: string;
  value: number;
}
export interface ChainStats {
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
  tx_count: number;
}

export interface MempoolStats {
  funded_txo_count: number;
  funded_txo_sum: number;
  spent_txo_count: number;
  spent_txo_sum: number;
  tx_count: number;
}
export interface AddressInfo {
  address: string;
  chain_stats: ChainStats;
  mempool_stats: MempoolStats;
}
export interface RawTransactionRest {
  txid: string;
  version: number;
  locktime: number;
  vin: Array<Vin>;
  vout: Array<Vout>;
  size: number;
  weight: number;
  fee: number;
  status: TransactionStatus;
}

export interface AddressUtxo {
  txid: string;
  vout: number;
  status: TransactionStatus;
  value: number;
}
export interface RestClientConfigParams {
  host: string;
  headers?: { [key: string]: string };
}

export class RestClientConfig {
  host: string;
  headers?: { [key: string]: string };
  constructor({ host, headers }: RestClientConfigParams) {
    this.host = host;
    this.headers = headers;
  }
}

export interface RestApiCallParams {
  path: string;
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
};

export interface RestResponse extends Response {
  [key: string]: any;
}

/**
 * Implements a strongly-typed BitcoinRestClient to connect to remote bitcoin node via REST API.
 * @class BitcoinRestClient
 * @type {BitcoinRestClient}
 */
export class BitcoinRestClient {
  /**
   * The encapsulated {@link RestClientConfig} object.
   * @private
   * @type {RestClientConfig}
   */
  private _config: RestClientConfig;

  /**
   * The api calls related to bitcoin transactions.
   * @type {BitcoinTransaction}
   */
  public transaction: BitcoinTransaction;

  /**
   * The api calls related to bitcoin blocks.
   * @type {BitcoinBlock}
   */
  public block: BitcoinBlock;

  /**
   * The api calls related to bitcoin addresses.
   * @type {BitcoinAddress}
   */
  public address: BitcoinAddress;

  /**
   * The API call method that can be used to make requests to the REST API.
   * @returns {Promise<any>} A promise resolving to the response data.
   */
  public api: (params: RestApiCallParams) => Promise<any> = this.call;

  constructor(config: RestClientConfig){
    this._config = new RestClientConfig(config);
    this.api = this.call.bind(this);
    this.transaction = new BitcoinTransaction(this.api);
    this.block = new BitcoinBlock(this.api);
    this.address = new BitcoinAddress(this.api);
  }

  /**
   * Get the configuration object.
   * @private
   */
  get config(): RestClientConfig {
    const config = this._config;
    return config;
  }

  /**
   * Static method connects to a bitcoin node running a esplora REST API.
   *
   * @param {RestClientConfig} config The configuration object for the client (optional).
   * @returns {BitcoinRestClient} A new {@link BitcoinRestClient} instance.
   * @example
   * ```
   * const rest = BitcoinRestClient.connect();
   * ```
   */
  public static connect(config?: RestClientConfig): BitcoinRestClient {
    return new BitcoinRestClient(config ?? DEFAULT_BITCOIN_NETWORK_CONFIG.regtest.rest);
  }

  /**
   * Make a REST API call to the configured Bitcoin node.
   * @private
   * @param {RestApiCallParams} params The parameters for the API call. See {@link RestApiCallParams} for details.
   * @param {string} [params.path] The path to the API endpoint (required).
   * @param {string} [params.url] The full URL to the API endpoint (optional).
   * @param {string} [params.method] The HTTP method to use (default is 'GET').
   * @param {any} [params.body] The body of the request (optional).
   * @param {any} [params.headers] Additional headers to include in the request (optional).
   * @returns {Promise<any>} A promise resolving to the response data.
   */
  private async call({ path, url, method, body, headers }: RestApiCallParams): Promise<any> {
    // Construct the URL if not provided
    url ??= `${this.config.host.replaceEnd('/')}${path}`;

    // Set the method to GET if not provided
    method ??= 'GET';

    // Construct the request options
    const requestInit = {
      method,
      headers : headers ?? {
        'Content-Type' : 'application/json',
        ...this.config.headers,
      }
    } as any;

    // If the method is POST or PUT, add the body to the request
    if(body) {
      requestInit.body = JSON.is(body) ? JSON.stringify(body) : body;
      requestInit.method = 'POST';
    }

    // Make the request
    const response = await fetch(url, requestInit) as RestResponse;

    // Check if the response is a text/plain response
    const data = (response.headers.get('Content-Type') ?? 'json') === 'text/plain'
      ? await response.text()
      : await response.json();

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new MethodError(
        `Request to ${url} failed: ${response.status} - ${response.statusText}`,
        'FAILED_HTTP_REQUEST',
        { data, response }
      );
    }

    return data;
  }
}