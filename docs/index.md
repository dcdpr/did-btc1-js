---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: DID BTC1 JS
  text: Monorepo for did:btc1 js/ts implementation and supporting packages
  tagline: &gt;
    An implementation of did:btc1, a censorship-resistant DID Method using the Bitcoin blockchain as a Verifiable Data Registry to announce changes to the DID document.

  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Installation
      link: /installation
features:
  - icon: 🧱
    title: 'common'
    details: Common utilities, types, interfaces, etc. shared across the did-btc1-js monorepo packages.
  - icon: 🔐
    title: 'keypair'
    details: JavaScript/TypeScript implementation of secp256k1 public/private key pairs with BIP340 schnorr signatures. Used by various parts of the did-btc1-js monorepo.
  - icon: 🧬
    title: 'cryptosuite'
    details: JavaScript/TypeScript implementation of the Data Integrity BIP340 Cryptosuite v0.1 specification. Used by various parts of the did-btc1-js monorepo.
  - icon: 🌐
    title: 'method'
    details: Javascript/TypeScript reference implementation of the did:btc1 spec, a censorship resistant DID Method using the Bitcoin blockchain as a Verifiable Data Registry to announce changes to the DID document. Core package of the did-btc1-js monorepo.
  - icon: 💻
    title: 'cli'
    details: CLI for interacting with did-btc1-js, the JavaScript/TypeScript reference implementation of the did:btc1 method. Uses various parts of the did-btc1-js monorepo.
  - icon: 🌲
    title: 'smt'
    details: JavaScript/TypeScript implementation of a Sparse Merkle Tree (SMT) data structure with support for Merkle Sum (MS) non-inclusion. Used by various parts of the did-btc1-js monorepo.
---