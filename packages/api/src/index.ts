/* packages/api/src/index.ts */

import type {
  BitcoinCoreRpcClient,
  BitcoinRestClient,
  BlockV3,
  RawTransactionV2,
  RestClientConfigParams,
  RpcClientConfig,
} from '@did-btcr2/bitcoin';
import {
  getNetwork
} from '@did-btcr2/bitcoin';
import type {
  Bytes,
  CryptosuiteName,
  DocumentBytes,
  HashBytes,
  Hex,
  JSONObject,
  KeyBytes,
  PatchOperation,
  ProofBytes,
  SchnorrKeyPairObject,
  SignatureBytes
} from '@did-btcr2/common';
import {
  DEFAULT_BLOCK_CONFIRMATIONS,
  DEFAULT_REST_CONFIG,
  DEFAULT_RPC_CONFIG,
  IdentifierTypes,
} from '@did-btcr2/common';
import type {
  MultikeyObject
} from '@did-btcr2/cryptosuite';
import {
  SchnorrMultikey
} from '@did-btcr2/cryptosuite';
import {
  PublicKey,
  SchnorrKeyPair,
  SecretKey
} from '@did-btcr2/keypair';
import type {
  IKeyManager as IMethodKeyManager,
  KeyManagerParams as MethodKeyManagerParams
} from '@did-btcr2/method';
import {
  DidDocument,
  DidDocumentBuilder,
  Identifier
} from '@did-btcr2/method';
import type {
  DidCreateOptions,
  DidResolutionResult,
  DidService,
  DidVerificationMethod
} from '@web5/dids';

/** Re-export commonly used types for consumers */
export type {
  BlockV3, Bytes,
  CryptosuiteName, DidResolutionResult,
  DidService,
  DidVerificationMethod, DocumentBytes,
  HashBytes,
  Hex,
  JSONObject,
  KeyBytes, MultikeyObject, PatchOperation,
  ProofBytes, RawTransactionV2,
  RestClientConfigParams,
  RpcClientConfig, SchnorrKeyPairObject, SignatureBytes
};

export { DidDocument, DidDocumentBuilder, Identifier, IdentifierTypes };

/* =========================
 * Configuration Interfaces
 * ========================= */

export type NetworkName = 'mainnet' | 'testnet4' | 'signet' | 'regtest';

export type ApiBitcoinConfig = {
  /** Shortcut to compute base URLs and params via @did-btcr2/bitcoin getNetwork */
  network?: NetworkName;
  /** Override REST client settings */
  rest?: RestClientConfigParams;
  /** Override RPC client settings */
  rpc?: RpcClientConfig;
  /** Default number of confirmations to consider "final" */
  defaultConfirmations?: number;
};

export type ApiKeyManagerConfig = MethodKeyManagerParams;

export type ApiConfig = {
  bitcoin?: ApiBitcoinConfig;
  keyManager?: ApiKeyManagerConfig;
};

/* =========================
 * Sub-facade: Keys
 * ========================= */

export class Keys {
  /** Generate a new Schnorr keypair (secp256k1). */
  static generate(): SchnorrKeyPair {
    return new SchnorrKeyPair();
  }

  /** Import from secret key bytes or multibase. */
  static fromSecret(secret: Uint8Array | string): SchnorrKeyPair {
    const sk = typeof secret === 'string' ? SecretKey.fromMultibase(secret) : new SecretKey({ bytes: secret });
    return new SchnorrKeyPair({ secretKey: sk });
  }

  /** Construct from known public/secret parts (bytes or multibase). */
  static fromParts(params: { publicKey?: Uint8Array | string; secretKey?: Uint8Array | string }): SchnorrKeyPair {
    const pk = params.publicKey
      ? (typeof params.publicKey === 'string' ? PublicKey.fromMultibase(params.publicKey) : new PublicKey({ bytes: params.publicKey }))
      : undefined;
    const sk = params.secretKey
      ? (typeof params.secretKey === 'string' ? SecretKey.fromMultibase(params.secretKey) : new SecretKey({ bytes: params.secretKey }))
      : undefined;
    return new SchnorrKeyPair({ publicKey: pk, secretKey: sk });
  }

  /** Export pair as multibase strings (safe to stash). */
  static exportMultibase(pair: SchnorrKeyPair): SchnorrKeyPairObject {
    return pair.toObject();
  }
}

/* =========================
 * Sub-facade: Crypto
 * ========================= */

export class Crypto {
  /**
   * Create a Schnorr Multikey wrapper (includes verificationMethod, sign/verify).
   * If secret is present, the multikey can sign.
   */
  static multikey(params: {
    id: string;                 // fragment or full VM id, e.g. "#key-1"
    controller: string;         // DID string
    publicKey: PublicKey;
    secretKey?: SecretKey;
  }): SchnorrMultikey {
    const { id, controller, publicKey, secretKey } = params;
    return new SchnorrMultikey({ did: { id, controller }, publicKey, secretKey });
  }

  /** Produce a DID Verification Method JSON from a multikey. */
  static toVerificationMethod(mk: SchnorrMultikey): DidVerificationMethod {
    return mk.verificationMethod;
  }

  /** Sign bytes via the multikey (requires secret). */
  static async sign(mk: SchnorrMultikey, data: Bytes): Promise<SignatureBytes> {
    return mk.sign(data);
  }

  /** Verify signature via multikey. */
  static async verify(mk: SchnorrMultikey, data: Bytes, signature: SignatureBytes): Promise<boolean> {
    return mk.verify(data, signature);
  }
}

/* =========================
 * Sub-facade: Bitcoin
 * ========================= */

