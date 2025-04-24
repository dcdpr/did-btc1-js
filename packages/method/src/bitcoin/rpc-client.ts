import { BitcoinRpcError } from '@did-btc1/common';
import { default as RpcClient } from 'bitcoin-core';
import {
  AddMultiSigAddressParams,
  BatchOption,
  BitcoinSignature,
  BlockHashOptions,
  BlockHeader,
  BlockResponse,
  BlockV0,
  BlockV1,
  BlockV2,
  BlockV3,
  BumpFeeOptions,
  BumpFeeResult,
  ChainInfo,
  CreateMultisigParams,
  CreateMultiSigResult,
  CreateRawTxParams,
  CreateWalletDescriptorOptions,
  CreateWalletDescriptorsResult,
  CreateWalletParams,
  CreateWalletResult,
  DecodedRawTransaction,
  DerivedAddresses,
  FeeEstimateMode,
  FundRawTxOptions,
  FundRawTxResult,
  GetBlockParams,
  GetUTXOsResult,
  IClientConfig,
  ImportDescriptorRequest,
  ImportMultiOptions,
  ImportMultiRequest,
  ImportMultiResult,
  ListTransactionsParams,
  ListTransactionsResult,
  ListUnspentParams,
  MemoryStats,
  MempoolContent,
  MempoolInfo,
  MiningInfo,
  Outpoint,
  PeerInfo,
  RawTransactionResponse,
  RawTransactionV0,
  RawTransactionV1,
  RawTransactionV2,
  ReturnFormatOptions,
  RpcClientConfig,
  ScanBlocksParams,
  ScriptDecoded,
  SendAllParams,
  SendAllResult,
  SendManyParams,
  SignedRawTx,
  SignRawTxParams,
  UnspentTxInfo,
  ValidateAddressResult,
  VerbosityLevel,
  WalletTransaction
} from '../types/bitcoin.js';
import { DEFAULT_RPC_CLIENT_CONFIG } from './constants.js';
import { IBitcoinRpc } from './interface.js';

/**
 * Encapsulates a {@link RpcClient | Client} object from {@link https://www.npmjs.com/package/bitcoin-core | `bitcoin-core`}.
 * Implements a strongly-typed {@link IBitcoinRpc | IBitcoinRpc interface} for added expresivity and developer support.
 * @class BitcoinRpc
 * @type {BitcoinRpc}
 */
export default class BitcoinRpc implements IBitcoinRpc {
  /**
   * The encapsulated {@link RpcClientConfig} object.
   * @private
   * @type {RpcClient} An instance of the Client class from {@link https://www.npmjs.com/package/bitcoin-core | `bitcoin-core`}.
   * See {@link https://github.com/ruimarinho/bitcoin-core/blob/master/src/index.d.ts#L64 | `Client`} for more information.
   */
  private _client: RpcClient;

  /**
   * The encapsulated {@link RpcClientConfig} object.
   * @private
   * @type {RpcClientConfig} ClientConfig from {@link https://www.npmjs.com/package/bitcoin-core | `bitcoin-core`}.
   * See {@link https://github.com/ruimarinho/bitcoin-core/blob/master/src/index.d.ts#L39 | `ClientConfig`} for more information.
   */
  private _config: RpcClientConfig;

  /**
   * Constructs a new {@link BitcoinRpc} instance from a new {@link RpcClient | RpcClient}.
   * @param {RpcClient} client The bitcoin-core client instance.
   * @example
   * ```
   *  import BitcoinRpc from '@did-btc1/method';
   *  const bob = BitcoinRpc.connect(); // To use default polar config, pass no args. Polar must run locally.
   * ```
   */
  constructor(client: RpcClient) {
    this._client = client;
    this._config = new RpcClientConfig(this._client);
  }

  /**
   * Get the config for the current BitcoinRpc object.
   * @returns {RpcClientConfig} The encapsulated {@link RpcClientConfig} object.
   * @example
   * ```
   *  import BitcoinRpc from '@did-btc1/method';
   *  const alice = BitcoinRpc.connect();
   *  const config = alice.config;
   * ```
   */
  get config(): RpcClientConfig {
    const config = this._config;
    return config;
  }

