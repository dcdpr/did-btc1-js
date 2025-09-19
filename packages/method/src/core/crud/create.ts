import { IdentifierTypes, KeyBytes, PatchOperation } from '@did-btcr2/common';
import { CompressedSecp256k1PublicKey } from '@did-btcr2/keypair';
import { DidCreateOptions as IDidCreateOptions } from '@web5/dids';
import { getNetwork } from  '@did-btcr2/bitcoin';
import { BeaconUtils } from '../../utils/beacons.js';
import { DidDocument, IntermediateDidDocument } from '../../utils/did-document.js';
import { Identifier } from '../../utils/identifier.js';
import { KeyManager } from '../key-manager/index.js';

export type CreateParams = CreateKeyParams | CreateExternalParams;
export interface CreateIdentifierParams {
  genesisBytes: Uint8Array;
  newtork?: string;
  version?: string;
}
export type CreateResponse = {
  did: string;
  initialDocument: DidDocument;
};
export interface ConstructUpdateParams {
    identifier: string;
    sourceDocument: DidDocument;
    sourceVersionId: number;
    patch: PatchOperation[];
}
export interface UpdateParams extends ConstructUpdateParams {
    verificationMethodId: string;
    beaconIds: string[];
}
export interface DidCreateOptions extends IDidCreateOptions<KeyManager> {
  /** DID BTCR2 Version Number */
  version?: number;
  /** Bitcoin Network */
  network?: string;
}
export type CreateKeyParams = {
  idType: 'KEY';
  pubKeyBytes: KeyBytes;
  options?: DidCreateOptions;
};
export type CreateExternalParams = {
  idType: 'EXTERNAL';
  intermediateDocument: IntermediateDidDocument;
  options?: DidCreateOptions;
};

/**
 * Implements section {@link https://dcdpr.github.io/did-btcr2/#create | 4.1 Create}.
 *
 * A did:btcr2 identifier and associated DID document can either be created deterministically from a cryptographic seed,
 * or it can be created from an arbitrary genesis intermediate DID document representation. In both cases, DID creation
 * can be undertaken in an offline manner, i.e., the DID controller does not need to interact with the Bitcoin network
 * to create their DID.
 *
 * @class Create
 * @type {Create}
 */
export class Create {
  /**
   * Implements {@link https://dcdpr.github.io/did-btcr2/#deterministic-key-based-creation | 4.1.1 Deterministic Key-Based Creation}.
   *
   * For deterministic key-based creation, the did:btcr2 identifier encodes a secp256k1 public key. The key is then used
   * to deterministically generate the initial DID document.
   *
   * @param {CreateKeyParams} params See {@link CreateKeyParams} for details.
   * @param {number} params.version did-btcr2 identifier version.
   * @param {string} params.network did-btcr2 bitcoin network.
   * @param {KeyBytes} params.pubKeyBytes public key bytes for id creation.
   * @returns {CreateResponse} A response object of type {@link CreateResponse}.
   * @throws {DidError} if the public key is missing or invalid.
   */
  public static deterministic({ pubKeyBytes, options }: {
    pubKeyBytes: KeyBytes;
    options: DidCreateOptions;
  }): CreateResponse {
    // Deconstruct options and set the default values
    const { version = 1, network = 'bitcoin' } = options;

    // Set idType to "KEY"
    const idType = IdentifierTypes.KEY;

    // Call the the did:btcr2 Identifier Encoding algorithm
    const identifier = Identifier.encode({ version, network, idType, genesisBytes: pubKeyBytes });

    // Instantiate CompressedSecp256k1PublicKey object and get the multibase formatted publicKey
    const { compressed: publicKey, multibase: publicKeyMultibase } = new CompressedSecp256k1PublicKey(pubKeyBytes);

    // Generate the service field for the DID Document
    const service = BeaconUtils.generateBeaconServices({
      identifier,
      publicKey,
      network : getNetwork(network),
      type    : 'SingletonBeacon',
    });

    // Create initialDocument ensuring conformant to spec as DidDocument
    const initialDocument = new DidDocument({
      id                 : identifier,
      controller         : [identifier],
      verificationMethod : [{
        id                 : `${identifier}#initialKey`,
        type               : 'Multikey',
        controller         : identifier,
        publicKeyMultibase : publicKeyMultibase.encoded,
      }],
      service,
    });

    // Return did & initialDocument
    return { did: identifier, initialDocument };
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btcr2/#external-initial-document-creation | 4.1.2 External Initial Document Creation}.
   *
   * Creates a did:btcr2 identifier from some initiating arbitrary DID document. This allows for more complex
   * initial DID documents, including the ability to include Service Endpoints and Beacons that support aggregation.
   * Inputs include `intermediateDocument`, optional version and network returning initialDidDocument. The
   * intermediateDocument should be a valid DID document except all places where the DID document requires the use of
   * the identifier (e.g. the id field). These fields should use placeholder value
   * `did:btcr2:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. The intermediateDocument should include at
   * least one verificationMethod and service of the type SingletonBeacon.
   *
   * @param {CreateExternalParams} params See {@link CreateExternalParams} for details.
   * @param {number} params.version Identifier version.
   * @param {string} params.network Identifier network name.
   * @param {string} params.documentBytes Intermediate DID Document bytes.
   * @returns {CreateResponse} A Promise resolving to {@link CreateResponses}.
   * @throws {DidError} if the verificationMethod or service objects are missing required properties
   */
  public static async external({ intermediateDocument, options }: {
    intermediateDocument: IntermediateDidDocument;
    options: DidCreateOptions;
  }): Promise<CreateResponse> {
    // 1. Set idType to "EXTERNAL"
    const idType = IdentifierTypes.EXTERNAL;

    // 2. Set version to 1
    // 3. Set network to the desired network.
    const { version = 1, network = 'bitcoin' } = options;

    // Validate intermediateDocument
    intermediateDocument.validateIntermediate();

    // 4. Set genesisBytes to the result of passing intermediateDocument into the JSON Canonicalization and Hash
    //    algorithm.
    const genesisBytes = await JSON.canonicalization.canonicalhash(intermediateDocument);

    // 5. Pass idType, version, network, and genesisBytes to the did:btcr2 Identifier Encoding algorithm, retrieving id.
    // 6. Set did to id
    const did = Identifier.encode({ idType, genesisBytes, version, network });

    // 7. Set initialDocument to a copy of the intermediateDocument.
    // 8. Replace all did:btcr2:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx values in the initialDocument with the did.
    const initialDocument = intermediateDocument.toDidDocument(did);

    // Return DID & DID Document.
    return { did, initialDocument };
  }
}