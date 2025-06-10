import {
  BTC1_DID_DOCUMENT_CONTEXT,
  Btc1IdentifierTypes,
  DidDocumentError,
  ID_PLACEHOLDER_VALUE,
  INVALID_DID_DOCUMENT,
  JSONObject,
  Logger
} from '@did-btc1/common';
import { DidService, DidVerificationMethod, DidDocument as IDidDocument } from '@web5/dids';
import { BeaconService } from '../interfaces/ibeacon.js';
import { Btc1Appendix } from './appendix.js';
import { BeaconUtils } from './beacons.js';
import { Btc1Identifier } from './identifier.js';

export const BECH32M_CHARS = '';
export const BTC1_DID_REGEX = /did:btc1:(x1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]*)/g;

export type ExternalData = {
  id: string,
  verificationMethod: Array<Btc1VerificationMethod>,
  authentication?: Array<string | Btc1VerificationMethod>,
  assertionMethod?: Array<string | Btc1VerificationMethod>,
  capabilityInvocation?: Array<string | Btc1VerificationMethod>,
  capabilityDelegation?: Array<string | Btc1VerificationMethod>,
  service: Array<BeaconService>
}
export type VerificationRelationships = {
  authentication?: Array<string | Btc1VerificationMethod>;
  assertionMethod?: Array<string | Btc1VerificationMethod>;
  capabilityInvocation?: Array<string | Btc1VerificationMethod>;
  capabilityDelegation?: Array<string | Btc1VerificationMethod>;
}

export interface IBtc1VerificationMethod extends DidVerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase: string;
  secretKeyMultibase?: string | undefined;
}

/**
 * DID BTC1 Verification Method extends the DidVerificationMethod class adding helper methods and properties
 * @class Btc1VerificationMethod
 * @type {Btc1VerificationMethod}
 *
 */
export class Btc1VerificationMethod implements IBtc1VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase: string;
  secretKeyMultibase?: string | undefined;

  constructor({ id, type, controller, publicKeyMultibase, secretKeyMultibase }: IBtc1VerificationMethod) {
    this.id = id;
    this.type = type;
    this.controller = controller;
    this.publicKeyMultibase = publicKeyMultibase;
    this.secretKeyMultibase = secretKeyMultibase;
    if(!secretKeyMultibase){
      delete this.secretKeyMultibase;
    }
  }
  // TODO: Add helper methods and properties
}

/**
 * BTC1 DID Document Interface
 * @interface IBtc1DidDocument
 * @type {IBtc1DidDocument}
 * @extends {IDidDocument}
 * @property {string} id - The identifier of the DID Document.
 * @property {Array<string>} [controller] - The controller of the DID Document.
 * @property {Array<string | JSONObject>} ['@context'] - The context of the DID Document.
 * @property {Array<DidVerificationMethod>} verificationMethod - The verification methods of the DID Document.
 * @property {Array<string | Btc1VerificationMethod>} [authentication] - The authentication methods of the DID Document.
 * @property {Array<string | Btc1VerificationMethod>} [assertionMethod] - The assertion methods of the DID Document.
 * @property {Array<string | Btc1VerificationMethod>} [capabilityInvocation] - The capability invocation methods of the DID Document.
 * @property {Array<string | Btc1VerificationMethod>} [capabilityDelegation] - The capability delegation methods of the DID Document.
 * @property {Array<BeaconService>} service - The services of the DID Document.
 */
export interface IBtc1DidDocument extends IDidDocument {
  id: string;
  controller?: Array<string>;
  '@context'?: Array<string | JSONObject>;
  verificationMethod: Array<Btc1VerificationMethod>;
  authentication?: Array<string | Btc1VerificationMethod>;
  assertionMethod?: Array<string | Btc1VerificationMethod>;
  capabilityInvocation?: Array<string | Btc1VerificationMethod>;
  capabilityDelegation?: Array<string | Btc1VerificationMethod>;
  service: Array<BeaconService>;
}

