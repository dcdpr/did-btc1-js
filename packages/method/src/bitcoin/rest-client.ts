import { BitcoinRpcError, Btc1Error, UnixTimestamp } from '@did-btc1/common';
import {
  BlockResponse,
  BlockV0,
  BlockV1,
  BlockV2,
  BlockV3,
  GetBlockParams,
  TxInPrevout,
  VerbosityLevel
} from '../types/bitcoin.js';
import { DEFAULT_REST_CLIENT_CONFIG } from './constants.js';

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

export interface RestClientConfigParams {
  network: string;
  host: string;
  headers?: { [key: string]: string };
}

export class RestClientConfig {
  network: string;
  host: string;
  headers?: { [key: string]: string };
  constructor({ network, host, headers }: RestClientConfigParams) {
    this.network = network;
    this.host = host;
    this.headers = headers;
  }
}

export interface ApiCallParams {
  path: string;
  url?: string;
  method?: string;
  body?: any
};

export interface RestResponse extends Response {
  [key: string]: any;
}

/**
 * Implements a strongly-typed BitcoinRestClient to connect to remote bitcoin node via REST API.
 * @class BitcoinRest
 * @type {BitcoinRest}
 */
export default class BitcoinRestClient {
  /**
   * The encapsulated {@link RestClientConfig} object.
   * @private
   */
  private _config: RestClientConfig;

  public api: { call: ({ path, url, method, body }: ApiCallParams) => Promise<any> };

  constructor(config: RestClientConfig){
    this._config = new RestClientConfig(config);
    this.api = { call: this.call.bind(this) };
  }

  /**
   * Static method connects to a bitcoin node running a esplora REST API.
   *
   * @param {?RestClientConfig} config The configuration object for the client (optional).
   * @returns A new {@link BitcoinRpc} instance.
   * @example
   * ```
   * const alice = BitcoinRpc.connect();
   * ```
   */
  public static connect(config?: RestClientConfig): BitcoinRestClient {
    return new BitcoinRestClient(config ?? DEFAULT_REST_CLIENT_CONFIG);
  }

  private async call({ path, url, method, body }: ApiCallParams): Promise<any> {
    // Construct the URL if not provided
    url ??= `${this.config.host.replaceEnd('/')}${path}`;

    // Set the method to GET if not provided
    method ??= 'GET';

    // Construct the request options
    const requestInit = {
      method,
      headers : {
        'Content-Type' : 'application/json',
        ...this.config.headers,
      }
    } as any;

    // If the method is POST or PUT, add the body to the request
    if(body) {
      requestInit.body = JSON.stringify(body);
    }

    // Make the request
    const response = await fetch(url, requestInit) as RestResponse;

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Btc1Error(
        `Request failed: ${response.status} - ${response.statusText}`,
        'FAILED_HTTP_REQUEST',
        response
      );
    }

    // Parse the response as JSON and return it
    return await response.json();
  }

  /**
   * Get the configuration object.
   * @private
   */
  get config(): RestClientConfig {
    const conf = this._config;
    return conf;
  }

  /**
   * Returns the blockheight of the most-work fully-validated chain. The genesis block has height 0.
   * @returns {Blockheight} The number of the blockheight with the most-work of the fully-validated chain.
   */
  public async getBlockCount(): Promise<number> {
    return await this.api.call({ path: '/blocks/tip/height' });
  }


  /**
   * Returns the block data associated with a `blockhash` of a valid block.
   * @param {GetBlockParams} params See {@link GetBlockParams} for details.
   * @param {?string} params.blockhash The blockhash of the block to query.
   * @param {?number} params.height The block height of the block to query.
   * @param {?VerbosityLevel} params.verbosity The verbosity level. See {@link VerbosityLevel}.
   * @returns {BlockResponse} A promise resolving to a {@link BlockResponse} formatted depending on `verbosity` level.
   * @throws {BitcoinRpcError} If neither `blockhash` nor `height` is provided.
   */
  public async getBlock({ blockhash, height, verbosity }: GetBlockParams): Promise<BlockResponse | undefined> {
    // Check if blockhash or height is provided, if neither throw an error
    if(!blockhash && height === undefined) {
      throw new BitcoinRpcError('blockhash or height required', 'INVALID_PARAMS_GET_BLOCK', { blockhash, height });
    }

    // If height is provided, get the blockhash
    blockhash ??= await this.getBlockHash(height!);
    if(!blockhash || typeof blockhash !== 'string') {
      return undefined;
    }
    // Get the block data
    const block = await this.api.call({ path: 'getblock', body: {blockhash, verbosity: verbosity ?? 3} });

    // Return the block data depending on verbosity level
    switch(verbosity) {
      case 0:
        return block as BlockV0;
      case 1:
        return block as BlockV1;
      case 2:
        return block as BlockV2;
      case 3:
        return block as BlockV3;
      default:
        return block as BlockV3;
    }
  }

  /**
   * Get the block hash for a given block height.
   * See {@link https://github.com/blockstream/esplora/blob/master/API.md#get-block-heightheight | Esplora GET /block-height/:height } for details.
   * @param {number} height The block height (required).
   * @returns {Promise<string>} The hash of the block currently at height..
   */
  public async getBlockHash(height: number): Promise<string> {
    return await this.api.call({ path: `/block-height/${height}` });
  }

  /**
   * Returns the raw transaction in hex or as binary data.
   * See {@link https://github.com/blockstream/esplora/blob/master/API.md#get-txtxidhex | Esplora GET /tx/:txid/raw } for details.
   *
   * @async
   * @param {string} txid The transaction id (required).
   * @param {?VerbosityLevel} verbosity Response format: hex or raw binary. Default is hex.
   * @returns {GetRawTransaction} A promise resolving to data about a transaction in the form specified by verbosity.
   */
  public async getRawTransaction(txid: string, verbosity?: VerbosityLevel): Promise<RawTransactionRest> {
    return await this.api.call({ path : `/tx/${txid}/${
      verbosity === VerbosityLevel.hex
        ? 'hex'
        : 'raw'
    }` });
  }

  /**
   * Get transaction history for the specified address/scripthash, sorted with newest first.
   * Returns up to 50 mempool transactions plus the first 25 confirmed transactions.
   * See {@link https://github.com/blockstream/esplora/blob/master/API.md#get-addressaddresstxs | Esplora GET /address/:address/txs } for details.
   */
  public async getAddressTransactions(address?: string, scripthash?: string): Promise<Array<RawTransactionRest>> {
    return await this.api.call({ path: `/address/${address ?? scripthash}/txs` });
  }
}