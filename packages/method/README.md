# Method

TypeScript implementation of [did:btc1 DID Method](https://dcdpr.github.io/did-btc1/).

## Usage

1. Install the `method` package.

```sh
pnpm install @did-btc1/method @did-btc1/
# Swap in npm or yarn depending on preference or requirement
```

2. Import the method to perform CRUD operations.

### Create

**ESM**

```ts
import { DidBtc1 } from "@did-btc1/method";
import { getRandomValues } from 'crypto';
import * as tinysecp from 'tiny-secp256k1';

const secretKey = getRandomValues(new Uint8Array(32));
const pubKeyBytes = tinysecp.pointFromScalar(secretKey, true); // Or replace with your own pubKeyBytes

const { did, initialDocument } = await DidBtc1.create({ idType: 'KEY', pubKeyBytes })
console.log('{ did, initialDocument }', { did, initialDocument });
```

**CommonJS**

```js
const { DidBtc1 } = require("@did-btc1/method");
const pubKeyBytes = new Uint8Array(32);
const { did, initialDocument } = await DidBtc1.create({ idType: 'KEY', pubKeyBytes })
console.log('did', did);
console.log('initialDocument', initialDocument);
```

### Read (Resolve)

```ts
const resolution = await DidBtc1.resolve(did);
console.log('resolution', resolution);

const patch = JSON.patch.create([
  {
    op    : 'replace',
    path  : '/service/0',
    value : BeaconUtils.generateBeaconService({
      id          : identifier,
      publicKey   : Buffer.from(keyPair1.publicKey.hex, 'hex'),
      network     : getNetwork('regtest'),
      addressType : 'p2pkh',
      beaconType  : 'SingletonBeacon',
    })
  }
]);
// Update
const update = await DidBtc1.update({
  identifier           : did,
  sourceDocument       : initialDocument,
  sourceVersionId      : 1,
  patch                : JSON.patch.create([
    {
      op    : 'replace',
      path  : '/service/0',
      value : BeaconUtils.generateBeaconService({
        id          : identifier,
        publicKey   : Buffer.from(keyPair1.publicKey.hex, 'hex'),
        network     : getNetwork('regtest'),
        addressType : 'p2pkh',
        beaconType  : 'SingletonBeacon',
      })
    }
  ]),
  verificationMethodId : `#initialP2PKH`,
  beaconIds            : [`${did}#initialP2PKH`],
});

// TODO: Deactivate / Delete
```