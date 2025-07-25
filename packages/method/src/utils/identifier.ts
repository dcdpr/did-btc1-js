import { BitcoinNetworkNames, Btc1Error, Btc1IdentifierTypes, Bytes, INVALID_DID, METHOD_NOT_SUPPORTED } from '@did-btc1/common';
import { PublicKey, SchnorrKeyPair } from '@did-btc1/keypair';
import { bech32m } from '@scure/base';
import { DidComponents } from './appendix.js';

/**
 * Implements {@link https://dcdpr.github.io/did-btc1/#syntax | 3 Syntax}.
 * A did:btc1 DID consists of a did:btc1 prefix, followed by an id-bech32 value, which is a Bech32m encoding of:
 *    - the specification version;
 *    - the Bitcoin network identifier; and
 *    - either:
 *      - a key-value representing a secp256k1 public key; or
 *      - a hash-value representing the hash of an initiating external DID document.
 * @class Btc1Identifier
 * @type {Btc1Identifier}
 */
export class Btc1Identifier {
  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#didbtc1-identifier-encoding | 3.2 did:btc1 Identifier Encoding}.
   *
   * A did:btc1 DID consists of a did:btc1 prefix, followed by an id-bech32 value, which is a Bech32m encoding of:
   *  - the specification version;
   *  - the Bitcoin network identifier; and
   *  - either:
   *    - a key-value representing a secp256k1 public key; or
   *    - a hash-value representing the hash of an initiating external DID document.
   *
   * @param {CreateIdentifierParams} params See {@link CreateIdentifierParams} for details.
   * @param {Btc1IdentifierTypes} params.idType Identifier type (key or external).
   * @param {string} params.network Bitcoin network name.
   * @param {number} params.version Identifier version.
   * @param {KeyBytes | DocumentBytes} params.genesisBytes Public key or an intermediate document bytes.
   * @returns {string} The new did:btc1 identifier.
   */
  public static encode({ idType, version, network, genesisBytes }: {
    idType: string;
    version: number;
    network: string | number;
    genesisBytes: Bytes;
  }): string {
    // 1. If idType is not a valid value per above, raise invalidDid error.
    if (!(idType in Btc1IdentifierTypes)) {
      throw new Btc1Error('Expected "idType" to be "KEY" or "EXTERNAL"', INVALID_DID, {idType});
    }

    // 2. If version is greater than 1, raise invalidDid error.
    if (isNaN(version) || version > 1) {
      throw new Btc1Error('Expected "version" to be 1', INVALID_DID, {version});
    }

    // 3. If network is not a valid value (bitcoin|signet|regtest|testnet3|testnet4|number), raise invalidDid error.
    if (typeof network === 'string' && !(network in BitcoinNetworkNames)) {
      throw new Btc1Error('Invalid "network" name', INVALID_DID, {network});
    }

    // 4. If network is a number and is outside the range of 1-8, raise invalidDid error.
    if(typeof network === 'number' && (network < 0 || network > 8)) {
      throw new Btc1Error('Invalid "network" number', INVALID_DID, {network});
    }

    // 5. If idType is “key” and genesisBytes is not a valid compressed secp256k1 public key, raise invalidDid error.
    if (idType === 'KEY') {
      try {
        new PublicKey(genesisBytes);
      } catch {
        throw new Btc1Error(
          'Expected "genesisBytes" to be a valid compressed secp256k1 public key',
          INVALID_DID, { genesisBytes }
        );
      }
    }

    // 6. Map idType to hrp from the following:
    //   6.1 “key” - “k”
    //   6.2 “external” - “x”
    const hrp = idType === 'KEY' ? 'k' : 'x';

    // 7. Create an empty nibbles numeric array.
    const nibbles: Array<number> = [];

    // 8. Set fCount equal to (version - 1) / 15, rounded down.
    const fCount = Math.floor((version - 1) / 15);

    // 9. Append hexadecimal F (decimal 15) to nibbles fCount times.
    for (let i = 0; i < fCount; i++) {
      nibbles.push(15);
    }

    // 10. Append (version - 1) mod 15 to nibbles.
    nibbles.push((version - 1) % 15);

    // 11. If network is a string, append the numeric value from the following map to nibbles:
    //     "bitcoin" - 0
    //     "signet" - 1
    //     "regtest" - 2
    //     "testnet3" - 3
    //     "testnet4" - 4
    //     "mutinynet" - 5
    if(typeof network === 'string') {
      nibbles.push(BitcoinNetworkNames[network as keyof typeof BitcoinNetworkNames]);
    } else if (typeof network === 'number') {
      // 12. If network is a number, append network + 11 to nibbles.
      nibbles.push(network + 11);
    }

    // 13. If the number of entries in nibbles is odd, append 0.
    if (nibbles.length % 2 !== 0) {
      nibbles.push(0);
    }

    // 14. Create a dataBytes byte array from nibbles, where index is from 0 to nibbles.length / 2 - 1 and
    //     encodingBytes[index] = (nibbles[2 * index] << 4) | nibbles[2 * index + 1].
    if (fCount !== 0){
      for(let index in Array.from({ length: (nibbles.length / 2) - 1 })) {
        throw new Btc1Error('Not implemented', 'NOT_IMPLEMENTED', { index });
      }
    }
    const dataBytes = new Uint8Array([(nibbles[2 * 0] << 4) | nibbles[2 * 0 + 1], ...genesisBytes]);

    // 15. Set identifier to “did:btc1:”.
    // 16. Pass hrp and dataBytes to the Bech32m Encoding algorithm, retrieving encodedString.
    // 17. Append encodedString to identifier.
    // 18. Return identifier.
    return `did:btc1:${bech32m.encodeFromBytes(hrp, dataBytes)}`;
  }