/**
 * BTC1 DID Document extends the DidDocument class adding helper methods and properties
 * @class Btc1DidDocument
 * @type {Btc1DidDocument}
 * @implements {IBtc1DidDocument}
 * @property {string} id - The identifier of the DID Document.
 * @property {Array<string>} [controller] - The controller of the DID Document.
 * @property {Array<string | JSONObject>} ['@context'] - The context of the DID Document.
 * @property {Array<DidVerificationMethod>} verificationMethod - The verification methods of the DID Document.
 * @property {Array<string | Btc1VerificationMethod>} [authentication] - The authentication methods of the DID Document.
 * @property {Array<string | Btc1VerificationMethod>} [assertionMethod] - The assertion methods of the DID Document.
 * @property {Array<string | Btc1VerificationMethod>} [capabilityInvocation] - The capability invocation methods of the DID Document.
 * @property {Array<string | Btc1VerificationMethod>} [capabilityDelegation] - The capability delegation methods of the DID Document.
 * @property {Array<BeaconService>} service - The services of the DID Document.
 */
export class Btc1DidDocument implements IBtc1DidDocument {
  id: string;
  controller?: Array<string>;
  '@context'?: Array<string | JSONObject> = BTC1_DID_DOCUMENT_CONTEXT;
  verificationMethod: Array<Btc1VerificationMethod>;
  authentication?: Array<string | Btc1VerificationMethod>;
  assertionMethod?: Array<string | Btc1VerificationMethod>;
  capabilityInvocation?: Array<string | Btc1VerificationMethod>;
  capabilityDelegation?: Array<string | Btc1VerificationMethod>;
  service: Array<BeaconService>;

  constructor(document: IBtc1DidDocument) {
    // Set the ID and ID type
    const idType = document.id.includes('k1')
      ? Btc1IdentifierTypes.KEY
      : Btc1IdentifierTypes.EXTERNAL;

    // Validate ID and parts for non-intermediate
    const isIntermediate = document.id === ID_PLACEHOLDER_VALUE;
    // Deconstruct the document parts for validation
    const { id, controller, verificationMethod: vm, service } = document;
    if (!isIntermediate) {
      if (!Btc1DidDocument.isValidId(id)) {
        throw new DidDocumentError(`Invalid id: ${id}`, INVALID_DID_DOCUMENT, document);
      }
      if(!Btc1DidDocument.isValidController(controller ?? [id])) {
        throw new DidDocumentError(`Invalid controller: ${controller}`, INVALID_DID_DOCUMENT, document);
      }
      if (!Btc1DidDocument.isValidVerificationMethods(vm)) {
        throw new DidDocumentError('Invalid verificationMethod: ' + vm, INVALID_DID_DOCUMENT, document);
      }
      if (!Btc1DidDocument.isValidServices(service)) {
        throw new DidDocumentError('Invalid service: ' + service, INVALID_DID_DOCUMENT, document);
      }
    }

    // Set core properties
    this.id = document.id;
    this.verificationMethod = document.verificationMethod;
    this.service = document.service;
    this['@context'] = document['@context'] || BTC1_DID_DOCUMENT_CONTEXT;
    this.controller = document.controller || [this.id];

    // Relationships logic based on idType
    if (idType === Btc1IdentifierTypes.KEY) {
      // auto-generate #initialKey if missing
      const keyRef = `${this.id}#initialKey`;
      this.authentication = document.authentication || [keyRef];
      this.assertionMethod = document.assertionMethod || [keyRef];
      this.capabilityInvocation = document.capabilityInvocation || [keyRef];
      this.capabilityDelegation = document.capabilityDelegation || [keyRef];
    } else {
      // EXTERNAL: use provided arrays, must be defined
      this.authentication = document.authentication;
      this.assertionMethod = document.assertionMethod;
      this.capabilityInvocation = document.capabilityInvocation;
      this.capabilityDelegation = document.capabilityDelegation;
    }

    // Sanitize the DID Document
    Btc1DidDocument.sanitize(this);
    // If the DID Document is not an intermediateDocument, validate it
    if (!isIntermediate) {
      Btc1DidDocument.validate(this);
    } else {
      this.validateIntermediate();
    }
  }

