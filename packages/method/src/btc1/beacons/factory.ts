import { Btc1Error } from '@did-btc1/common';
import { Beacon } from '../../interfaces/beacon.js';
import { BeaconService } from '../../interfaces/ibeacon.js';
import { SidecarData } from '../../types/crud.js';
import { CIDAggregateBeacon } from './cid-aggregate.js';
import { SingletonBeacon } from './singleton.js';
import { SMTAggregateBeacon } from './smt-aggregate.js';

/**
 * Beacon Factory pattern to create Beacon instances.
 * @class BeaconFactory
 * @type {BeaconFactory}
 */
export class BeaconFactory {
  static establish(service: BeaconService, sidecar?: SidecarData): Beacon {
    switch (service.type) {
      case 'SingletonBeacon':
        return new SingletonBeacon(service, sidecar);
      case 'CIDAggregateBeacon':
        return new CIDAggregateBeacon(service, sidecar);
      case 'SMTAggregateBeacon':
        return new SMTAggregateBeacon(service, sidecar);
      default:
        throw new Btc1Error('Invalid Beacon Type', 'INVALID_BEACON_ERROR', { service, sidecar });
    }
  }
}
