import {
  AddMultiSigAddressParams,
  BatchOption,
  BlockResponse,
  BumpFeeOption,
  BumpFeeResult,
  ChainInfo,
  CreateMultiSigResult,
  CreateRawTxInputs,
  CreateRawTxOutputs,
  CreateWalletParams,
  CreateWalletResult,
  DecodedRawTransaction,
  FeeEstimateMode,
  FundRawTxOptions,
  GetBlockParams,
  MempoolInfo,
  MiningInfo,
  PeerInfo,
  RawTransactionResponse,
  ScriptDecoded,
  ValidateAddressResult
} from './types.js';

/**
 * Interface for the Bitcoin Core RPC client.
 */
export interface IBitcoinRpc {
    /** Executes multiple commands in a batch request. */
    command?<R extends ReturnType<any>>(methods: BatchOption[]): Promise<ReadonlyArray<R>>;

    /** Marks a transaction and its in-wallet descendants as abandoned, allowing their inputs to be respent. */
    abandonTransaction(txid: string): Promise<void>;

    /** Stops the current wallet rescan triggered by an RPC call, such as by an importprivkey call. */
    abortRescan(): Promise<void>;

    /** Adds a multi-signature address with n required signatures and a set of keys. */
    addMultiSigAddress({ nrequired, keys, account }: AddMultiSigAddressParams): Promise<string>;

    /** Adds a witness address for SegWit compatibility. */
    addWitnessAddress(address: string): Promise<void>;

    /** Backs up the wallet file to a specified destination. */
    backupWallet(destination: string): Promise<void>;

    /** Increases the fee of an unconfirmed transaction to improve its confirmation time. */
    bumpFee(txid: string, options?: BumpFeeOption): Promise<BumpFeeResult>;

    /** Removes all banned nodes from the ban list. */
    clearBanned(): Promise<void>;

    /** Combines multiple raw transactions into a single transaction. */
    combineRawTransaction(txs: string[]): Promise<string>;

    /** Creates a multi-signature address with n required signatures and a set of keys. */
    createMultiSig(nrequired: number, keys: string[]): Promise<CreateMultiSigResult>;

    /** Creates a raw transaction spending specified inputs to specified outputs. */
    createRawTransaction(inputs: CreateRawTxInputs[], outputs: CreateRawTxOutputs[], locktime?: number, replacable?: boolean): Promise<string>;

    /** Creates a new wallet with various optional parameters. */
    createWallet({
      wallet_name,
      disable_private_keys,
      blank,
      passphrase,
      avoid_reuse,
      descriptors,
      load_on_startup,
    }: CreateWalletParams): Promise<CreateWalletResult>;

    /** Decodes a raw transaction hex string. */
    decodeRawTransaction(hexstring: string): Promise<DecodedRawTransaction>;

    /** Decodes a hex-encoded script. */
    decodeScript(hexstring: string): Promise<ScriptDecoded>;

    /** Disconnects a node by address or node ID. */
    disconnectNode(address?: string, nodeid?: number): Promise<void>;

    /** Reveals the private key corresponding to an address. */
    dumpPrivKey(address: string): Promise<string>;

    /** Dumps all wallet keys and metadata to a file. */
    dumpWallet(filename: string): Promise<{ filename: string }>;

    /** Encrypts the wallet with a passphrase. */
    encryptWallet(passphrase: string): Promise<void>;

    /** Estimates the fee rate for a given confirmation target. */
    estimateSmartFee(
        conf_target: number,
        estimate_mode?: FeeEstimateMode,
    ): Promise<{ feerate?: number; errors?: string[]; blocks?: number }>;

    /** Funds a raw transaction by adding necessary inputs and change. */
    fundRawTransaction(
        hexstring: string,
        options: FundRawTxOptions,
    ): Promise<{ hex: string; fee: number; changepos: number }>;

    /** Returns the number of blocks in the longest blockchain. */
    getBlockCount(): Promise<number>;

    /** Gets the hash of a block at a given height. */
    getBlockHash(height: number): Promise<string>;

    /** Gets detailed information about a specific block. */
    getBlock({ blockhash, height, verbosity }: GetBlockParams): Promise<BlockResponse | undefined>

    /** Retrieves general blockchain state info. */
    getBlockchainInfo(): Promise<ChainInfo>;

    /** Gets the number of active connections to other nodes. */
    getConnectionCount(): Promise<number>;

    /** Gets the estimated network difficulty. */
    getDifficulty(): Promise<number>;

    /** Retrieves memory pool statistics. */
    getMempoolInfo(): Promise<MempoolInfo>;

    /** Retrieves mining statistics. */
    getMiningInfo(): Promise<MiningInfo>;

    /** Gets a new Bitcoin address for receiving payments. */
    getNewAddress(account?: string): Promise<string>;

    /** Gets detailed peer connection information. */
    getPeerInfo(): Promise<PeerInfo[]>;

    /** Sends raw transaction hex to the Bitcoin network. */
    sendRawTransaction(
      hexstring: string,
      maxfeerate?: number | string,
      maxBurnAmount?: number | string
    ): Promise<string>;

    /** Sends bitcoins to a specified address. */
    sendToAddress(
        address: string,
        amount: number,
        comment?: string,
        comment_to?: string,
        subtreactfeefromamount?: boolean,
        replaceable?: boolean,
        conf_target?: number,
        estimate_mode?: FeeEstimateMode,
    ): Promise<RawTransactionResponse>;

    /** Validates a Bitcoin address. */
    validateAddress(address: string): Promise<ValidateAddressResult>;

    /** Verifies a signed message. */
    verifyMessage(address: string, signature: string, message: string): Promise<boolean>;

    /** Locks the wallet, requiring a passphrase to unlock. */
    walletLock(passphrase: string, timeout: number): Promise<void>;
}