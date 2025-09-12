import { BeaconCoordinator } from '../../../src/btcr2/beacon/aggregation/coordinator.js';
import { NostrAdapter } from '../../../src/btcr2/beacon/aggregation/protocol/nostr.js';

const nostr = new NostrAdapter();
const coordinator = new BeaconCoordinator(nostr);
await coordinator.protocol.start();