  /**
   * Convert the Btc1DidDocument to a JSON object.
   * @returns {JSONObject} The JSON representation of the Btc1DidDocument.
   */
  public json(): JSONObject {
    return {
      id                   : this.id,
      controller           : this.controller,
      '@context'           : this['@context'],
      verificationMethod   : this.verificationMethod,
      authentication       : this.authentication,
      assertionMethod      : this.assertionMethod,
      capabilityInvocation : this.capabilityInvocation,
      capabilityDelegation : this.capabilityDelegation,
      service              : this.service
    };
  }

  /**
   * Create a minimal Btc1DidDocument from "k1" btc1 identifier.
   * @param {string} publicKeyMultibase The public key in multibase format.
   * @param {Array<BeaconService>} service The beacon services to be included in the document.
   * @returns {Btc1DidDocument} A new Btc1DidDocument with the placeholder ID.
   */
  public static fromKeyIdentifier(
    id: string,
    publicKeyMultibase: string,
    service: Array<BeaconService>
  ): Btc1DidDocument {
    // Ensure the ID is in the correct format
    id = id.includes('#') ? id : `${id}#initialKey`;
    // Create the verification method and the Btc1DidDocument
    const document = {
      id,
      verificationMethod : [
        new Btc1VerificationMethod({
          id,
          type       : 'Multikey',
          controller : id,
          publicKeyMultibase
        })
      ],
      service
    } as IBtc1DidDocument;
    return new Btc1DidDocument(document);
  }

  /**
   * Create a Btc1DidDocument from "x1" btc1 identifier.
   * @param {ExternalData} data The verification methods of the DID Document.
   * @returns {Btc1DidDocument} A new Btc1DidDocument.
   */
  public static fromExternalIdentifier(data: ExternalData): Btc1DidDocument {
    return new Btc1DidDocument(data as IBtc1DidDocument);
  }


  /**
   * Sanitize the DID Document by removing undefined values
   * @returns {Btc1DidDocument} The sanitized DID Document
   */
  public static sanitize(doc: Btc1DidDocument): Btc1DidDocument {
    for (const key of Object.keys(doc)) {
      if (doc[key as keyof Btc1DidDocument] === undefined) {
        delete doc[key as keyof Btc1DidDocument];
      }
    }
    return doc;
  }

  /**
   * Validates a Btc1DidDocument by breaking it into modular validation methods.
   * @param {Btc1DidDocument} didDocument The DID document to validate.
   * @returns {boolean} True if the DID document is valid.
   * @throws {DidDocumentError} If any validation check fails.
   */
  public static isValid(didDocument: Btc1DidDocument): boolean {
    if (!this.isValidContext(didDocument?.['@context'])) {
      throw new DidDocumentError('Invalid "@context"', INVALID_DID_DOCUMENT, didDocument);
    }
    if (!this.isValidId(didDocument?.id)) {
      throw new DidDocumentError('Invalid "id"', INVALID_DID_DOCUMENT, didDocument);
    }
    if (!this.isValidVerificationMethods(didDocument?.verificationMethod)) {
      throw new DidDocumentError('Invalid "verificationMethod"', INVALID_DID_DOCUMENT, didDocument);
    }
    if (!this.isValidServices(didDocument?.service)) {
      throw new DidDocumentError('Invalid "service"', INVALID_DID_DOCUMENT, didDocument);
    }
    if (!this.isValidVerificationRelationships(didDocument)) {
      throw new DidDocumentError('Invalid verification relationships', INVALID_DID_DOCUMENT, didDocument);
    }
    return true;
  }

  /**
   * Validates that "@context" exists and includes correct values.
   * @private
   * @param {Btc1DidDocument['@context']} context The context to validate.
   * @returns {boolean} True if the context is valid.
   */
  private static isValidContext(context: Btc1DidDocument['@context']): boolean {
    if(!context) return false;
    if(!Array.isArray(context)) return false;
    if(!context.every(ctx => typeof ctx === 'string' && BTC1_DID_DOCUMENT_CONTEXT.includes(ctx))) return false;
    return true;
  }

