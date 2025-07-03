import { DidDocumentError, INVALID_DID_DOCUMENT } from '@did-btc1/common';
import { Btc1DidDocument, Btc1VerificationMethod } from './index.js';
import { BeaconService } from '../beacon/interfaces.js';

export class Btc1DidDocumentBuilder {
  private document: Partial<Btc1DidDocument> = {};

  constructor(initialDocument: Partial<Btc1DidDocument>) {
    if (!initialDocument.id) {
      throw new DidDocumentError('Missing required "id" property', INVALID_DID_DOCUMENT, initialDocument);
    }
    this.document.id = initialDocument.id;
    this.document.verificationMethod = initialDocument.verificationMethod ?? [];

    if (initialDocument['@context']) {
      this.document['@context'] = initialDocument['@context'];
    }
  }

  withController(controller?: Array<string>): this {
    if (controller) {
      this.document.controller = controller ?? [this.document.id!];
    }
    return this;
  }

  withAuthentication(authentication: Array<string | Btc1VerificationMethod>): this {
    if (authentication) {
      this.document.authentication = authentication;
    }
    return this;
  }

  withAssertionMethod(assertionMethod: Array<string | Btc1VerificationMethod>): this {
    if (assertionMethod) {
      this.document.assertionMethod = assertionMethod;
    }
    return this;
  }

  withCapabilityInvocation(capabilityInvocation: Array<string | Btc1VerificationMethod>): this {
    if (capabilityInvocation) {
      this.document.capabilityInvocation = capabilityInvocation;
    }
    return this;
  }

  withCapabilityDelegation(capabilityDelegation: Array<string | Btc1VerificationMethod>): this {
    if (capabilityDelegation) {
      this.document.capabilityDelegation = capabilityDelegation;
    }
    return this;
  }

  withService(service: Array<BeaconService>): this {
    if (service) {
      this.document.service = service;
    }
    return this;
  }

  build(): Btc1DidDocument {
    const didDocument = new Btc1DidDocument(this.document as Btc1DidDocument);

    for (const key of Object.keys(didDocument)) {
      if (didDocument[key as keyof Btc1DidDocument] === undefined) {
        delete didDocument[key as keyof Btc1DidDocument];
      }
    }

    return didDocument;
  }
}
