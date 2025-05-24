import {
  Btc1Error,
  Btc1IdentifierTypes,
  INVALID_DID,
  INVALID_DID_DOCUMENT,
  METHOD_NOT_SUPPORTED,
  PatchOperation,
  W3C_DID_RESOLUTION_V1
} from '@did-btc1/common';
import type {
  DidResolutionResult,
  DidVerificationMethod
} from '@web5/dids';
import {
  Did,
  DidError,
  DidErrorCode,
  DidMethod,
  EMPTY_DID_RESOLUTION_RESULT
} from '@web5/dids';
import { initEccLib } from 'bitcoinjs-lib';
import * as tinysecp from 'tiny-secp256k1';
import { Btc1Create, Btc1CreateParams, Btc1CreateResponse } from './btc1/crud/create.js';
import { Btc1Read } from './btc1/crud/read.js';
import { Btc1Update } from './btc1/crud/update.js';
import { DidResolutionOptions } from './interfaces/crud.js';
import { Btc1Appendix } from './utils/appendix.js';
import { Btc1DidDocument, Btc1VerificationMethod } from './utils/did-document.js';
import { Btc1Identifier } from './utils/identifier.js';

/** Initialize tiny secp256k1 */
initEccLib(tinysecp);

/**
 * Implements {@link https://dcdpr.github.io/did-btc1 | did:btc1 DID Method Specification}.
 * did:btc1 is a censorship resistant DID Method using the Bitcoin blockchain as a Verifiable Data Registry to announce
 * changes to the DID document. It improves on prior work by allowing: zero-cost off-chain DID creation; aggregated
 * updates for scalable on-chain update costs; long-term identifiers that can support frequent updates; private
 * communication of the DID document; private DID resolution; and non-repudiation appropriate for serious contracts.
 *
 * @class DidBtc1
 * @type {DidBtc1}
 *
 */
export class DidBtc1 implements DidMethod {
  /** @type {string} Name of the DID method, as defined in the DID BTC1 specification */
  public static methodName: string = 'btc1';

  /**
   * Entry point for section {@link https://dcdpr.github.io/did-btc1/#create | 4.1 Create}.
   * See {@link Btc1Create} for implementation details.
   *
   * A did:btc1 identifier and associated DID document can either be created deterministically from a cryptographic
   * seed, or it can be created from an arbitrary genesis intermediate DID document representation. In both cases,
   * DID creation can be undertaken in an offline manner, i.e., the DID controller does not need to interact with the
   * Bitcoin network to create their DID.
   * @param {Btc1CreateParams} params See {@link Btc1CreateParams} for details.
   * @param {IdType} params.idType Type of identifier to create (key or external).
   * @param {PublicKeyBytes} params.pubKeyBytes Public key byte array used to create a btc1 "key" identifier.
   * @param {IntermediateDocument} params.intermediateDocument DID Document used to create a btc1 "external" identifier.
   * @param {DidCreateOptions} params.options See {@link DidCreateOptions} for create options.
   * @param {number} params.options.version Version number of the btc1 method.
   * @param {string} params.options.network Bitcoin network name (mainnet, testnet, signet, regtest).
   * @returns {Promise<CreateResponse>} Promise resolving to a CreateResponse object.
   * @throws {DidBtc1Error} if any of the checks fail
   */
  public static async create(params: Btc1CreateParams): Promise<Btc1CreateResponse> {
    // Deconstruct the idType and options from the params
    const { idType, options = {} } = params;

    // If idType is key, call Btc1Create.deterministic
    if(idType === Btc1IdentifierTypes.KEY) {
      // Deconstruct the pubKeyBytes from the params
      const { pubKeyBytes } = params;

      // Return call to Btc1Create.key
      return Btc1Create.key({ pubKeyBytes, options });
    }

    // If idType is external, call Btc1Create.external
    if(idType === Btc1IdentifierTypes.EXTERNAL) {
      // Deconstruct the intermediateDocument from the params
      const { intermediateDocument } = params;

      // Return call to Btc1Create.external
      return await Btc1Create.external({ intermediateDocument, options });
    }

    // Throw error if idType is not key or external
    throw new Btc1Error('Invalid idType: expected "KEY" or "EXTERNAL"', INVALID_DID, params);
  }

