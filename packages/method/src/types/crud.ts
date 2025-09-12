import { DidUpdatePayload, ProofBytes } from '@did-btcr2/common';
import { BeaconService } from '../interfaces/ibeacon.js';
import { DidDocument } from '../utils/did-document.js';
import { BlockV3 } from './bitcoin.js';

export type FindNextSignals = {
  block: BlockV3;
  beacons: BeaconService[]
};
export type Metadata = {
  btc1Update: DidUpdatePayload;
  proofs?: string;
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
  initialDocument: DidDocument;
  signalsMetadata: SignalsMetadata;
  cidUpdates: Array<string>;
}
export interface SMTAggregateSidecar extends Btc1SidecarData {
  initialDocument: DidDocument;
  signalsMetadata: SignalsMetadata;
  smtProof: ProofBytes;
}
export type BeaconSidecarData<T> =
  T extends 'SingletonBeacon' ? SingletonSidecar :
  T extends 'CIDAggregateBeacon' ? CIDAggregateSidecar :
  T extends 'SMTAggregateBeacon' ? SMTAggregateSidecar :
  T;
export type SidecarData = BeaconSidecarData<SingletonSidecar | CIDAggregateSidecar | SMTAggregateSidecar>;
export type GetSigningMethodParams = {
  didDocument: DidDocument;
  methodId?: string;
};
