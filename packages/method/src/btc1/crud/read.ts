import {
  BitcoinNetworkNames,
  Btc1Error,
  Btc1IdentifierHrp,
  Btc1ReadError,
  DidUpdatePayload,
  ID_PLACEHOLDER_VALUE,
  INVALID_DID,
  INVALID_DID_DOCUMENT,
  INVALID_DID_UPDATE,
  LATE_PUBLISHING_ERROR,
  Logger,
  UnixTimestamp
} from '@did-btc1/common';
import { Cryptosuite, DataIntegrityProof, SchnorrMultikey } from '@did-btc1/cryptosuite';
import { PublicKey } from '@did-btc1/keypair';
import { bytesToHex } from '@noble/hashes/utils';
import { GENESIS_TX_ID, TXIN_WITNESS_COINBASE } from '../../bitcoin/constants.js';
import bitcoinNetwork, { Bitcoin } from '../../bitcoin/index.js';
import { getNetwork } from '../../bitcoin/network.js';
import BitcoinRest, { RawTransactionRest } from '../../bitcoin/rest-client.js';
import BitcoinRpc from '../../bitcoin/rpc-client.js';
import { DidBtc1 } from '../../did-btc1.js';
import { DidResolutionOptions } from '../../interfaces/crud.js';
import { BeaconService, BeaconServiceAddress, BeaconSignal } from '../../interfaces/ibeacon.js';
import { BlockV3, RawTransactionV2 } from '../../types/bitcoin.js';
import {
  CIDAggregateSidecar,
  SidecarData,
  SignalsMetadata,
  SingletonSidecar,
  SMTAggregateSidecar
} from '../../types/crud.js';
import { Btc1Appendix, DidComponents } from '../../utils/appendix.js';
import { BeaconUtils } from '../../utils/beacons.js';
import { Btc1DidDocument } from '../../utils/did-document.js';
import { BeaconFactory } from '../beacon/factory.js';

export type FindNextSignalsRestParams = {
  connection: BitcoinRest;
  beaconSignals: Array<BeaconSignal>;
  block: BlockV3;
  beacons: Array<BeaconServiceAddress>;
}
export type BeaconSignals = Array<BeaconSignal>;
export type BitcoinClient = BitcoinRpc | BitcoinRest;

export type NetworkVersion = {
  version?: string;
  network?: string;
};
export type ResolveInitialDocument = {
  identifier: string;
  components: DidComponents;
  options: DidResolutionOptions;
};

// Deterministic
export interface Btc1ReadDeterministic {
  components: DidComponents;
  identifier: string;
};

// External
export interface Btc1ReadExternal {
  components: DidComponents;
  identifier: string;
  options: DidResolutionOptions;
}
export interface Btc1ReadSidecar {
  components: DidComponents;
  initialDocument: Btc1DidDocument;
};
export interface DidReadCas {
  identifier: string;
  components: DidComponents;
}

// Methods
export interface ApplyDidUpdateParams {
  contemporaryDidDocument: Btc1DidDocument;
  update: DidUpdatePayload;
}

export interface TargetDocumentParams {
  initialDocument: Btc1DidDocument;
  options: DidResolutionOptions;
};

export interface TargetBlockheightParams {
  network: BitcoinNetworkNames;
  targetTime?: UnixTimestamp;
}

/**
 * Implements {@link https://dcdpr.github.io/did-btc1/#read | 4.2 Read}.
 * The read operation is executed by a resolver after a resolution request identifying a specific did:btc1 identifier is
 * received from a client at Resolution Time. The request MAY contain a resolutionOptions object containing additional
 * information to be used in resolution. The resolver then attempts to resolve the DID document of the identifier at a
 * specific Target Time. The Target Time is either provided in resolutionOptions or is set to the Resolution Time of the
 * request.
 * To do so it executes the following algorithm:
 *  1. Let identifierComponents be the result of running the algorithm
 *     in Parse did:btc1 identifier, passing in the identifier.
 *  2. Set initialDocument to the result of running Resolve Initial Document
 *     passing identifier, identifierComponents and resolutionOptions.
 *  3. Set targetDocument to the result of running the algorithm in Resolve
 *     Target Document passing in initialDocument and resolutionOptions.
 *  4. Return targetDocument.
 *
 * @class Btc1Read
 * @type {Btc1Read}
 */
