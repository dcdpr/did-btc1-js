[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / signet

# Variable: signet

> `const` **signet**: `object`

Defined in: [packages/method/src/bitcoin/network.ts:7](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/network.ts#L7)

Represents the Signet network configuration.
Signet is a Bitcoin test network that requires block signing.

## Type declaration

### bech32

> **bech32**: `string` = `'tb'`

The Bech32 prefix used for Signet addresses (same as Testnet).

### bip32

> **bip32**: `object`

The BIP32 key prefixes for Signet (same as Testnet).

#### bip32.private

> **private**: `number` = `0x04358394`

The private key prefix for BIP32 extended private key.

#### bip32.public

> **public**: `number` = `0x043587cf`

The public key prefix for BIP32 extended public keys.

### messagePrefix

> **messagePrefix**: `string` = `'\x18Bitcoin Signed Message:\n'`

The message prefix used for signing Bitcoin messages on Signet.

### pubKeyHash

> **pubKeyHash**: `number` = `0x6f`

The prefix for Signet public key hashes (same as Testnet).

### scriptHash

> **scriptHash**: `number` = `0xc4`

The prefix for Signet script hashes (same as Testnet).

### wif

> **wif**: `number` = `0xef`

The prefix for Signet Wallet Import Format (WIF) private keys (same as Testnet).