  /**
   * Get the client for the current BitcoinRpc object.
   * @returns {RpcClient} The encapsulated {@link RpcClient} object.
   * @example
   * ```
   * const alice = BitcoinRpc.connect();
   * const config = alice.client;
   * ```
   */
  get client(): RpcClient {
    const client = this._client;
    return client;
  }

  /**
   * Static method initializes a new BitcoinRpc client with the given configuration.
   * The RpcClient returned by this method does not have any named methods.
   * Use this method to create and pass a new RpcClient instance to a BitcoinRpc constructor.
   *
   * @param {IClientConfig} options The configuration object for the client (optional).
   * @returns {RpcClient} A new RpcClient instance.
   * @example
   * ```
   * const options: IClientConfig = {
   *     host: 'http://localhost:18443',
   *     username: 'alice',
   *     password: 'alicepass',
   *     version: '28.1.0',
   * }
   * const aliceClient = BitcoinRpc.initialize(options); // Client config required
   * const alice = new BitcoinRpc(aliceClient);
   * ```
   */
  public static initialize(options?: IClientConfig): RpcClient {
    const config = RpcClientConfig.initialize(options);
    return new RpcClient(config);
  }

  /**
   * Static method connects to a bitcoin node running the bitcoin core daemon (bitcoind).
   * To use default polar config, do not pass a config. See {@link DEFAULT_RPC_CLIENT_CONFIG} for default config.
   * @required A locally running {@link https://github.com/jamaljsr/polar | Polar Lightning} regtest node.
   *
   * @param {?RpcClientConfig} config The configuration object for the client (optional).
   * @returns A new {@link BitcoinRpc} instance.
   * @example
   * ```
   * const alice = BitcoinRpc.connect();
   * ```
   */
  public static connect(config?: RpcClientConfig): BitcoinRpc {
    const client = this.initialize(config ?? DEFAULT_RPC_CLIENT_CONFIG);
    return new BitcoinRpc(client);
  }

  /**
   * Handle errors that occur while executing commands.
   * @param methods An array of {@link BatchOption} objects.
   * @param error The error that was thrown.
   * @throws Throws a {@link BitcoinRpcError} with the error message.
   */
  private handleError(methods: BatchOption[], error: Error) {
    // Construct the error message
    const baseError = 'Error while executing command(s): ';
    // Get the command names
    const commands = methods.map((method) => method.method);
    // Throw the error
    error.message = `${baseError}${commands.join(', ')}`;
    throw new BitcoinRpcError('Error executing command', 'HANDLE_ERROR', error);
  }

  /**
   * Send one or more gRPC commands bitcoind node.
   * @param {Array<BatchOption>} methods An array of {@link BatchOption} objects.
   * @returns {Promise<T>} A promise resolving to the Bitcoind RPC response data as a prototyped JSON object.
   * @throws {BitcoinRpcError} If the response is not valid JSON after normalization (adding prototypes).
   */
  public async command<T = any>(methods: Array<BatchOption>): Promise<T> {
    // Execute the command(s) and catch any errors
    const result = await this.client.command(methods).catch(
      (error: Error) => this.handleError(methods, error)
    );
    // Normalize the response (prototyping)
    const response = JSON.unprototyped(result) ? JSON.normalize(result) : result;
    // Check if the response is valid JSON
    if (!JSON.is(response)) {
      const invalidJson = 'Invalid post-normalized JSON response';
      console.error(invalidJson);
      throw new BitcoinRpcError(invalidJson, response);
    }
    // Return the response
    return Array.isArray(response)
      ? response.pop()
      : response;
  };

  /**
   * TODO: Comments
   */
  public async getUnspentTransactionOutputs(outpoints: Outpoint[]): Promise<GetUTXOsResult> {
    return this.client.getUnspentTransactionOutputs(outpoints);
  }

  /**
   * TODO: Comments
   */
  public async getTransactionByHash(hash: string, options?: ReturnFormatOptions): Promise<string> {
    return this.client.getTransactionByHash(hash, options);
  }

