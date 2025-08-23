import { BitcoinNetworkNames, UnixTimestamp } from '@did-btcr2/common';
import { DidResolutionOptions as IDidResolutionOptions } from '@web5/dids';
import BitcoinRpc from '../bitcoin/rpc-client.js';
import { SidecarData } from '../types/crud.js';
import { Btc1DidDocument } from '../utils/did-document.js';

/**
 * Options for resolving a DID Document
 * @param {?number} versionId The versionId for resolving the DID Document
 * @param {?UnixTimestamp} versionTime The versionTime for resolving the DID Document
 * @param {?BitcoinRpc} rpc BitcoinRpc client connection
 * @param {?SidecarData} sidecarData The sidecar data for resolving the DID Document
 */
export interface DidResolutionOptions extends IDidResolutionOptions {
  versionId?: number
  versionTime?: UnixTimestamp;
  sidecarData?: SidecarData;
  network?: BitcoinNetworkNames;
  rpc?: BitcoinRpc;
}
export interface Btc1RootCapability {
    '@context': string;
    id: string;
    controller: string;
    invocationTarget: string;
}
export interface ReadBlockchainParams {
  contemporaryDidDocument: Btc1DidDocument;
  contemporaryBlockHeight: number | 1;
  currentVersionId: number | 1;
  targetVersionId?: number;
  targetBlockHeight: number;
  updateHashHistory: string[];
  sidecarData?: SidecarData;
  options?: DidResolutionOptions;
}