  /**
   * Validates that the DID Document has a valid id.
   * @private
   * @param {string} id The id to validate.
   * @returns {boolean} True if the id is valid.
   */
  private static isValidId(id: string): boolean {
    try {
      Btc1Identifier.decode(id);
      return true;
    } catch (error: any) {
      Logger.error('Invalid DID Document ID', error);
      return false;
    }
  }

  /**
   * Validates that the controller exists and is correctly formatted.
   * @param {Array<string>} controller The controller to validate.
   * @returns {boolean} True if the controller is valid.
   */
  private static isValidController(controller: Array<string>): boolean {
    if(!controller) return false;
    if(!Array.isArray(controller)) return false;
    if(!controller.every(c => typeof c === 'string')) return false;
    return true;
  }

  /**
   * Validates that verification methods exist and are correctly formatted.
   * @private
   * @param {DidVerificationMethod[]} verificationMethod The verification methods to validate.
   * @returns {boolean} True if the verification methods are valid.
   */
  private static isValidVerificationMethods(verificationMethod: DidVerificationMethod[]): boolean {
    return Array.isArray(verificationMethod) && verificationMethod.every(Btc1Appendix.isDidVerificationMethod);
  }

  /**
   * Validates that the DID Document has valid services.
   * @private
   * @param {DidService[]} service The services to validate.
   * @returns {boolean} True if the services are valid.
   */
  private static isValidServices(service: DidService[]): boolean {
    return Array.isArray(service) && service.every(BeaconUtils.isBeaconService);
  }

  /**
   * Validates verification relationships (authentication, assertionMethod, capabilityInvocation, capabilityDelegation).
   * @private
   * @param {Btc1DidDocument} didDocument The DID Document to validate.
   * @returns {boolean} True if the verification relationships are valid.
   */
  public static isValidVerificationRelationships(didDocument: Btc1DidDocument): boolean {
    // Define the available verification relationships
    const possibleVerificationRelationships: (keyof Btc1DidDocument)[] = [
      'authentication',
      'assertionMethod',
      'capabilityInvocation',
      'capabilityDelegation'
    ];

    // Get the DID Document keys
    const verificationRelationships = Object.keys(didDocument) as Array<keyof Btc1DidDocument>;

    // Filter the DID Document keys to only those that are in the available verification relationships
    const availableVerificationRelationships = possibleVerificationRelationships.filter(
      key => verificationRelationships.includes(key as keyof Btc1DidDocument)
    ) as (keyof Btc1DidDocument)[];

    // Check if all available verification relationships are valid
    return availableVerificationRelationships.every((key) =>
      // Check if the key exists in the DID Document
      didDocument[key] &&
      // Check if the key is an array
      Array.isArray(didDocument[key]) &&
      // Check that every value in the array is a string or DidVerificationMethod
      didDocument[key].every(
        entry => typeof entry === 'string' || Btc1Appendix.isDidVerificationMethod(entry)
      ));
  }

  /**
   * Validate the DID Document
   * @returns {Btc1DidDocument} Validated DID Document.
   * @throws {DidDocumentError} If the DID Document is invalid.
   */
  public static validate(didDocument: Btc1DidDocument | IntermediateDidDocument): Btc1DidDocument {
    // Validate the DID Document
    if (didDocument.id === ID_PLACEHOLDER_VALUE) {
      (didDocument as IntermediateDidDocument).validateIntermediate();
    } else {
      Btc1DidDocument.isValid(didDocument);
    }
    // Return the DID Document
    return didDocument;
  }