  /**
   * Entry point for section {@link https://dcdpr.github.io/did-btc1/#read | 4.2 Read}.
   * See {@link Btc1Read} for implementation details.
   *
   * The read operation is executed by a resolver after a resolution request identifying a specific did:btc1 identifier
   * is received from a client at Resolution Time. The request MAY contain a resolutionOptions object containing
   * additional information to be used in resolution. The resolver then attempts to resolve the DID document of the
   * identifier at a specific Target Time. The Target Time is either provided in resolutionOptions or is set to the
   * Resolution Time of the request.
   *
   * @param {string} identifier The DID to be resolved
   * @param {DidResolutionOptions} options Optional parameters for the resolution operation
   * @param {Btc1DidDocument} options.sidecarData.initialDocument User-provided, offline DID Document to resolve sidecar
   * @returns {DidResolutionResult} Promise resolving to a DID Resolution Result
   * @throws {Error} if the resolution fails for any reason
   * @throws {DidError} InvalidDid if the identifier is invalid
   * @example
   * ```ts
   * const resolution = await DidBtc1.resolve('did:btc1:k1q0dygyp3gz969tp46dychzy4q78c2k3js68kvyr0shanzg67jnuez2cfplh')
   * ```
   */
  public static async resolve(identifier: string, options: DidResolutionOptions = {}): Promise<DidResolutionResult> {
    try {
      // 1. Pass identifier to the did:btc1 Identifier Decoding algorithm, retrieving idType, version, network, and
      //    genesisBytes.
      // 2. Set identifierComponents to a map of idType, version, network, and genesisBytes.
      const components = Btc1Identifier.decode(identifier);

      // 3. Set initialDocument to the result of running the algorithm in Resolve Initial Document passing in the
      //    identifier, identifierComponents and resolutionOptions.
      const initialDocument = await Btc1Read.initialDocument({ identifier, components, options });

      // 4. Set targetDocument to the result of running the algorithm in Resolve Target Document passing in
      //    initialDocument and resolutionOptions.
      const targetDocument = await Btc1Read.targetDocument({ initialDocument, options });

      // 5. Return targetDocument.
      const didResolutionResult: DidResolutionResult = {
        '@context'            : W3C_DID_RESOLUTION_V1,
        didResolutionMetadata : { contentType: 'application/did+json' },
        didDocumentMetadata   : { created: new Date().getUTCDateTime() },
        didDocument           : targetDocument,
      };

      // Logger.warn('// TODO: Are we using the DID Core spec for DidResolutionResult?');
      // Logger.warn('// TODO: Are we using didResolutionMetadata? https://www.w3.org/TR/did-1.0/#did-resolution-metadata');
      // Logger.warn('// TODO: Are we using didDocumentMetadata? https://www.w3.org/TR/did-1.0/#did-document-metadata');

      // Return didResolutionResult;
      return didResolutionResult;
    } catch (error: any) {
      console.error(error);
      // Rethrow any unexpected errors that are not a `DidError`.
      if (!(error instanceof DidError)) throw new Error(error);

      // Return a DID Resolution Result with the appropriate error code.
      return {
        ...EMPTY_DID_RESOLUTION_RESULT,
        didResolutionMetadata : {
          error : error.code,
          ...error.message && { errorMessage: error.message }
        }
      };
    }
  }

