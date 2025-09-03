# DID BTC1 JS

[![codecov](https://codecov.io/github/dcdpr/did-btc1-js/branch/main/graph/badge.svg?token=6PYX9498RD)](https://codecov.io/github/dcdpr/did-btc1-js)

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

Visit [dcdpr.github.io/did-btc1](https://dcdpr.github.io/did-btc1/) to read the did:btc1 method specification.

## Monorepo Documentation

Visit [btc1.tools](https://btc1.tools) to learn more about the different packages in this monorepo.

## Method Documentation 

Visit [btc1.dev](https://btc1.dev/impls/ts) to learn more about the TypeScript implementation: [@did-btc1/method](https://www.npmjs.com/package/@did-btc1/method)

## Demo

Visit [demo.btc1.dev](https://demo.btc1.dev) to see [@did-btc1/method](https://www.npmjs.com/package/@did-btc1/method) in action.

## Packages

| Package                                          | Version                                                        | Issues                                                               | Pull Requests                                                       |
| :----------------------------------------------: | :------------------------------------------------------------: | :------------------------------------------------------------------: | :-----------------------------------------------------------------: |
| [@did-btc1/common](packages/common/)             | [![NPM Package][common-npm-badge]][common-npm-link]            | [![Open Issues][common-issues-badge]][common-issues-link]            | [![Open PRs][common-pulls-badge]][common-pulls-link]                |
| [@did-btc1/cryptosuite](packages/cryptosuite)    | [![NPM Package][cryptosuite-npm-badge]][cryptosuite-npm-link]  | [![Open Issues][cryptosuite-issues-badge]][cryptosuite-issues-link]  | [![Open PRs][cryptosuite-pulls-badge]][cryptosuite-pulls-link]      |
| [@did-btc1/keypair](packages/keypair)            | [![NPM Package][keypair-npm-badge]][keypair-npm-link]          | [![Open Issues][keypair-issues-badge]][keypair-issues-link]          | [![Open PRs][keypair-pulls-badge]][keypair-pulls-link]              |
| [@did-btc1/method](packages/method/)             | [![NPM Package][method-npm-badge]][method-npm-link]            | [![Open Issues][method-issues-badge]][method-issues-link]            | [![Open PRs][method-pulls-badge]][method-pulls-link]                |
| [@did-btc1/cli](packages/cli/)                   | [![NPM Package][cli-npm-badge]][cli-npm-link]                  | [![Open Issues][cli-issues-badge]][cli-issues-link]                  | [![Open PRs][cli-pulls-badge]][cli-pulls-link]                      |
| [@did-btc1/smt](packages/smt/)                   | [![NPM Package][smt-npm-badge]][smt-npm-link]                  | [![Open Issues][smt-issues-badge]][smt-issues-link]                  | [![Open PRs][smt-pulls-badge]][smt-pulls-link]                      |

## Project Resources

| Resource                                    | Description                                                                   |
| :------------------------------------------ | ----------------------------------------------------------------------------- |
| [CODEOWNERS](CODEOWNERS)                    | Outlines the project lead(s)                                                  |
| [LICENSE](LICENSE)                          | Project Open Source License [![MPL-2.0][mpl-license-badge]][mpl-license-link] |

[mpl-license-badge]: https://img.shields.io/badge/license-MPL%202.0-blue.svg
[mpl-license-link]: https://opensource.org/license/MPL-2.0

[common-npm-badge]: https://img.shields.io/npm/v/@did-btc1/common.svg?&color=green&santize=true
[common-npm-link]: https://www.npmjs.com/package/@did-btc1/common
[common-issues-badge]: https://img.shields.io/github/issues/dcdpr/did-btc1-js/package:%20common?label=issues
[common-issues-link]: https://github.com/dcdpr/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+common%22
[common-pulls-badge]: https://img.shields.io/github/issues-pr/dcdpr/did-btc1-js/package%3A%20common?label=PRs
[common-pulls-link]: https://github.com/dcdpr/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+common%22

[keypair-npm-badge]: https://img.shields.io/npm/v/@did-btc1/keypair.svg?&color=green&santize=true
[keypair-npm-link]: https://www.npmjs.com/package/@did-btc1/keypair
[keypair-issues-badge]: https://img.shields.io/github/issues/dcdpr/did-btc1-js/package:%20keypair?label=issues
[keypair-issues-link]: https://github.com/dcdpr/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+keypair%22
[keypair-pulls-badge]: https://img.shields.io/github/issues-pr/dcdpr/did-btc1-js/package%3A%20keypair?label=PRs
[keypair-pulls-link]: https://github.com/dcdpr/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+keypair%22

[cryptosuite-npm-badge]: https://img.shields.io/npm/v/@did-btc1/cryptosuite.svg?&color=green&santize=true
[cryptosuite-npm-link]: https://www.npmjs.com/package/@did-btc1/cryptosuite
[cryptosuite-issues-badge]: https://img.shields.io/github/issues/dcdpr/did-btc1-js/package:%20cryptosuite?label=issues
[cryptosuite-issues-link]: https://github.com/dcdpr/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+cryptosuite%22
[cryptosuite-pulls-badge]: https://img.shields.io/github/issues-pr/dcdpr/did-btc1-js/package%3A%20cryptosuite?label=PRs
[cryptosuite-pulls-link]: https://github.com/dcdpr/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+cryptosuite%22

[method-npm-badge]: https://img.shields.io/npm/v/@did-btc1/method.svg?&color=green&santize=true
[method-npm-link]: https://www.npmjs.com/package/@did-btc1/method
[method-issues-badge]: https://img.shields.io/github/issues/dcdpr/did-btc1-js/package:%20method?label=issues
[method-issues-link]: https://github.com/dcdpr/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+method%22
[method-pulls-badge]: https://img.shields.io/github/issues-pr/dcdpr/did-btc1-js/package%3A%20method?label=PRs
[method-pulls-link]: https://github.com/dcdpr/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+method%22

[cli-npm-badge]: https://img.shields.io/npm/v/@did-btc1/cli.svg?&color=green&santize=true
[cli-npm-link]: https://www.npmjs.com/package/@did-btc1/cli
[cli-issues-badge]: https://img.shields.io/github/issues/dcdpr/did-btc1-js/package:%20cli?label=issues
[cli-issues-link]: https://github.com/dcdpr/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+cli%22
[cli-pulls-badge]: https://img.shields.io/github/issues-pr/dcdpr/did-btc1-js/package%3A%20cli?label=PRs
[cli-pulls-link]: https://github.com/dcdpr/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+cli%22

[smt-npm-badge]: https://img.shields.io/npm/v/@did-btc1/smt.svg?&color=green&santize=true
[smt-npm-link]: https://www.npmjs.com/package/@did-btc1/smt
[smt-issues-badge]: https://img.shields.io/github/issues/dcdpr/did-btc1-js/package:%20smt?label=issues
[smt-issues-link]: https://github.com/dcdpr/did-btc1-js/issues?q=is%3Aopen+is%3Aissue+label%3A%22package%3A+smt%22
[smt-pulls-badge]: https://img.shields.io/github/issues-pr/dcdpr/did-btc1-js/package%3A%20smt?label=PRs
[smt-pulls-link]: https://github.com/dcdpr/did-btc1-js/pulls?q=is%3Aopen+is%3Apr+label%3A%22package%3A+smt%22