  /**
   * Validate the IntermediateDidDocument.
   * @returns {boolean} True if the IntermediateDidDocument is valid.
   */
  public validateIntermediate(): void {
    // Validate the id
    if(this.id !== ID_PLACEHOLDER_VALUE) {
      throw new DidDocumentError('Invalid IntermediateDidDocument ID', INVALID_DID_DOCUMENT, this);
    }
    // Validate the controller
    if(!this.controller?.every(c => c === ID_PLACEHOLDER_VALUE)) {
      throw new DidDocumentError('Invalid IntermediateDidDocument controller', INVALID_DID_DOCUMENT, this);
    }
    // Validate the verificationMethod
    if(!this.verificationMethod.every(vm => vm.id.includes(ID_PLACEHOLDER_VALUE) && vm.controller === ID_PLACEHOLDER_VALUE)) {
      throw new DidDocumentError('Invalid IntermediateDidDocument verificationMethod', INVALID_DID_DOCUMENT, this);
    }
    // Validate the service
    if(!this.service.every(svc => svc.id.includes(ID_PLACEHOLDER_VALUE))) {
      throw new DidDocumentError('Invalid IntermediateDidDocument service', INVALID_DID_DOCUMENT, this);
    }
    if(!Btc1DidDocument.isValidVerificationRelationships(this)) {
      // Return true if all validations pass
      throw new DidDocumentError('Invalid IntermediateDidDocument assertionMethod', INVALID_DID_DOCUMENT, this);
    }
  }

  /**
   * Convert the Btc1DidDocument to an IntermediateDidDocument.
   * @returns {IntermediateDidDocument} The IntermediateDidDocument representation of the Btc1DidDocument.
   */
  public toIntermediate(): IntermediateDidDocument {
    if(this.id.includes('k1')) {
      throw new DidDocumentError('Cannot convert a key identifier to an intermediate document', INVALID_DID_DOCUMENT, this);
    }
    return new IntermediateDidDocument(this);
  }
}

/**
 * IntermediateDidDocument extends the Btc1DidDocument class for creating and managing intermediate DID documents.
 * This class is used to create a minimal DID document with a placeholder ID.
 * It is used in the process of creating a new DID document.
 * @class IntermediateDidDocument
 * @extends {Btc1DidDocument}
 */
export class IntermediateDidDocument extends Btc1DidDocument {
  constructor(document: IBtc1DidDocument) {
    const intermediateDocument = JSON.cloneReplace(document, BTC1_DID_REGEX, ID_PLACEHOLDER_VALUE) as IBtc1DidDocument;
    super(intermediateDocument);
  }

  /**
   * Create a minimal IntermediateDidDocument with a placeholder ID.
   * @param {Array<Btc1VerificationMethod>} verificationMethod The public key in multibase format.
   * @param {VerificationRelationships} relationships The public key in multibase format.
   * @param {Array<BeaconService>} service The service to be included in the document.
   * @returns {IntermediateDidDocument} A new IntermediateDidDocument with the placeholder ID.
   */
  public static create(
    verificationMethod: Array<Btc1VerificationMethod>,
    relationships: VerificationRelationships,
    service: Array<BeaconService>
  ): IntermediateDidDocument {
    const id = ID_PLACEHOLDER_VALUE;
    return new IntermediateDidDocument({ id, ...relationships, verificationMethod, service, });
  }

  /**
   * Convert the IntermediateDidDocument to a Btc1DidDocument by replacing the placeholder value with the provided DID.
   * @param did The DID to replace the placeholder value in the document.
   * @returns {Btc1DidDocument} A new Btc1DidDocument with the placeholder value replaced by the provided DID.
   */
  public toBtc1DidDocument(did: string): Btc1DidDocument {
    const stringThis = JSON.stringify(this).replaceAll(ID_PLACEHOLDER_VALUE, did);
    const parseThis = JSON.parse(stringThis) as IBtc1DidDocument;
    return new Btc1DidDocument(parseThis);
  }

  /**
   * Create a Btc1DidDocument from a JSON object.
   * @param {JSONObject} object The JSON object to convert.
   * @returns {Btc1DidDocument} The created Btc1DidDocument.
   */
  public static from(object: JSONObject): Btc1DidDocument {
    return new IntermediateDidDocument(object as IBtc1DidDocument).toBtc1DidDocument(object.id as string);
  }
}