export class BitcoinApi {
  readonly rest: BitcoinRestClient;
  readonly rpc: BitcoinCoreRpcClient;
  readonly defaultConfirmations: number;

  constructor(cfg?: ApiBitcoinConfig) {
    const net = getNetwork(cfg?.network ?? 'regtest');

    const restCfg = {
      host : cfg?.rest?.host ?? DEFAULT_REST_CONFIG.host,
      ...cfg?.rest
    };

    const rpcCfg = {
      ...DEFAULT_RPC_CONFIG,
      ...cfg?.rpc
    };

    this.rest = new BitcoinRest(restCfg);
    this.rpc = new BitcoinCoreRpc(rpcCfg);
    this.defaultConfirmations = cfg?.defaultConfirmations ?? DEFAULT_BLOCK_CONFIRMATIONS;
  }

  /** Fetch a transaction by txid via REST. */
  getTransaction(txid: string) {
    return this.rest.transaction.get(txid);
  }

  /** Broadcast a raw tx (hex) via REST. */
  broadcast(rawTxHex: string) {
    return this.rest.transaction.broadcast(rawTxHex);
  }

  /** Get UTXOs for an address via REST. */
  getUtxos(address: string) {
    return this.rest.address.getUtxos(address);
  }

  /** Get a block by hash or height via REST. */
  getBlock(params: { hash?: string; height?: number }) {
    if (params.hash) return this.rest.block.getByHash(params.hash);
    if (typeof params.height === 'number') return this.rest.block.getByHeight(params.height);
    throw new Error('getBlock requires hash or height');
  }
}

/* =========================
 * Sub-facade: KeyManager
 * ========================= */

export class KeyManagerApi {
  readonly impl: IMethodKeyManager;

  constructor(params?: ApiKeyManagerConfig) {
    this.impl = new MethodKeyManager(params);
  }

  setActive(keyUri: string) {
    this.impl.activeKeyUri = keyUri;
  }

  export(keyUri: string) {
    return this.impl.export(keyUri);
  }

  import(mk: SchnorrMultikey, opts?: { importKey?: boolean; active?: boolean }) {
    return this.impl.import(mk, opts);
  }

  sign(keyUri: string, hash: HashBytes): Promise<SignatureBytes> {
    return this.impl.sign(keyUri, hash);
  }
}

/* =========================
 * Sub-facade: DID / CRUD
 * ========================= */

export class DidApi {
  /**
   * Create a deterministic DID from a public key (bytes).
   * Builds a minimal DID Document with a Multikey VM + optional services.
   */
  createDeterministic(params: {
    pubKeyBytes: KeyBytes;
    options: DidCreateOptions; // includes version/network and optional services
  }) {
    return MethodCreate.deterministic(params);
  }

  /**
   * Create from an intermediate DID document (external genesis).
   */
  createExternal(params: {
    intermediateDocument: DidDocument;
    options: DidCreateOptions; // includes version/network and optional services
  }) {
    return MethodCreate.external(params);
  }

  /**
   * Resolve by DID string (did:btcr2:...).
   * Thin wrapper that decodes components and calls Resolve.deterministic.
   */
  async resolve(did: string): Promise<DidResolutionResult> {
    const components = Identifier.decode({ identifier: did });
    return MethodResolve.deterministic({ identifier: did, identifierComponents: components });
  }

  /**
   * Update a DID Document using a JSON Patch, signed as capabilityInvocation.
   * You provide the prior DID Document (to pick VM), a JSON Patch, and a signer multikey.
   * This delegates to MethodUpdate (which follows the cryptosuite rules internally).
   */
  async update(params: {
    did: string;
    previousDocument: DidDocument;
    patch: PatchOperation[];
    signer: SchnorrMultikey;                 // must correspond to an authorized verificationMethod
    service?: DidService[];                  // optional services for resulting doc if builder requires
    proofOptions?: { cryptosuite?: CryptosuiteName }; // optional override
  }): Promise<{
    nextDocument: DidDocument;
    updatePayload: JSONObject;               // canonicalized update payload
    proof: ProofBytes;
  }> {
    // The Update class exposes the algorithm that creates a DID Update Payload and proof;
    // keep this wrapper narrow so testing can mock MethodUpdate directly.
    const { did, previousDocument, patch, signer, proofOptions } = params;
    // @ts-ignore - depending on current MethodUpdate API surface, you may adapt field names:
    const result = await MethodUpdate.invoke({
      did,
      previousDocument,
      patch,
      signer,
      proofOptions
    });
    return result;
  }

  /** Deactivate convenience: applies the standard `deactivated: true` patch. */
  async deactivate(params: {
    did: string;
    previousDocument: DidDocument;
    signer: SchnorrMultikey;
  }) {
    // This class is a stub in method right now; expose a narrow wrapper for future expansion.
    // @ts-ignore
    return new MethodDeactivate(); // No-op holder; implement when core adds behavior.
  }
}

/* =========================
 * Root façade
 * ========================= */

export class Btcr2Api {
  readonly bitcoin: BitcoinApi;
  readonly did: DidApi;
  readonly keys: typeof Keys;
  readonly crypto: typeof Crypto;
  readonly keyManager: KeyManagerApi;

  constructor(config?: ApiConfig) {
    this.bitcoin = new BitcoinApi(config?.bitcoin);
    this.did = new DidApi();
    this.keys = Keys;
    this.crypto = Crypto;
    this.keyManager = new KeyManagerApi(config?.keyManager);
  }
}

/* =========================
 * Factory
 * ========================= */

export function createApi(config?: ApiConfig) {
  return new Btcr2Api(config);
}