  /**
   * TODO: Comments
   */
  public async getBlockHeadersByHash(hash: string, count: number, options?: ReturnFormatOptions): Promise<BlockHeader[]> {
    return this.client.getBlockHeadersByHash(hash, count, options);
  }

  /**
   * TODO: Comments
   */
  public async getMemoryPoolContent(): Promise<MempoolContent> {
    return this.client.getMemoryPoolContent();
  }

  /**
   * TODO: Comments
   */
  public async getMemoryPoolInformation(): Promise<MempoolInfo> {
    return this.client.getMemoryPoolInformation();
  }

  /**
   * Alias for `getblock <hash> 2`
   */
  public async getBlockByHash(hash: string, options?: BlockHashOptions): Promise<BlockHeader> {
    return this.client.getBlockByHash(hash, options);
  }

  /**
   * TODO: Comments
   */
  public async abandonTransaction(txid: string): Promise<void> {
    return await this.command([{ method: 'abandontransaction', parameters: [txid] }]);
  }

  /**
   * TODO: Comments
   */
  public async abortRescan(): Promise<void> {
    return await this.command([{ method: 'abortrescan' }]);
  }

  /**
   * TODO: Comments
   */
  public async addMultiSigAddress(params: AddMultiSigAddressParams): Promise<string> {
    return await this.command([{ method: 'addmultisigaddress', parameters: [params] }]);
  }

  /**
   * TODO: Comments
   */
  public async addWitnessAddress(address: string): Promise<void> {
    return await this.command([{ method: 'addwitnessaddress', parameters: [address] }]);
  }

  /**
   * TODO: Comments
   */
  public async backupWallet(destination: string): Promise<void> {
    return await this.command([{ method: 'backupwallet', parameters: [destination] }]);
  }

  /**
   * TODO: Comments
   */
  public async bumpFee(txid: string, options?: BumpFeeOptions): Promise<BumpFeeResult> {
    return await this.command([{ method: 'bumpfee', parameters: [txid, options] }]);
  }

  /**
   * TODO: Comments
   */
  public async createMultiSig(nrequired: number, keys: string[]): Promise<CreateMultiSigResult> {
    return await this.command([{ method: 'createmultisig', parameters: [nrequired, keys] }]);
  }

  /**
   * TODO: Comments
   */
  public async createWallet(params: CreateWalletParams): Promise<CreateWalletResult> {
    return await this.command([{ method: 'createwallet', parameters: [params] }]);
  }

  /**
   * TODO: Comments
   */
  public async decodeScript(hexstring: string): Promise<ScriptDecoded> {
    return await this.command([{ method: 'decodescript', parameters: [hexstring] }]);
  }

