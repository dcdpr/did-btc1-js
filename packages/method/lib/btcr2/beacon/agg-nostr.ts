import { BeaconCoordinator } from '../../../src/btc1/beacon/aggregation/coordinator.js';
import { NostrAdapter } from '../../../src/btc1/beacon/aggregation/protocol/nostr.js';

const nostr = new NostrAdapter();
const coordinator = new BeaconCoordinator(nostr);
await coordinator.protocol.start();