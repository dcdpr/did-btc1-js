# DID BTC1 JS

[![codecov](https://codecov.io/github/jintekc/did-btc1-js/branch/main/graph/badge.svg?token=6PYX9498RD)](https://codecov.io/github/jintekc/did-btc1-js)

did:btc1 is a censorship resistant DID Method using the Bitcoin blockchain as a Verifiable Data Registry to announce changes to the DID document. It improves on prior work by allowing: zero-cost off-chain DID creation; aggregated updates for scalable on-chain update costs; long-term identifiers that can support frequent updates; private communication of the DID document; private DID resolution; and non-repudiation appropriate for serious contracts.

did:btc1 is created for those who wish to have it all:

* resistance to censorship;
* non-correlation through pairwise DIDs;
* private communication of the DID document;
* a closed loop on private DID resolution;
* efficiency (in cost and energy usage), via offline DID creation and aggregatable updates;
* long-term identifiers that can support frequent updates; and
* Non-Repudiation appropriate for serious contracts.


## Technical Specification

To learn more about did:btc1 method, visit the specification at [dcdpr.github.io/did-btc1](https://dcdpr.github.io/did-btc1/).

## Implementation Documentation

To learn more about the JS/TS implementation and its component packages, visit the documentation at [btc1.tools/docs](https://btc1.tools/docs).

<!-- ## Demo -->
<!-- To see a demo using did:btc1, check out the demo website at [demo.btc1.tools](https://demo.btc1.tools/). -->

## Contributing

If you would like to contribute a fix or feature, please open an issue, fork the repo, follow the steps below to get the
project setup for local development and submit a PR from your fork to this repo.

* Fork did-btc1-js into your own account.

* Install the `pnpm` package manager.

```sh
npm i -g pnpm
```

* Clone the did-btc1-js monorepo.

```sh
git clone https://github.com/{USERNAME}/did-btc1-js.git
cd did-btc1-js
```

* Install project dependencies.

```sh
pnpm install
```

* Build project packages.

```sh
pnpm build
```

* Create a new branch off of `main`, make your changes, push and submit a cross repo PR from fork to this repo.

## Usage

To use the @did-btc1/method package in your own project, install it using your favorite package manager.

```sh
pnpm install @did-btc1/{common,cryptosuite,key-pair,method}
# Swap in npm or yarn depending on preference or requirement
```

Once installed, import the method to your project and use it to perform CRUD operations or interact with Beacons.

### CRUD operations

```ts
// ESM
import { DidBtc1, BeaconUtils, getNetwork } from "@did-btc1/method";
import { KeyPairUtils } from "@did-btc1/key-pair";

const idType = 'key';
const { publicKey } = KeyPairUtils.generate();
const pubKeyBytes = publicKey.bytes;

// Create
const { did, initialDocument } = await DidBtc1.create({ idType, pubKeyBytes })
console.log('{ did, initialDocument }', { did, initialDocument });

// Read / Resolve
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

```ts
// CommonJS
const { DidBtc1 } = require("@did-btc1/method");
const idType = 'key';
const pubKeyBytes = new Uint8Array(32);
const { did, initialDocument } = await DidBtc1.create({ idType, pubKeyBytes })
console.log('did', did);
console.log('initialDocument', initialDocument);
```

## Packages

* [@did-btc1/cryptosuite](/packages/cryptosuite/README.md)
* [@did-btc1/common](/packages/common/README.md)
* [@did-btc1/key-pair](/packages/key-pair/README.md)
* [@did-btc1/method](/packages/method/README.md)
* [@did-btc1/cli](/packages/cli/README.md)
* [@did-btc1/smt](/packages/smt/README.md)

## Package Versions

|                   package                      |                             npm                               |                               issues                                |                               prs                                  |
| ---------------------------------------------- | :-----------------------------------------------------------: | :-----------------------------------------------------------------: | :----------------------------------------------------------------: |
| [@did-btc1/common](/packages/common/)          | [![NPM Package][common-npm-badge]][common-npm-link]           | [![Open Issues][common-issues-badge]][common-issues-link]           | [![Open PRs][common-pulls-badge]][common-pulls-link]               |
| [@did-btc1/cryptosuite](/packages/cryptosuite) | [![NPM Package][cryptosuite-npm-badge]][cryptosuite-npm-link] | [![Open Issues][cryptosuite-issues-badge]][cryptosuite-issues-link] | [![Open PRs][cryptosuite-pulls-badge]][cryptosuite-pulls-link]     |
| [@did-btc1/key-pair](/packages/key-pair)       | [![NPM Package][key-pair-npm-badge]][key-pair-npm-link]       | [![Open Issues][key-pair-issues-badge]][key-pair-issues-link]       | [![Open PRs][key-pair-pulls-badge]][key-pair-pulls-link]           |
| [@did-btc1/method](/packages/method/)          | [![NPM Package][method-npm-badge]][method-npm-link]           | [![Open Issues][method-issues-badge]][method-issues-link]           | [![Open PRs][method-pulls-badge]][method-pulls-link]               |
| [@did-btc1/cli](/packages/cli/)                | [![NPM Package][cli-npm-badge]][cli-npm-link]                 | [![Open Issues][cli-issues-badge]][cli-issues-link]                 | [![Open PRs][cli-pulls-badge]][cli-pulls-link]                     |
| [@did-btc1/smt](/packages/smt/)                | [![NPM Package][smt-npm-badge]][smt-npm-link]                 | [![Open Issues][smt-issues-badge]][smt-issues-link]                 | [![Open PRs][smt-pulls-badge]][smt-pulls-link]                     |

## Project Resources

| Resource                                   | Description                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------- |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                  |
| [LICENSE](./LICENSE)                       | Project Open Source License [![MPL-2.0][mpl-license-badge]][mpl-license-link] |

[mpl-license-badge]: https://img.shields.io/badge/license-MPL%202.0-blue.svg
[mpl-license-link]: https://opensource.org/license/MPL-2.0

[common-npm-badge]: https://img.shields.io/npm/v/@did-btc1/common.svg?&color=green&santize=true
[common-npm-link]: https://www.npmjs.com/package/@did-btc1/common
[common-issues-badge]: https://img.shields.io/github/issues/jintekc/did-btc1-js/package:%20common?label=issues
[common-issues-link]: https://github.com/jintekc/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+common%22
[common-pulls-badge]: https://img.shields.io/github/issues-pr/jintekc/did-btc1-js/package%3A%20common?label=PRs
[common-pulls-link]: https://github.com/jintekc/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+common%22

[key-pair-npm-badge]: https://img.shields.io/npm/v/@did-btc1/key-pair.svg?&color=green&santize=true
[key-pair-npm-link]: https://www.npmjs.com/package/@did-btc1/key-pair
[key-pair-issues-badge]: https://img.shields.io/github/issues/jintekc/did-btc1-js/package:%20key-pair?label=issues
[key-pair-issues-link]: https://github.com/jintekc/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+key-pair%22
[key-pair-pulls-badge]: https://img.shields.io/github/issues-pr/jintekc/did-btc1-js/package%3A%20key-pair?label=PRs
[key-pair-pulls-link]: https://github.com/jintekc/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+key-pair%22

[cryptosuite-npm-badge]: https://img.shields.io/npm/v/@did-btc1/cryptosuite.svg?&color=green&santize=true
[cryptosuite-npm-link]: https://www.npmjs.com/package/@did-btc1/cryptosuite
[cryptosuite-issues-badge]: https://img.shields.io/github/issues/jintekc/did-btc1-js/package:%20cryptosuite?label=issues
[cryptosuite-issues-link]: https://github.com/jintekc/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+cryptosuite%22
[cryptosuite-pulls-badge]: https://img.shields.io/github/issues-pr/jintekc/did-btc1-js/package%3A%20cryptosuite?label=PRs
[cryptosuite-pulls-link]: https://github.com/jintekc/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+cryptosuite%22

[method-npm-badge]: https://img.shields.io/npm/v/@did-btc1/method.svg?&color=green&santize=true
[method-npm-link]: https://www.npmjs.com/package/@did-btc1/method
[method-issues-badge]: https://img.shields.io/github/issues/jintekc/did-btc1-js/package:%20method?label=issues
[method-issues-link]: https://github.com/jintekc/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+method%22
[method-pulls-badge]: https://img.shields.io/github/issues-pr/jintekc/did-btc1-js/package%3A%20method?label=PRs
[method-pulls-link]: https://github.com/jintekc/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+method%22

[cli-npm-badge]: https://img.shields.io/npm/v/@did-btc1/cli.svg?&color=green&santize=true
[cli-npm-link]: https://www.npmjs.com/package/@did-btc1/cli
[cli-issues-badge]: https://img.shields.io/github/issues/jintekc/did-btc1-js/package:%20cli?label=issues
[cli-issues-link]: https://github.com/jintekc/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+cli%22
[cli-pulls-badge]: https://img.shields.io/github/issues-pr/jintekc/did-btc1-js/package%3A%20cli?label=PRs
[cli-pulls-link]: https://github.com/jintekc/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+cli%22

[smt-npm-badge]: https://img.shields.io/npm/v/@did-btc1/smt.svg?&color=green&santize=true
[smt-npm-link]: https://www.npmjs.com/package/@did-btc1/smt
[smt-issues-badge]: https://img.shields.io/github/issues/jintekc/did-btc1-js/package:%20smt?label=issues
[smt-issues-link]: https://github.com/jintekc/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+smt%22
[smt-pulls-badge]: https://img.shields.io/github/issues-pr/jintekc/did-btc1-js/package%3A%20smt?label=PRs
[smt-pulls-link]: https://github.com/jintekc/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+smt%22