  /**
   * TODO: Comments
   */
  public async getBestBlockHash(): Promise<string> {
    return await this.command([{ method: 'getbestblockhash', parameters: [] }]);
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
    const block = await this.command([{ method: 'getblock', parameters: [blockhash, verbosity ?? 3] }]);

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
   * Returns the blockheight of the most-work fully-validated chain. The genesis block has height 0.
   * @returns {Blockheight} The number of the blockheight with the most-work of the fully-validated chain.
   */
  public async getBlockCount(): Promise<number> {
    return await this.command([{ method: 'getblockcount' }]);
  }

  /**
   * Returns the blockhash of the block at the given height in the active chain.
   */
  public async getBlockHash(height: number): Promise<string> {
    return await this.command([{ method: 'getblockhash', parameters: [height] }]);
  }

  /**
   * TODO: Comments
   */
  public async getBlockHeader(hash: string, verbose?: boolean): Promise<string | BlockHeader> {
    return await this.command([{ method: 'getblockheader', parameters: [hash, verbose] }]);
  }

  /**
   * TODO: Comments
   */
  public async getBlockchainInfo(): Promise<ChainInfo> {
    return this.client.getBlockchainInformation();
  }

  /**
   * TODO: Comments
   */
  public async getInfo(...args: any[]): Promise<void> {
    return await this.command([{ method: 'getinfo', parameters: [...args] }]);
  }

  /**
   * TODO: Comments
   */
  public async getMemoryInfo(mode?: 'stats' | 'mallocinfo'): Promise<MemoryStats | string> {
    return await this.command([{ method: 'getmemoryinfo', parameters: [mode] }]);
  }

  /**
   * TODO: Comments
   */
  public async scanBlocks(params: ScanBlocksParams): Promise<any> {
    return await this.command([{ method: 'scanblocks', parameters: [params] }]);
  }

  /**
   * TODO: Comments
   */
  public async fundRawTransaction(hexstring: string, options: FundRawTxOptions): Promise<FundRawTxResult> {
    return await this.command([{ method: 'fundrawtransaction', parameters: [hexstring, options] }]);
  }

  /**
   * TODO: Comments
   */
  public async signRawTransaction(params: SignRawTxParams): Promise<SignedRawTx> {
    return await this.command([{ method: 'signrawtransaction', parameters: [params] }]);
  }

  /**
   * TODO: Comments
   */
  public async sendRawTransaction(hexstring: string, allowhighfees?: boolean): Promise<void> {
    return await this.command([{ method: 'sendrawtransaction', parameters: [hexstring, allowhighfees] }]);
  }

  /**
   * TODO: Comments
   */
  public async listTransactions(params: ListTransactionsParams): Promise<ListTransactionsResult> {
    return await this.command([{ method: 'listtransactions', parameters: [params] }]);
  }

  /**
   * TODO: Comments
   */
  public async decodeRawTransaction(hexstring: string): Promise<DecodedRawTransaction> {
    return await this.command([{ method: 'decoderawtransaction', parameters: [hexstring] }]);
  }

  /**
   * TODO: Comments
   */
  public async combineRawTransaction(txs: string[]): Promise<string> {
    return await this.command([{ method: 'combinerawtransaction', parameters: [txs] }]);
  }

  /**
   * TODO: Comments
   */
  public async createRawTransaction(params: CreateRawTxParams): Promise<string> {
    return await this.command([{ method: 'createrawtransaction', parameters: [params] }]);
  }

  /**
   * Creates a multi-signature address with n signature of m keys required.
   *
   * @param {CreateMultisigParams} params The parameters for the createMultisig command.
   * @param {number} params.nrequired The number of required signatures out of the n keys (required).
   * @param {string[]} params.keys The hex-encoded public keys (required).
   * @param {?string} params.address_type The address type to use (optional, options=["legacy", "p2sh-segwit", "bech32"], default="legacy").
   * @returns {CreateMultiSigResult} json object with the address and redeemScript.
   *
   * @example Create a multisig address from 2 public keys
   * ```
   * const bob = BitcoinRpc.connect();
   * const keys = [
   *  '03789ed0bb717d88f7d321a368d905e7430207ebbd82bd342cf11ae157a7ace5fd',
   *  '03dbc6764b8884a92e871274b87583e6d5c2a58819473e17e107ef3f6aa5a61626'
   * ];
   * const multisig = await bob.createMultisig({ nrequired: 2, keys });
   * ```
   */
  public async createMultisig({ nrequired, keys, address_type }: CreateMultisigParams): Promise<CreateMultiSigResult> {
    return await this.command([{ method: 'createmultisig', parameters: [nrequired, keys, address_type] }]);
  }

  /**
   * TODO: Comments
   */
  public async getDescriptorInfo(descriptor: string): Promise<any> {
    return await this.command([{ method: 'getdescriptorinfo', parameters: [descriptor] }]);
  }

  /**
   * TODO: Comments
   */
  public async signMessageWithPrivkey(privkey: string, message: string): Promise<BitcoinSignature> {
    return await this.command([{ method: 'signmessagewithprivkey', parameters: [privkey, message] }]);
  }

  /**
   * TODO: Comments
   */
  public async validateAddress(address: string): Promise<ValidateAddressResult> {
    return await this.command([{ method: 'validateaddress', parameters: [address] }]);
  }

  /**
   * TODO: Comments
   */
  public async verifyMessage(address: string, signature: string, message: string): Promise<boolean> {
    return await this.command([{ method: 'verifymessage', parameters: [address, signature, message] }]);
  }

  /**
   * Derives one or more addresses corresponding to an output descriptor.
   * Examples of output descriptors are:
   *   pkh(<pubkey>)                                     P2PKH outputs for the given pubkey
   *   wpkh(<pubkey>)                                    Native segwit P2PKH outputs for the given pubkey
   *   sh(multi(<n>,<pubkey>,<pubkey>,...))              P2SH-multisig outputs for the given threshold and pubkeys
   *   raw(<hex script>)                                 Outputs whose output script equals the specified hex-encoded bytes
   *   tr(<pubkey>,multi_a(<n>,<pubkey>,<pubkey>,...))   P2TR-multisig outputs for the given threshold and pubkeys
   *
   * In the above, <pubkey> either refers to a fixed public key in hexadecimal notation, or to an xpub/xprv optionally followed by one
   * or more path elements separated by "/", where "h" represents a hardened child key.
   *
   * See {@link https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md | github.com/bitcoin/bitcoin/descriptors.md}
   * for more information.
   * @async
   * @param {string} descriptor The descriptor.
   * @param {Array<number>} range If descriptor is ranged, must specify end or [begin,end] to derive.
   * @returns {Array<DerivedAddresses>} a list of derived addresses
   * @example First three native segwit receive addresses
   * ```
   * const bitcoind = BitcoinRpc.connect()
   * const addresses = bitcoind.deriveAddresses("wpkh([d34db33f/84h/0h/0h]xpub6DJ2dN.../0/*)#cjjspncu", [0,2])
   * ```
   */
  public async deriveAddresses(descriptor: string, range?: Array<number>): Promise<Array<DerivedAddresses>> {
    return await this.command([{ method: 'deriveaddresses', parameters: [descriptor, range] }]);
  }

  /**
   * TODO: Comments
   */
  public async addMultisigAddress(): Promise<any> {
    return await this.command([{ method: 'addmultisigaddress' }]);
  }

  /**
   * Creates the wallet's descriptor for the given address type. The address type must be one that the
   * wallet does not already have a descriptor for. Requires wallet passphrase to be set with walletpassphrase call
   * if wallet is encrypted.
   * @param type The address type the descriptor will produce. Options are "legacy", "p2sh-segwit", "bech32", and "bech32m". (string, required)
   * @param options Options object that can be used to pass named arguments, listed below. (json object, optional)
   * @param options.internal Whether to only make one descriptor that is internal (if parameter is true) or external (if parameter is false)
   *                          (boolean, optional, default=Both external and internal will be generated unless this parameter is specified)
   * @param options.hdkey The HD key that the wallet knows the private key of, listed using 'gethdkeys', to use for this descriptor's key.
   *                       (string, optional, default=The HD key used by all other active descriptors)
   * @returns A {@link CreateWalletDescriptorsResult} response object
   */
  public async createWalletDescriptor(type: string, options: CreateWalletDescriptorOptions): Promise<CreateWalletDescriptorsResult> {
    return await this.command([{ method: 'createwalletdescriptor', parameters: [type, options] }]);
  }

  /**
   * TODO: Comments
   */
  public async getBalance(): Promise<any> {
    return await this.command([{ method: 'getbalance' }]);
  }

  /**
   * TODO: Comments
   */
  public async getNewAddress(account?: string): Promise<string> {
    return await this.command([{ method: 'getnewaddress', parameters: [account] }]);
  }

  /**
   * TODO: Comments
   */
  public async importAddress(script: string, label?: string, rescan?: boolean, p2sh?: boolean): Promise<void> {
    return await this.command([{ method: 'importaddress', parameters: [script, label, rescan, p2sh] }]);
  }

  /**
   * Import descriptors.
   *
   * This will trigger a rescan of the blockchain based on the earliest timestamp of all descriptors being imported.
   * Requires a new wallet backup. Note: This call can take over an hour to complete if using an early timestamp;
   * during that time, other rpc calls may report that the imported keys, addresses or scripts exist but related
   * transactions are still missing. The rescan is significantly faster if block filters are available
   * (using startup option "-blockfilterindex=1").
   *
   * @param requests Array of {@link ImportDescriptorRequest} objects to be imported
   * @returns Array of {@link ImportDescriptorResult} objects
   * @returns
   */
  public async importDescriptors(requests: Array<ImportDescriptorRequest>): Promise<any> {
    return await this.command([{ method: 'importdescriptors', parameters: [requests] }]);
  }

  /**
   * TODO: Comments
   */
  public async importMulti(requests: ImportMultiRequest[], options?: ImportMultiOptions): Promise<Array<ImportMultiResult>> {
    return await this.command([{ method: 'importmulti', parameters: [requests, options] }]);
  }

  /**
   * TODO: Comments
   */
  public async listUnspent(params: ListUnspentParams): Promise<UnspentTxInfo[]> {
    return await this.command([{ method: 'listunspent', parameters: [params] }]);
  }

  /**
   * TODO: Comments
   */
  public async rescanBlockchain(): Promise<any> {
    return await this.command([{ method: 'addmultisigaddress' }]);
  }

  /**
   * TODO: Comments
   */
  public async sendToAddress(): Promise<any> {
    return await this.command([{ method: 'sendtoaddress' }]);
  }

  /**
   * TODO: Comments
   */
  public async signMessage(): Promise<any> {
    return await this.command([{ method: 'signmessage' }]);
  }

  /**
   * TODO: Comments
   */
  public async signRawTransactionWithWallet(): Promise<any> {
    return await this.command([{ method: 'signrawtransactionwithwallet' }]);
  }

  /**
   * TODO: Comments
   */
  public async send(): Promise<any> {
    return await this.command([{ method: 'send' }]);
  }

  /**
   * @warning EXPERIMENTAL this call may be changed in future releases.
   *
   * Spend the value of all (or specific) confirmed UTXOs & unconfirmed change in the wallet to one or
   * more recipients. Unconfirmed inbound UTXOs and locked UTXOs will not be spent. Sendall will respect the
   * avoid_reuse wallet flag. If your wallet contains many small inputs, either because it received tiny payments or as
   * a result of accumulating change, consider using `send_max` to exclude inputs that are worth less than the fees
   * needed to spend them.
   *
   * @param {SendAllParams} params The parameters for the sendAll command.
   * @param {Recipients} params.recipients The recipient destination addresses.
   *    Each address may only appear once. Optionally some recipients can be specified with an
   *    amount to perform payments, but at least one address must appear without a specified amount.
   * @param {SendAllOptions} params.options Options object that can be used to pass named arguments.
   * @param {} params.options.conf_target Confirmation target in blocks. numeric, optional, default=wallet -txconfirmtarget.
   * @param estimate_mode The fee estimate mode, must be one of (case insensitive). string, optional, default="unset".
   *    See {@link FeeEstimateMode} for possible values.
   * @param fee_rate Specify a fee rate in sat/vB. numeric or string, optional, default=not set,
   *    falls back to wallet fee estimation
   * @param options: Options object that can be used to pass named arguments. json object, optional
   *
   * @returns A promise resolving to a {@link SendAllResult} object
   *
   * @example
   * Spend all UTXOs from the wallet with a fee rate of 1 sat/vB using named arguments
   * const bob = BitcoinRpc.connect({
   *    username: 'bob',
   *    password: 'bobpass',
   *    host: 'http://127.0.0.1:18443',
   *    allowDefaultWallet: true,
   *    version: '28.1.0'
   * });
   * const sendall = await bob.sendAll({
   *    recipients: [
   *      'bc1q09vm5lfy0j5reeulh4x5752q25uqqvz34hufdl',
   *      'bc1q02ad21edsxd23d32dfgqqsz4vv4nmtfzuklhy3'
   *    ],
   *     options: { fee_rate: 1.1 }
   * });
   */
  public async sendAll(params: SendAllParams): Promise<SendAllResult> {
    return await this.command([{ method: 'sendall', parameters: [params] }]);
  }

  /**
   * TODO: Comments
   */
  public async sendMany(params: SendManyParams): Promise<string> {
    return await this.command([{ method: 'sendmany', parameters: [params] }]);
  }

  /**
   * Get detailed information about in-wallet transaction <txid>.
   * @param txid: The transaction id. (string, required)
   * @param {boolean} include_watchonly Whether to include watch-only addresses in balance calculation and details.
   * @returns {WalletTransaction} A promise resolving to a {@link WalletTransaction} object.
   */
  public async getTransaction(txid: string, include_watchonly?: boolean): Promise<WalletTransaction> {
    return await this.command([{ method: 'gettransaction', parameters: [txid, include_watchonly] }]);
  }

  /**
   * Get detailed information about a transaction.
   *
   * By default, this call only returns a transaction if it is in the mempool. If -txindex is enabled
   * and no blockhash argument is passed, it will return the transaction if it is in the mempool or any block.
   * If a blockhash argument is passed, it will return the transaction if the specified block is available and
   * the transaction is in that block.
   * @async
   * @param {string} txid The transaction id (required).
   * @param {?VerbosityLevel} verbosity Response format: 0 (hex), 1 (json) or 2 (jsonext).
   * @param {?string} blockhash The block in which to look for the transaction (optional).
   * @returns {GetRawTransaction} A promise resolving to data about a transaction in the form specified by verbosity.
   */
  public async getRawTransaction(txid: string, verbosity?: VerbosityLevel, blockhash?: string): Promise<RawTransactionResponse> {
    // Get the raw transaction
    const rawTransaction = await this.command([{ method: 'getrawtransaction', parameters: [txid, verbosity ?? 2, blockhash] }]);
    // Return the raw transaction based on verbosity
    switch(verbosity) {
      case 0:
        return rawTransaction as RawTransactionV0;
      case 1:
        return rawTransaction as RawTransactionV1;
      case 2:
        return rawTransaction as RawTransactionV2;
      default:
        return rawTransaction as RawTransactionV2;
    }
  }

  /**
   * Get detailed information about multiple transactions. An extension of {@link getRawTransaction}.
   *
   * @async
   * @param {Array<string>} txids An array of transaction ids.
   * @param {?VerbosityLevel} verbosity Response format: 0 (hex), 1 (json) or 2 (jsonext).
   * @returns {Promise<Array<RawTransactionResponse>>}
   */
  public async getRawTransactions(txids: string[], verbosity?: VerbosityLevel): Promise<RawTransactionResponse[]> {
    return await Promise.all(
      txids.map(
        async (txid) => await this.getRawTransaction(txid, verbosity ?? 2)
      )
    );
  }

  clearBanned(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  disconnectNode(address?: string, nodeid?: number): Promise<void> {
    throw new Error('Method not implemented.' + address + nodeid);
  }

  dumpPrivKey(address: string): Promise<string> {
    throw new Error('Method not implemented.' + address);
  }

  dumpWallet(filename: string): Promise<{ filename: string; }> {
    throw new Error('Method not implemented.' + filename);
  }

  encryptWallet(passphrase: string): Promise<void> {
    throw new Error('Method not implemented.' + passphrase);
  }

  estimateSmartFee(conf_target: number, estimate_mode?: FeeEstimateMode): Promise<{ feerate?: number; errors?: string[]; blocks?: number; }> {
    throw new Error('Method not implemented.' + conf_target + estimate_mode);
  }

  getConnectionCount(): Promise<number> {
    throw new Error('Method not implemented.');
  }

  getDifficulty(): Promise<number> {
    throw new Error('Method not implemented.');
  }

  getMempoolInfo(): Promise<MempoolInfo> {
    throw new Error('Method not implemented.');
  }

  getMiningInfo(): Promise<MiningInfo> {
    throw new Error('Method not implemented.');
  }

  getPeerInfo(): Promise<PeerInfo[]> {
    throw new Error('Method not implemented.');
  }

  walletLock(passphrase: string, timeout: number): Promise<void> {
    throw new Error('Method not implemented.' + passphrase + timeout);
  }
}