  /**
   * Entry point for section {@link https://dcdpr.github.io/did-btc1/#update | 4.3 Update}.
   * See {@link Btc1Update} for implementation details.
   *
   * An update to a did:btc1 document is an invoked capability using the ZCAP-LD data format, signed by a
   * verificationMethod that has the authority to make the update as specified in the previous DID document. Capability
   * invocations for updates MUST be authorized using Data Integrity following the bip340-jcs-2025
   * cryptosuite with a proofPurpose of capabilityInvocation.
   *
   * The Update algorithm takes as inputs a btc1Identifier, sourceDocument, sourceVersionId, documentPatch, a
   * verificationMethodId and an array of beaconIds. The sourceDocument is the DID document being updated. The
   * documentPatch is a JSON Patch object containing a set of transformations to be applied to the sourceDocument.
   * The result of these transformations MUST produce a DID document conformant to the DID Core specification. The
   * verificationMethodId is an identifier for a verificationMethod within the sourceDocument. The verificationMethod
   * identified MUST be a BIP340 Multikey. The beaconIds MUST identify service endpoints with one of the three Beacon
   * Types SingletonBeacon, aCIDAggregateBeacon, and SMTAggregateBeacon.
   *
   * @param {Btc1UpdateParams} params Required parameters for the update operation.
   * @param {string} params.identifier The btc1 identifier to be updated.
   * @param {Btc1DidDocument} params.sourceDocument The DID document being updated.
   * @param {string} params.sourceVersionId The versionId of the source document.
   * @param {Btc1DocumentPatch} params.documentPatch The JSON patch to be applied to the source document.
   * @param {string} params.verificationMethodId The verificationMethod ID to sign the update
   * @param {string[]} params.beaconIds The beacon IDs to announce the update
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Btc1Error} if the verificationMethod type is not `Multikey` or the publicKeyMultibase header is not `z66P`
   */
  public static async update(params: {
    identifier: string;
    sourceDocument: Btc1DidDocument;
    sourceVersionId: number;
    patch: PatchOperation[];
    verificationMethodId: string;
    beaconIds: string[];
  }): Promise<any> {
    // Deconstruct the params
    const {
      identifier,
      sourceDocument,
      sourceVersionId,
      patch,
      verificationMethodId: methodId,
      beaconIds,
    } = params;

    // 1. Set unsignedUpdate to the result of passing btc1Identifier, sourceDocument,
    //    sourceVersionId, and documentPatch into the Construct DID Update
    //    Payload algorithm.
    const didUpdatePayload = await Btc1Update.construct({
      identifier,
      sourceDocument,
      sourceVersionId,
      patch,
    });

    // 2. Set verificationMethod to the result of retrieving the verificationMethod
    //    from sourceDocument using the verificationMethodId.
    const verificationMethod = this.getSigningMethod({ didDocument: sourceDocument, methodId, });

    // Validate the verificationMethod exists in the sourceDocument
    if (!verificationMethod) {
      throw new Btc1Error('Verification method not found in did document', INVALID_DID_DOCUMENT, sourceDocument);
    }

    // 3. Validate the verificationMethod is a BIP340 Multikey:
    //    3.1 verificationMethod.type == Multikey
    if (verificationMethod.type !== 'Multikey') {
      throw new Btc1Error('Invalid type: must be type "Multikey"', INVALID_DID_DOCUMENT, verificationMethod);
    }

    //    3.2 verificationMethod.publicKeyMultibase[4] == zQ3s
    const mbasePrefix = verificationMethod.publicKeyMultibase?.slice(0, 4);
    if (mbasePrefix !== 'zQ3s') {
      throw new Btc1Error(`Invalid publicKeyMultibase prefix ${mbasePrefix}`, INVALID_DID_DOCUMENT, verificationMethod);
    }

    // 4. Set didUpdateInvocation to the result of passing btc1Identifier, unsignedUpdate as didUpdatePayload, and
    //    verificationMethod to the Invoke DID Update Payload algorithm.
    const didUpdateInvocation = await Btc1Update.invoke({ identifier, verificationMethod, didUpdatePayload, });

    // 5. Set signalsMetadata to the result of passing btc1Identifier, sourceDocument, beaconIds and didUpdateInvocation
    //    to the Announce DID Update algorithm.
    const signalsMetadata = await Btc1Update.announce({ sourceDocument, beaconIds, didUpdateInvocation, });

    // 6. Return signalsMetadata. It is up to implementations to ensure that the signalsMetadata is persisted.
    return signalsMetadata;
    // TODO: Should we be applying the patch, producing a target did document and returning it?
  }

  /**
   * Given the W3C DID Document of a `did:btc1` identifier, return the signing verification method that will be used
   * for signing messages and credentials. If given, the `methodId` parameter is used to select the
   * verification method. If not given, the Identity Key's verification method with an ID fragment
   * of '#initialKey' is used.
   *
   * @param {{ didDocument: Btc1DidDocument; methodId?: string; }} params Parameters for the `getSigningMethod` method.
   * @param {DidDocument} params.didDocument DID Document to get the verification method from.
   * @param {string} params.methodId Optional ID of the verification method to use for signing.
   * @returns {Btc1VerificationMethod} Promise resolving to the {@link Btc1VerificationMethod} object used for signing.
   * @throws {DidError} if the parsed did method does not match `btc1` or signing method could not be determined.
   */
  public static getSigningMethod({ didDocument, methodId }: {
    didDocument: Btc1DidDocument;
    methodId?: string;
  }): Btc1VerificationMethod {
    // Set the default methodId to the first assertionMethod if not given
    methodId ??= '#initialKey';

    // Verify the DID method is supported.
    const parsedDid = Did.parse(didDocument.id);
    if (parsedDid && parsedDid.method !== this.methodName) {
      throw new Btc1Error(`Method not supported: ${parsedDid.method}`, METHOD_NOT_SUPPORTED, { identifier: didDocument.id });
    }

    // Attempt to find a verification method that matches the given method ID, or if not given,
    // find the first verification method intended for signing claims.
    const verificationMethod = didDocument.verificationMethod?.find(
      (vm: DidVerificationMethod) => Btc1Appendix.extractDidFragment(vm.id) === (Btc1Appendix.extractDidFragment(methodId)
        ?? Btc1Appendix.extractDidFragment(didDocument.assertionMethod?.[0]))
    );

    // If no verification method is found, throw an error
    if (!(verificationMethod && verificationMethod.publicKeyMultibase)) {
      throw new DidError(
        DidErrorCode.InternalError,
        'A verification method intended for signing could not be determined from the DID Document'
      );
    }
    return verificationMethod as Btc1VerificationMethod;
  }
}