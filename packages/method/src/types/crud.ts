import { DidUpdatePayload, ProofBytes } from '@did-btc1/common';
import { BeaconService } from '../interfaces/ibeacon.js';
import { Btc1DidDocument } from '../utils/did-document.js';
import { BlockV3 } from './bitcoin.js';

export type FindNextSignals = {
  block: BlockV3;
  beacons: BeaconService[]
};
export type Metadata = {
  updatePayload: DidUpdatePayload;
  proofs?: any;
};
export type SignalSidecarData = Metadata;
export interface Btc1SidecarData {
  did: string;
}
export type SignalsMetadata = { [signalId: string]: Metadata; };
export interface SingletonSidecar extends Btc1SidecarData {
  signalsMetadata: SignalsMetadata;
}
export interface CIDAggregateSidecar extends Btc1SidecarData {
  initialDocument: Btc1DidDocument;
  cidUpdates: Array<string>;
}
export interface SMTAggregateSidecar extends Btc1SidecarData {
  // SMTAggregate
  smtProof: ProofBytes;
}
export type SidecarData<T> =
  T extends 'SingletonBeacon' ? SingletonSidecar :
  T extends 'CIDAggregateBeacon' ? CIDAggregateSidecar :
  T extends 'SMTAggregateBeacon' ? SMTAggregateSidecar :
  never;
export type GetSigningMethodParams = {
  didDocument: Btc1DidDocument;
  methodId?: string;
};