export class Btc1Read {
  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#deterministically-generate-initial-did-document | 4.2.2.1 Deterministically Generate Initial DID Document}.
   *
   * The Deterministically Generate Initial DID Document algorithm deterministically generates an initial DID
   * Document from a secp256k1 public key. It takes in a did:btc1 identifier and a identifierComponents object and
   * returns an initialDocument.
   *
   * @param {Btc1ReadDeterministic} params See {@link Btc1ReadDeterministic} for details.
   * @param {string} params.identifier The did-btc1 version.
   * @param {DidComponents} params.components The name of the bitcoin network (mainnet, testnet, regtest).
   * @returns {Btc1DidDocument} The resolved DID Document object.
   */
  public static deterministic({ identifier, components }: {
    identifier: string;
    components: DidComponents;
  }): Btc1DidDocument {
    // Deconstruct the components
    const { network, genesisBytes } = components;

    // Construct a new PublicKey and deconstruct the publicKey and publicKeyMultibase
    const { compressed: publicKey, multibase: publicKeyMultibase } = new PublicKey(genesisBytes);

    // Generate the service field for the DID Document
    const service = BeaconUtils.generateBeaconServices({
      identifier,
      publicKey,
      network : getNetwork(network),
      type    : 'SingletonBeacon',
    });

    return new Btc1DidDocument({
      id                 : identifier,
      controller         : [identifier],
      verificationMethod : [{
        id                 : `${identifier}#initialKey`,
        type               : 'Multikey',
        controller         : identifier,
        publicKeyMultibase : publicKeyMultibase.address
      }],
      service
    });
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#external-resolution | 4.2.2.2 External Resolution}.
   *
   * The External Resolution algorithm externally retrieves an intermediateDocumentRepresentation, either by retrieving
   * it from {@link https://dcdpr.github.io/did-btc1/#def-content-addressable-storage | Content Addressable Storage (CAS)}
   * or from the {@link https://dcdpr.github.io/did-btc1/#def-sidecar-data | Sidecar Data} provided as part of the
   * resolution request. It takes in a did:btc1 identifier, a identifierComponents object and a resolutionOptions object.
   * It returns an initialDocument, which is a conformant DID document validated against the identifier.
   *
   * @param {Btc1ReadExternal} params Required params for calling the external method.
   * @param {string} params.identifier The DID to be resolved.
   * @param {DidComponents} params.components The components of the identifier.
   * @param {DidResolutionOptions} params.options The options for resolving the DID Document.
   * @param {Btc1DidDocument} params.options.sidecarData The sidecar data for resolving the DID Document.
   * @param {Btc1DidDocument} params.options.sidecarData.initialDocument The offline user-provided DID Document
   * @returns {Btc1DidDocument} The resolved DID Document object
   */
  public static async external({ identifier, components, options }: {
    identifier: string;
    components: DidComponents;
    options: DidResolutionOptions;
  }): Promise<Btc1DidDocument> {
    // Deconstruct the options
    const { initialDocument: document } = options.sidecarData as CIDAggregateSidecar;

    // 1. If resolutionOptions.sidecarData.initialDocument is not null, set initialDocument to the result of passing
    //    identifier, identifierComponents and resolutionOptions.sidecarData.initialDocument into algorithm Sidecar
    //    Initial Document Validation.
    // 2. Else set initialDocument to the result of passing identifier and identifierComponents to the CAS Retrieval algorithm.
    const initialDocument = document
      ? await this.sidecar({ components, initialDocument: document })
      : await this.cas({ identifier, components });

    // 3. Validate initialDocument is a conformant DID document according to the DID Core 1.1 specification. Else MUST
    //    raise invalidDidDocument error.
    Btc1DidDocument.validate(initialDocument);

    // 4. Return initialDocument.
    return initialDocument;
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#sidecar-initial-document-validation | 4.2.2.2.1 Sidecar Initial Document Validation}.
   *
   * The Sidecar Initial Document Validation algorithm validates an initialDocument against its identifier, by first
   * constructing the intermediateDocumentRepresentation and verifying the hash of this document matches the bytes
   * encoded within the identifier. It takes in a did:btc1 identifier, identifierComponents and a
   * initialDocument. It returns the initialDocument if validated, otherwise it throws an error.
   *
   * @param {Btc1ReadSidecar} params Required params for calling the sidecar method
   * @param {string} params.identifier The DID to be resolved
   * @param {DidComponents} params.components The components of the DID identifier
   * @param {Btc1DidDocument} params.initialDocument The initial DID Document provided by the user
   * @returns {Btc1DidDocument} The resolved DID Document object
   * @throws {DidError} InvalidDidDocument if genesisBytes !== initialDocument hashBytes
   */
  public static async sidecar({ components, initialDocument }: Btc1ReadSidecar): Promise<Btc1DidDocument> {
    // Replace the placeholder did with the identifier throughout the initialDocument.
    const intermediateDocument = JSON.parse(
      JSON.stringify(initialDocument).replaceAll(initialDocument.id, ID_PLACEHOLDER_VALUE)
    );

    // Canonicalize and sha256 hash the intermediateDocument
    const hashBytes = await JSON.canonicalization.process(intermediateDocument, 'hex');

    // Compare the genesisBytes to the hashBytes
    const genesisBytes = bytesToHex(components.genesisBytes);

    // If the genesisBytes do not match the hashBytes, throw an error
    if (genesisBytes !== hashBytes) {
      throw new Btc1Error(
        `Initial document mismatch: genesisBytes ${genesisBytes} !== hashBytes ${hashBytes}`,
        INVALID_DID_DOCUMENT, { genesisBytes, hashBytes }
      );
    }

    // Return a W3C conformant DID Document
    return new Btc1DidDocument(initialDocument);
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#cas-retrieval | 4.2.2.2.2 CAS Retrieval}.
   *
   * The CAS Retrieval algorithm attempts to retrieve an initialDocument from a Content Addressable Storage (CAS) system
   * by converting the bytes in the identifier into a Content Identifier (CID). It takes in an identifier and
   * an identifierComponents object. It returns an initialDocument.
   *
   * @param {DidReadCas} params Required params for calling the cas method
   * @param {string} params.identifier BTC1 DID used to resolve the DID Document
   * @param {DidComponents} params.components BTC1 DID components used to resolve the DID Document
   * @returns {Btc1DidDocument} The resolved DID Document object
   * @throws {Btc1Error} if the DID Document content is invalid
   */
  public static async cas({ identifier, components }: DidReadCas): Promise<Btc1DidDocument> {
    // 1. Set hashBytes to identifierComponents.genesisBytes.
    const hashBytes = components.genesisBytes;

    // 3. Set intermediateDocumentRepresentation to the result of fetching the cid against a Content Addressable Storage
    //    (CAS) system such as IPFS.
    const intermediateDocument = await Btc1Appendix.fetchFromCas(hashBytes);

    // Validate the intermediateDocument is not null and is parsable JSON
    if (!intermediateDocument || !JSON.parsable(intermediateDocument)) {
      throw new Btc1Error(INVALID_DID_DOCUMENT, 'Invalid DID Document content', { intermediateDocument });
    }
    // 5. Replace the placeholder did with the identifier throughout the initialDocument.
    const initialDocument = JSON.parse(
      intermediateDocument.replaceAll(ID_PLACEHOLDER_VALUE, identifier)
    );

    // 6. Return initialDocument.
    return new Btc1DidDocument(initialDocument);
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#resolve-initial-document | 4.2.2 Resolve Initial Document}.
   *
   * This algorithm resolves an initial DID document and validates it against the identifier for a specific did:btc1.
   * The algorithm takes in a did:btc1 identifier, identifier components object, resolutionsOptions object and returns
   * a valid initialDocument for that identifier.
   *
   * @public
   * @param {ResolveInitialDocument} params See {@link ResolveInitialDocument} for parameter details.
   * @param {string} params.identifier The DID to be resolved.
   * @param {DidComponents} params.components The components of the identifier.
   * @param {DidResolutionOptions} params.options See {@link DidResolutionOptions} for resolving the DID Document.
   * @returns {Promise<Btc1DidDocument>} The resolved DID Document object.
   * @throws {DidError} if the DID hrp is invalid, no sidecarData passed and hrp = "x".
   */
  public static async initialDocument({ identifier, components, options }: {
    identifier: string;
    components: DidComponents;
    options: DidResolutionOptions
  }): Promise<Btc1DidDocument> {
    // Deconstruct the hrp from the components
    const hrp = components.hrp;

    // Validate the hrp is either 'k' or 'x'
    if (!(hrp in Btc1IdentifierHrp)) {
      throw new Btc1Error(`Invalid DID hrp ${hrp}`, INVALID_DID, { hrp });
    }

    //  Make sure options.sidecarData is not null if hrp === x
    if (hrp === Btc1IdentifierHrp.x && !options.sidecarData) {
      throw new Btc1Error('External resolution requires sidecar data', INVALID_DID, options);
    }

    return hrp === Btc1IdentifierHrp.k
      ? this.deterministic({ identifier, components })
      : await this.external({ identifier, components, options });

  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#resolve-target-document | 4.2.3 Resolve Target Document}.
   *
   * The Resolve Target Document algorithm resolves a DID document from an initial document by walking the Bitcoin
   * blockchain to identify Beacon Signals that announce DID Update Payloads applicable to the did:btc1 identifier being
   * resolved. It takes as inputs initialDocument, resolutionOptions and network. It returns a valid DID document.
   *
   * @public
   * @param {TargetDocumentParams} params See {@link TargetDocumentParams} for details.
   * @param {Btc1DidDocument} params.initialDocument The initial DID Document to resolve
   * @param {ResolutionOptions} params.options See {@link DidResolutionOptions} for details.
   * @returns {Btc1DidDocument} The resolved DID Document object with a validated single, canonical history
   */
  public static async targetDocument({ initialDocument, options }: {
    initialDocument: Btc1DidDocument;
    options: DidResolutionOptions;
  }): Promise<Btc1DidDocument> {
    // Set the network from the options or default to mainnet
    const network = options.network ?? BitcoinNetworkNames.bitcoin;

    // If options.versionId is not null, set targetVersionId to options.versionId
    const targetVersionId = options.versionId;

    // If options.versionTime is not null, set targetTime to options.versionTime
    const targetTime = options.versionTime ?? -1;

    // Set the targetBlockheight to the result of passing targetTime to the algorithm Determine Target Blockheight
    // const targetBlockHeight = await this.determineTargetBlockHeight({ network, targetTime });

    // Get signalsMetadata from sidecarData if it exists
    const signalsMetadata = (options.sidecarData as SingletonSidecar)?.signalsMetadata;

    // Set currentVersionId to 1
    const currentVersionId = 1;

    // 6. If the targetVersionId equals currentVersionId, return initialDocument
    if (targetVersionId === currentVersionId) {
      return new Btc1DidDocument(initialDocument);
    }

    if (!targetTime || targetTime < 0) {
      throw new Btc1ReadError('Must provide a valid targetTime', 'INVALID_TARGET_TIME', { targetTime });
    }
    // 10. Set targetDocument to the result of calling the Traverse Blockchain History algorithm passing in
    //     contemporaryDidDocument, contemporaryBlockheight, currentVersionId, targetVersionId, targetTime,
    //     updateHashHistory, signalsMetadata, and network.
    const targetDocument = this.traverseBlockchainHistory({
      currentVersionId,
      targetVersionId,
      signalsMetadata,
      targetTime,
      contemporaryDidDocument : initialDocument,
      contemporaryBlockHeight : 0,
      updateHashHistory       : new Array(),
      network
    });

    // 11. Return targetDocument.
    return targetDocument;
  }

  /**
   * TODO: Need to finish implementing the traverseBlockchainHistory method
   *
   * Implements {@link https://dcdpr.github.io/did-btc1/#traverse-blockchain-history | 4.2.3.2 Traverse Blockchain History}.
   *
   * The Traverse Blockchain History algorithm traverses Bitcoin blocks, starting from the block with the
   * contemporaryBlockheight, to find beaconSignals emitted by Beacons within the contemporaryDidDocument. Each
   * beaconSignal is processed to retrieve a didUpdatePayload to the DID document. Each update is applied to the
   * document and duplicates are ignored. If the algorithm reaches the block with the blockheight specified by a
   * targetBlockheight, the contemporaryDidDocument at that blockheight is returned assuming a single canonical history
   * of the DID document has been constructed up to that point. It takes in contemporaryDidDocument,
   * contemporaryBlockHeight, currentVersionId, targetVersionId, targetBlockheight, updateHashHistory, signalsMetadata
   * and network. It returns the contemporaryDidDocument once either the targetBlockheight or targetVersionId have been
   * reached.
   *
   * @protected
   * @param {ReadBlockchainParams} params The parameters for the traverseBlockchainHistory operation.
   * @param {Btc1DidDocument} params.contemporaryDidDocument The DID Document at the contemporaryBlockheight.
   * @param {number} params.contemporaryBlockHeight The blockheight of the contemporaryDidDocument.
   * @param {number} params.currentVersionId The current versionId of the DID Document.
   * @param {number} params.targetVersionId The target versionId of the DID Document.
   * @param {number} params.targetTime The target blockheight to resolve the DID Document.
   * @param {boolean} params.updateHashHistory The hash history of the DID Document updates.
   * @param {ResolutionOptions} params.signalsMetadata See {@link SignalsMetadata} for details.
   * @param {BitcoinNetworkNames} params.network The bitcoin network to connect to (mainnet, signet, testnet, regtest).
   * @returns {Promise<Btc1DidDocument>} The resolved DID Document object with a validated single, canonical history.
   */
  protected static async traverseBlockchainHistory({
    contemporaryDidDocument,
    contemporaryBlockHeight,
    currentVersionId,
    targetVersionId,
    targetTime,
    updateHashHistory,
    signalsMetadata,
    network
  }: {
    contemporaryDidDocument: Btc1DidDocument;
    contemporaryBlockHeight: number;
    currentVersionId: number;
    targetVersionId?: number;
    targetTime: number;
    updateHashHistory: string[];
    signalsMetadata: SignalsMetadata;
    network: BitcoinNetworkNames;
  }): Promise<Btc1DidDocument> {
    // 1. Set contemporaryHash to the SHA256 hash of the contemporaryDidDocument
    let contemporaryHash = await JSON.canonicalization.process(contemporaryDidDocument, 'base58');

    // 2. Find all beacons in contemporaryDidDocument: All service in contemporaryDidDocument.services where
    //    service.type equals one of SingletonBeacon, CIDAggregateBeacon and SMTAggregateBeacon Beacon.
    // 3. For each beacon in beacons convert the beacon.serviceEndpoint to a Bitcoin address following BIP21.
    //    Set beacon.address to the Bitcoin address.
    const beacons = BeaconUtils.toBeaconServiceAddress(
      BeaconUtils.getBeaconServices(contemporaryDidDocument)
    );

    // 4. Set nextSignals to the result of calling algorithm Find Next Signals passing in contemporaryBlockheight and
    //    beacons.
    const nextSignals = await this.findNextSignals({ contemporaryBlockHeight, targetTime, beacons, network });
    if (!nextSignals || nextSignals.length === 0) {
      // 5. If nextSignals is null or empty, return contemporaryDidDocument.
      return new Btc1DidDocument(contemporaryDidDocument);
    }

    // 7. Set updates to the result of calling algorithm Process Beacon Signals passing in signals and sidecarData.
    // 8. Set orderedUpdates to the list of updates ordered by the targetVersionId property.
    const orderedUpdates = (
      await Promise.all(
        nextSignals.map(
          async signal => await this.processBeaconSignal(signal, signalsMetadata)
        )
      )
    ).sort((a, b) => a.targetVersionId - b.targetVersionId);

    // 9. For update in orderedUpdates:
    for (let update of orderedUpdates) {
      const updateTargetVersionId = update.targetVersionId;
      // 9.1. If update.targetVersionId is less than or equal to currentVersionId, run Algorithm Confirm Duplicate
      //      Update passing in update, documentHistory, and contemporaryHash.
      if (updateTargetVersionId <= currentVersionId) {
        await this.confirmDuplicateUpdate({ update, updateHashHistory });

        //  9.2. If update.targetVersionId equals currentVersionId + 1:
      } else if (updateTargetVersionId === currentVersionId + 1) {
        // Prepend `z` to the sourceHash if it does not start with it
        const sourceHash = update.sourceHash.startsWith('z') ? update.sourceHash : `z${update.sourceHash}`;

        //  9.2.1. Check that update.sourceHash equals contemporaryHash, else MUST raise latePublishing error.
        if (sourceHash !== contemporaryHash) {
          throw new Btc1ReadError(
            `Hash mismatch: sourceHash ${sourceHash} !== contemporaryHash ${contemporaryHash}`,
            LATE_PUBLISHING_ERROR, { sourceHash: sourceHash, contemporaryHash }
          );
        }

        // 9.2.2. Set contemporaryDidDocument to the result of calling Apply DID Update algorithm passing in
        //        contemporaryDidDocument, update.
        contemporaryDidDocument = await this.applyDidUpdate({ contemporaryDidDocument, update });

        // 9.2.3. Increment currentVersionId.
        currentVersionId++;

        // 9.2.4. If currentVersionId equals targetVersionId return contemporaryDidDocument.
        if (currentVersionId === targetVersionId) {
          return new Btc1DidDocument(contemporaryDidDocument);
        }

        // 9.2.5. Set updateHash to the result of passing update into the JSON Canonicalization and Hash algorithm.
        const updateHash = await JSON.canonicalization.process(update, 'base58');

        // 9.2.6. Push updateHash onto updateHashHistory.
        updateHashHistory.push(updateHash as string);

        // 9.2.7. Set contemporaryHash to result of passing contemporaryDidDocument into the JSON Canonicalization
        //        and Hash algorithm.
        contemporaryHash = await JSON.canonicalization.process(contemporaryDidDocument, 'base58');

        //  9.3. If update.targetVersionId is greater than currentVersionId + 1, MUST throw a LatePublishing error.
      } else if (update.targetVersionId > currentVersionId + 1) {
        throw new Btc1ReadError(
          `Version Id Mismatch: targetVersionId ${update.targetVersionId} cannot be > currentVersionId+1 ${currentVersionId + 1}`,
          'LATE_PUBLISHING_ERROR'
        );
      }
    }

    // 10. If contemporaryBlockheight equals targetBlockheight, return contemporaryDidDocument.
    if (contemporaryBlockHeight === targetTime) {
      return new Btc1DidDocument(contemporaryDidDocument);
    }

    // 13. Return contemporaryDidDocument.
    return new Btc1DidDocument(contemporaryDidDocument);
  }


  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#find-next-signals | 4.2.3.3 Find Next Signals}.
   *
   * The Find Next Signals algorithm finds the next Bitcoin block containing Beacon Signals from one or more of the
   * beacons and retuns all Beacon Signals within that block.
   *
   * It takes the following inputs:
   *  - `contemporaryBlockhieght`: The height of the block this function is looking for Beacon Signals in.
   *                               An integer greater or equal to 0.
   *  - `targetBlockheight`: The height of the Bitcoin block that the resolution algorithm searches for Beacon Signals
   *                         up to. An integer greater or equal to 0.
   *  - `beacons`: An array of Beacon services in the contemporary DID document. Each Beacon contains properties:
   *      - `id`: The id of the Beacon service in the DID document. A string.
   *      - `type`: The type of the Beacon service in the DID document. A string whose values MUST be
   *                          either SingletonBeacon, CIDAggregateBeacon or SMTAggregateBeacon.
   *      - `serviceEndpoint`: A BIP21 URI representing a Bitcoin address.
   *      - `address`: The Bitcoin address decoded from the `serviceEndpoint value.
   *  - `network`: A string identifying the Bitcoin network of the did:btc1 identifier. This algorithm MUST query the
   *               Bitcoin blockchain identified by the network.
   *
   * It returns a nextSignals struct, containing the following properties:
   *  - blockheight: The Bitcoin blockheight for the block containing the Beacon Signals.
   *  - signals: An array of signals. Each signal is a struct containing the following:
   *      - beaconId: The id for the Beacon that the signal was announced by.
   *      - beaconType: The type of the Beacon that announced the signal.
   *      - tx: The Bitcoin transaction that is the Beacon Signal.
   *
   * @public
   * @param {FindNextSignals} params The parameters for the findNextSignals operation.
   * @param {number} params.blockheight The blockheight to start looking for beacon signals.
   * @param {Array<BeaconService>} params.target The target blockheight at which to stop finding signals.
   * @param {Array<BeaconService>} params.beacons The beacons to look for in the block.
   * @returns {Promise<Array<BeaconSignal>>} An array of BeaconSignal objects with blockHeight and signals.
   */
  public static async findNextSignals({ contemporaryBlockHeight, targetTime, beacons }: {
    contemporaryBlockHeight: number;
    targetTime: UnixTimestamp;
    beacons: Array<BeaconServiceAddress>;
    network: BitcoinNetworkNames;
  }): Promise<Array<BeaconSignal>> {
    let height = contemporaryBlockHeight;

    // Toggle RPC or REST connection based on the connection type
    const bitcoin = bitcoinNetwork ?? new Bitcoin();

    // Create an default beaconSignal and beaconSignals array
    let beaconSignals: BeaconSignals = [];

    if (bitcoin.network.rest) {
      return await this.findSignalsRest({ beacons });
    }

    // Use connection to get the block data at the blockhash
    let block = await bitcoin.network.rpc.getBlock({ height }) as BlockV3;

    Logger.info(`Searching for signals, please wait ...`);
    while (block.time <= targetTime) {
      // Iterate over each transaction in the block
      for (const tx of block.tx) {
        // If the txid is a coinbase, continue ...
        if (tx.txid === GENESIS_TX_ID) {
          continue;
        }

        // Iterate over each input in the transaction
        for (const vin of tx.vin) {

          // If the vin is a coinbase transaction, continue ...
          if (vin.coinbase) {
            continue;
          }

          // If the vin txinwitness contains a coinbase identifier, continue ...
          if (vin.txinwitness && vin.txinwitness.length === 1 && vin.txinwitness[0] === TXIN_WITNESS_COINBASE) {
            continue;
          }

          // If the txid from the vin is undefined, continue ...
          if (!vin.txid) {
            continue;
          }

          // If the vout from the vin is undefined, continue ...
          if (vin.vout === undefined) {
            continue;
          }

          // Get the previous output transaction data
          const prevout = await bitcoin.network.rpc.getRawTransaction(vin.txid, 2) as RawTransactionV2;

          // If the previous output vout at the vin.vout index is undefined, continue ...
          if (!prevout.vout[vin.vout]) {
            continue;
          }

          // Get the address from the scriptPubKey from the prevvout (previous output's input at the vout index)
          const scriptPubKey = prevout.vout[vin.vout].scriptPubKey;

          // If the beaconAddress is undefined, continue ...
          if (!scriptPubKey.address) {
            continue;
          }

          // If the beaconAddress from prevvout scriptPubKey is not a beacon service endpoint address, continue ...
          const beaconAddresses = BeaconUtils.getBeaconServiceAddressMap(beacons);
          const beacon = (beaconAddresses.get(scriptPubKey.address) ?? {}) as BeaconServiceAddress;
          if (!beacon || !(beacon.id && beacon.type)) {
            continue;
          }

          // Log the found txid and beacon
          Logger.info(`Tx ${tx.txid} contains beacon address ${scriptPubKey.address}!`, tx);


          // Push the signal object to to signals array
          beaconSignals.push({
            beaconId      : beacon.id,
            beaconType    : beacon.type,
            beaconAddress : beacon.address,
            tx,
            blockheight   : block.height,
            blocktime     : block.time
          });
        };
      }

      height += 1;
      const tip = await bitcoin.network.rpc.getBlockCount();
      if(height > tip) {
        Logger.info(`Chain tip reached ${height}, breaking ...`);
        break;
      }

      // Reset the block to the next block
      block = await bitcoin.network.rpc.getBlock({ height }) as BlockV3;
    }

    return beaconSignals;
  }

  /**
   * Helper method for the {@link findNextSignals | Find Next Signals} algorithm.
   *
   * @param params See {@link FindNextSignalsRestParams} for details.
   * @param {BitcoinClient} params.connection The bitcoin connection to use.
   * @param {Array<BeaconSignal>} params.beaconSignals The beacon signals to process.
   * @param {BlockV3} params.block The block to process.
   * @param {Array<BeaconService>} params.beacons The beacons to process.
   * @returns {Promise<Array<BeaconSignal>>} The beacon signals found in the block.
   */
  public static async findSignalsRest({ beacons }: { beacons: Array<BeaconService>; }): Promise<Array<BeaconSignal>> {
    const bitcoin = bitcoinNetwork ?? new Bitcoin();

    // Empty array of beaconSignals
    const beaconSignals = new Array<BeaconSignal>();

    // Iterate over each beacon
    for (const beacon of BeaconUtils.toBeaconServiceAddress(beacons)) {
      // Get the transactions for the beacon address via REST
      const transactions = await bitcoin.rest.address.getTxs(beacon.address);

      // If no transactions are found, continue
      if (!transactions || transactions.length === 0) {
        continue;
      }

      // Iterate over each transaction and push a beaconSignal
      for (const tx of transactions) {
        for(const vout of tx.vout) {
          if(vout.scriptpubkey_asm.includes('OP_RETURN')) {
            beaconSignals.push({
              beaconId      : beacon.id,
              beaconType    : beacon.type,
              beaconAddress : beacon.address,
              tx,
              blockheight   : tx.status.block_height,
              blocktime     : tx.status.block_time,
            });
          }
        }
      }
    }

    // Return the beaconSignals
    return beaconSignals;
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#process-beacon-signals | 4.2.3.4 Process Beacon Signals}.
   *
   * The Process Beacon Signals algorithm processes each Beacon Signal by attempting to retrieve and validate an
   * announce DID Update Payload for that signal according to the type of the Beacon.
   *
   * It takes as inputs
   *  - `beaconSignals`: An array of Beacon Signals retrieved from the Find Next Signals algorithm. Each signal contains:
   *    - `beaconId`: The id for the Beacon that the signal was announced by.
   *    - `beaconType`: The type of the Beacon that announced the signal.
   *    - `tx`: The Bitcoin transaction that is the Beacon Signal.
   *  - `signalsMetadata`: Maps Beacon Signal Bitcoin transaction ids to a SignalMetadata object containing:
   *    - `updatePayload`: A DID Update Payload which should match the update announced by the Beacon Signal.
   *                       In the case of a SMT proof of non-inclusion, no DID Update Payload may be provided.
   *    - `proofs`: Sparse Merkle Tree proof used to verify that the `updatePayload` exists as the leaf indexed by the
   *                did:btc1 identifier being resolved.
   *
   * It returns an array of {@link https://dcdpr.github.io/did-btc1/#def-did-update-payload | DID Update Payloads}.
   *
   * @public
   * @param {BeaconSignal} signal The beacon signals to process.
   * @param {SignalsMetadata} signalsMetadata The sidecar data for the DID Document.
   * @returns {DidUpdatePayload[]} The updated DID Document object.
   */
  public static async processBeaconSignal(signal: BeaconSignal, signalsMetadata: SignalsMetadata): Promise<DidUpdatePayload> {
    // 1. Set updates to an empty array.
    const updates = new Array<DidUpdatePayload>();

    // 2. For beaconSignal in beaconSignals:
    // 2.1 Set type to beaconSignal.beaconType.
    // 2.2 Set signalTx to beaconSignal.tx.
    // 2.3 Set signalId to signalTx.id.
    const {
      beaconId: id,
      beaconType: type,
      beaconAddress: address,
      tx
    } = signal;
    const signalTx = tx as RawTransactionRest | RawTransactionV2;

    // 2.4 Set signalSidecarData to signalsMetadata[signalId]. TODO: formalize structure of sidecarData
    // const signalSidecarData = new Map(Object.entries(signalsMetadata)).get(id)!;
    // TODO: processBeaconSignal - formalize structure of sidecarData, signalSidecarData

    // 2.6 If type == SingletonBeacon:
    //     2.6.1 Set didUpdatePayload to the result of passing signalTx and signalSidecarData to Process Singleton Beacon Signal algorithm.
    // 2.7 If type == CIDAggregateBeacon:
    //     2.7.1 Set didUpdatePayload to the result of passing signalTx and signalSidecarData to the Process CIDAggregate Beacon Signal algorithm.
    // 2.8 If type == SMTAggregateBeacon:
    //     2.8.1 Set didUpdatePayload to the result of passing signalTx and signalSidecarData to the Process SMTAggregate Beacon Signal algorithm.

    // TODO: processBeaconSignal - where/how to convert signalsMetadata to diff sidecars
    const sidecar = { signalsMetadata } as SidecarData<SingletonSidecar | CIDAggregateSidecar | SMTAggregateSidecar>;
    // switch (type) {
    //   case 'SingletonBeacon': {
    //     sidecar = { signalsMetadata } as SingletonSidecar;
    //     break;
    //   }
    //   case 'CIDAggregateBeacon': {
    //     sidecar = {} as CIDAggregateSidecar;
    //     break;
    //   }
    //   case 'SMTAggregateBeacon': {
    //     sidecar = {} as SMTAggregateSidecar;
    //     break;
    //   }
    //   default: {
    //     throw new Btc1Error('Invalid beacon type', 'INVALID_BEACON_TYPE', { type });
    //   }
    // }

    // Construct a service object from the beaconId and type
    // and set the serviceEndpoint to the BIP21 URI for the Bitcoin address.
    const service = { id, type, serviceEndpoint: `bitcoin:${address}` };

    // Establish a Beacon instance using the service and sidecar
    const beacon = BeaconFactory.establish(service, sidecar);

    // 2.5 Set didUpdatePayload to null.
    const didUpdatePayload = await beacon.processSignal(signalTx, signalsMetadata) ?? null;

    // If the updates is null, throw an error
    if (!didUpdatePayload) {
      throw new Btc1Error('No didUpdatePayload for beacon', 'PROCESS_BEACON_SIGNALS_ERROR', { tx, signalsMetadata });
    }

    // 2.9 If didUpdatePayload is not null, push didUpdatePayload to updates.
    updates.push(didUpdatePayload);

    // 3. Return updates.
    return didUpdatePayload;
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#confirm-duplicate-update | 4.2.3.5 Confirm Duplicate Update}.
   *
   * The Confirm Duplicate Update algorithm takes in a {@link DidUpdatePayload | DID Update Payload} and verifies that
   * the update is a duplicate against the hash history of previously applied updates. The algorithm takes in an update
   * and an array of hashes, updateHashHistory. It throws an error if the update is not a duplicate, otherwise it
   * returns.
   *
   * @public
   * @param {{ update: DidUpdatePayload; updateHashHistory: string[]; }} params Parameters for confirmDuplicateUpdate.
   * @param {DidUpdatePayload} params.update The DID Update Payload to confirm.
   * @param {Array<string>} params.updateHashHistory The history of hashes for previously applied updates.
   * @returns {Promise<void>} A promise that resolves if the update is a duplicate, otherwise throws an error.
   * @throws {DidBtc1Error} if the update hash does not match the historical hash.
   */
  public static async confirmDuplicateUpdate({ update, updateHashHistory }: {
    update: DidUpdatePayload;
    updateHashHistory: string[];
  }): Promise<void> {
    Logger.warn('// TODO: Does this algorithm need `contemporaryHash` passed in?');

    // Hash the update payload
    const updateHash = await JSON.canonicalization.process(update);

    // Get the historical update hash from the updateHashHistory
    const historicalUpdateHash = updateHashHistory[update.targetVersionId - 2];

    // Check if the updateHash matches the historical hash
    if (historicalUpdateHash !== updateHash) {
      throw new Btc1ReadError(`Invalid duplicate: ${updateHash} does not match ${historicalUpdateHash}`, 'LATE_PUBLISHING_ERROR');
    }
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#apply-did-update | 4.2.3.6 Apply DID Update}.
   *
   * This algorithm attempts to apply a DID Update to a DID document, it first verifies the proof on the update is a
   * valid capabilityInvocation of the root authority over the DID being resolved. Then it applies the JSON patch
   * transformation to the DID document, checks the transformed DID document matches the targetHash specified by the
   * update and validates it is a conformant DID document before returning it. This algorithm takes inputs
   * contemporaryDidDocument and an update.
   *
   * @public
   * @param {ApplyDidUpdateParams} params Parameters for applyDidUpdate.
   * @param {Btc1DidDocument} params.contemporaryDidDocument The current DID Document to update.
   * @param {DidUpdatePayload} params.update The DID Update Payload to apply.
   * @param {Bytes} params.genesisBytes The genesis bytes for the DID Document.
   * @returns {Promise<Btc1DidDocument>}
   */
  public static async applyDidUpdate({ contemporaryDidDocument, update }: {
    contemporaryDidDocument: Btc1DidDocument;
    update: DidUpdatePayload;
  }): Promise<Btc1DidDocument> {
    // 1. Set capabilityId to update.proof.capability.
    const capabilityId = update.proof?.capability;
    if (!capabilityId) {
      throw new Btc1ReadError('No capabilityId found in update', INVALID_DID_UPDATE);
    }

    // 2. Set rootCapability to the result of passing capabilityId to the Dereference Root Capability Identifier algorithm.
    const rootCapability = Btc1Appendix.derefernceRootCapabilityIdentifier(capabilityId);

    // 3. If rootCapability.invocationTarget does not equal contemporaryDidDocument.id
    //    and rootCapability.controller does not equal contemporaryDidDocument.id, MUST throw an invalidDidUpdate error.
    const { invocationTarget, controller: rootController } = rootCapability;
    if (![invocationTarget, rootController].every((id) => id === contemporaryDidDocument.id)) {
      throw new Btc1ReadError(`Invalid root capability: ${rootCapability}`, INVALID_DID_UPDATE);
    }

    // 4. Instantiate a bip340-jcs-2025 cryptosuite instance using the key referenced by the verificationMethod field in the update.
    // Get the verificationMethod field from the update.
    const methodId = update.proof?.verificationMethod;
    if(!methodId) {
      throw new Btc1ReadError('No verificationMethod found in update', INVALID_DID_UPDATE, update);
    }

    // Get the verificationMethod from the DID Document using the methodId.
    const { id: vmId, publicKeyMultibase } = DidBtc1.getSigningMethod({ didDocument: contemporaryDidDocument, methodId });

    // Split the vmId by the `#` to get the id and controller.
    const [controller, id] = vmId.split('#');

    // Construct a new Multikey.
    const multikey = SchnorrMultikey.fromPublicKeyMultibase({ id: `#${id}`, controller, publicKeyMultibase });
    // Logger.warn('// TODO: applyDidUpdate - Refactor Multikey to accept pub/priv bytes => Pub/PrivKey => KeyPair.');

    const cryptosuite = new Cryptosuite({ cryptosuite: 'bip340-jcs-2025', multikey });
    // Logger.warn('// TODO: applyDidUpdate - Refactor Cryptosuite to default to RDFC.');

    // 5. Set expectedProofPurpose to capabilityInvocation.
    const expectedPurpose = 'capabilityInvocation';

    // 6. Set mediaType to ????
    // const mediaType = 'application/json';
    // Logger.warn('// TODO: applyDidUpdate - is this just application/json?');

    // 7. Set documentBytes to the bytes representation of update.
    const documentBytes = await JSON.canonicalization.canonicalize(update);

    // 8. Set verificationResult to the result of passing mediaType, documentBytes, cryptosuite, and
    //    expectedProofPurpose into the Verify Proof algorithm defined in the VC Data Integrity specification.
    const diProof = new DataIntegrityProof(cryptosuite);
    const verificationResult = await diProof.verifyProof({ document: documentBytes, expectedPurpose });

    // 9. If verificationResult.verified equals False, MUST raise a invalidUpdateProof exception.
    if (!verificationResult.verified) {
      throw new Btc1Error('Invalid update: proof not verified', INVALID_DID_UPDATE, verificationResult);
    }

    // 10. Set targetDIDDocument to a copy of contemporaryDidDocument.
    let targetDIDDocument = contemporaryDidDocument;

    // 11. Use JSON Patch to apply the update.patch to the targetDIDDOcument.
    targetDIDDocument = JSON.patch.apply(targetDIDDocument, update.patch) as Btc1DidDocument;

    // 12. Verify that targetDIDDocument is conformant with the data model specified by the DID Core specification.
    Btc1DidDocument.validate(targetDIDDocument);

    // 13. Set targetHash to the SHA256 hash of targetDIDDocument.
    const targetHash = await JSON.canonicalization.process(targetDIDDocument, 'base58');

    // Prepend the sourceHash if it does not start with `z`
    const updateTargetHash = update.targetHash.startsWith('z')
      ? update.targetHash
      : `z${update.targetHash}`;
    // 14. Check that targetHash equals update.targetHash, else raise InvalidDIDUpdate error.
    if (updateTargetHash !== targetHash) {
      throw new Btc1Error(`Invalid update: updateTargetHash ${updateTargetHash} does not match targetHash ${targetHash}`, INVALID_DID_UPDATE);
    }

    // 15. Return targetDIDDocument.
    return targetDIDDocument;
  }
}