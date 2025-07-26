import { Psbt } from 'bitcoinjs-lib';
import bitcoin from '../../src/bitcoin/index.js';
import { AddressUtxo } from '../../src/bitcoin/rest-client.js';
import { Btc1KeyManager } from '../../src/index.js';
import { SchnorrKeyPair } from '@did-btc1/keypair';

const [fragment = '#initialP2PKH', uri = 'did:btc1:k1qyp3al8fedye95ueca9ezrmcm49vhur3zhze49wlgyfzdl5qk4dgltccfavpw'] = process.argv.slice(2);

if(!uri) {
  throw new Error('Controller is required as the second argument.');
}
const secretKey = Buffer.fromHex('4359bb2996ca9edb3566765cd8c5d56ee402399ec541f489273eb320f29f4ae8');
const keys = new SchnorrKeyPair({ secretKey });
const keyUri = Btc1KeyManager.computeKeyUri(uri, fragment);
await Btc1KeyManager.initialize(keys, keyUri);
const multikey = await Btc1KeyManager.getKeyPair();
if (!multikey) {
  throw new Error('Multikey not found.');
}
const sender = 'mv6FGwgr91ZzW4vT5GWEoXDPMk29j1LRpP';
const receiver = 'mh9sw9VFe82gNUBbuLXAkBhS42Z1c6JH8E';
const utxos = await bitcoin.rest.address.getUtxos(sender);
console.log('utxos:', utxos);
const utxo: AddressUtxo = utxos.sort((a, b) => b.status.block_height - a.status.block_height)[0];
console.log('utxo:', utxo);
const signer = {
  publicKey   : multikey.publicKey.compressed,
  network     : bitcoin.network.data,
  sign        : (hash: Uint8Array) => multikey.sign(hash, { scheme: 'schnorr' }),
  signSchnorr : (hash: Uint8Array) => multikey.sign(hash),
};
const {txid, vout} = utxo;
const prevTx = await bitcoin.rest.transaction.getHex(txid);
console.log('prevTx:', prevTx);
const input = {
  hash           : txid,
  index          : vout,
  nonWitnessUtxo : Buffer.from(prevTx, 'hex')
};
console.log('input:', input);
const signedSpendTx  = new Psbt({ network: bitcoin.network.data })
  .addInput(input)
  .addOutput({ address: receiver, value: BigInt(utxo.value) - BigInt(250) })
  .signAllInputs(signer)
  .finalizeAllInputs()
  .extractTransaction()
  .toHex();
console.log('signedSpendTx:', signedSpendTx);

const spentTx = await bitcoin.rest.transaction.send(signedSpendTx);
console.log('spentTx:', spentTx);