  /**
   * Implements {@link https://dcdpr.github.io/did-btc1/#didbtc1-identifier-decoding | 3.3 did:btc1 Identifier Decoding}.
   * @param {string} identifier The BTC1 DID to be parsed
   * @returns {DidComponents} The parsed identifier components. See {@link DidComponents} for details.
   * @throws {DidError} if an error occurs while parsing the identifier
   * @throws {DidErrorCode.InvalidDid} if identifier is invalid
   * @throws {DidErrorCode.MethodNotSupported} if the method is not supported
   */
  public static decode(identifier: string): DidComponents {
    // 1. Split identifier into an array of components at the colon : character.
    const components = identifier.split(':');

    // 2. If the length of the components array is not 3, raise invalidDid error.
    if (components.length !== 3){
      throw new Btc1Error(`Invalid did: ${identifier}`, INVALID_DID, { identifier });
    }

    // Deconstruct the components of the identifier: scheme, method, encoded
    const [scheme, method, encoded] = components;

    // 3. If components[0] is not “did”, raise invalidDid error.
    if (scheme !== 'did') {
      throw new Btc1Error(`Invalid did: ${identifier}`, INVALID_DID, { identifier });
    }
    // 4. If components[1] is not “btc1”, raise methodNotSupported error.
    if (method !== 'btc1') {
      throw new Btc1Error(`Invalid did method: ${method}`, METHOD_NOT_SUPPORTED, { identifier });
    }

    // 5. Set encodedString to components[2].
    if (!encoded) {
      throw new Btc1Error(`Invalid method-specific id: ${identifier}`, INVALID_DID, { identifier });
    }
    // 6. Pass encodedString to the Bech32m Decoding algorithm, retrieving hrp and dataBytes.
    const {prefix: hrp, bytes: dataBytes} = bech32m.decodeToBytes(encoded);

    // 7. If the Bech32m decoding algorithm fails, raise invalidDid error.
    if (!['x', 'k'].includes(hrp)) {
      throw new Btc1Error(`Invalid hrp: ${hrp}`, INVALID_DID, { identifier });
    }
    if (!dataBytes) {
      throw new Btc1Error(`Failed to decode id: ${encoded}`, INVALID_DID, { identifier });
    }

    // 8. Map hrp to idType from the following:
    //    “k” - “key”
    //    “x” - “external”
    //    other - raise invalidDid error
    const idType = hrp === 'k' ? 'KEY' : 'EXTERNAL';

    // 9. Set version to 1.
    let version = 1;
    let byteIndex = 0;
    // 10. If at any point in the remaining steps there are not enough nibbles to complete the process,
    //     raise invalidDid error.
    let nibblesConsumed = 0;

    // 11. Start with the first nibble (the higher nibble of the first byte) of dataBytes.
    let currentByte = dataBytes[byteIndex];
    let versionNibble = currentByte >>> 4;

    // 12. Add the value of the current nibble to version.
    while (versionNibble === 0xF) {
      // 13. If the value of the nibble is hexadecimal F (decimal 15), advance to the next nibble (the lower nibble of
      //     the current byte or the higher nibble of the next byte) and return to the previous step.
      version += 15;

      if (nibblesConsumed % 2 === 0) {
        versionNibble = currentByte & 0x0F;
      } else {
        currentByte = dataBytes[++byteIndex];
        versionNibble = currentByte >>> 4;
      }
      nibblesConsumed += 1;
      // 14. If version is greater than 1, raise invalidDid error.
      if (version > 1) {
        throw new Btc1Error(`Invalid version: ${version}`, INVALID_DID, { identifier });
      }
    }

    version += versionNibble;
    nibblesConsumed += 1;

    // 15. Advance to the next nibble and set networkValue to its value.
    let networkValue: number = nibblesConsumed % 2 === 0
      ? dataBytes[++byteIndex] >>> 4
      : currentByte & 0x0F;

    nibblesConsumed += 1;

    // 16. Map networkValue to network from the following:
    //     0 - "bitcoin"
    //     1 - "signet"
    //     2 - "regtest"
    //     3 - "testnet3"
    //     4 - "testnet4"
    //     5 - "mutinynet"
    //     6-7 - raise invalidDid error
    //     8-F - networkValue - 11
    let network: string | number | undefined = BitcoinNetworkNames[networkValue];
    if (!network) {
      if (networkValue >= 0x8 && networkValue <= 0xF) {
        network = networkValue - 11;
      } else {
        throw new Btc1Error(`Invalid did: ${identifier}`, INVALID_DID, { identifier });
      }
    }

    // 17. If the number of nibbles consumed is odd:
    if (nibblesConsumed % 2 === 1) {
      //     17.1 Advance to the next nibble and set fillerNibble to its value.
      const fillerNibble = currentByte & 0x0F;
      //     17.2 If fillerNibble is not 0, raise invalidDid error.
      if (fillerNibble !== 0) {
        throw new Btc1Error(`Invalid did: ${identifier}`, INVALID_DID, { identifier });
      }
    }

    // 18. Set genesisBytes to the remaining dataBytes.
    const genesisBytes = dataBytes.slice(byteIndex + 1);

    // 19. If idType is “key” and genesisBytes is not a valid compressed secp256k1 public key, raise invalidDid error.
    if (idType === 'KEY') {
      try {
        new PublicKey(genesisBytes);
      } catch {
        throw new Btc1Error(`Invalid genesisBytes: ${genesisBytes}`, INVALID_DID, { identifier });
      }
    }

    // 20. Return idType, version, network, and genesisBytes.
    return {idType, hrp, version, network, genesisBytes} as DidComponents;
  }

  /**
   * Generates a new did:btc1 identifier based on a newly generated key pair.
   * @returns {string} The new did:btc1 identifier.
   */
  public static generate(): { keys: SchnorrKeyPair; identifier: { controller: string; id: string } } {
    const keys = SchnorrKeyPair.generate();
    const did = this.encode({
      idType       : Btc1IdentifierTypes.KEY,
      version      : 1,
      network      : BitcoinNetworkNames.bitcoin,
      genesisBytes : keys.publicKey.compressed
    });

    return { keys, identifier: { controller: did, id: '#initialKey'} };
  }
}