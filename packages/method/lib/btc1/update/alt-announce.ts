import { Multikey } from '@did-btc1/cryptosuite';
import { KeyPair } from '@did-btc1/key-pair';
import { opcodes, Psbt, script } from 'bitcoinjs-lib';
import { Bitcoin } from '../../../src/bitcoin/index.js';
import { Btc1KeyManager } from '../../../src/index.js';
import initialDidDocument from '../../in/update/initial-document.json' with { type: 'json' };
import keyPair0 from '../../in/update/key-pair-0.json' with { type: 'json' };
import didUpdatePayload from '../../in/update/update.json' with { type: 'json' };

const bitcoin = new Bitcoin();

await Btc1KeyManager.initialize(KeyPair.from(keyPair0));
console.log('Btc1KeyManager.instance', Btc1KeyManager.instance);

const keyPair = await Btc1KeyManager.getKeyPair();
console.log('keyPair:', keyPair);
if (!keyPair) {
  throw new Error('Key pair not found.');
}
const [controller, id] = didUpdatePayload.patch[0].value.id.split('#');
const multikey = new Multikey({ id: `#${id}`, controller,  keyPair });
const signer = {
  publicKey : keyPair.publicKey.bytes,
  network   : 'regtest',
  sign      : (hash: Uint8Array) => {
    const signature = multikey.sign(hash);
    return signature;
  }
};

const bitcoinAddress = initialDidDocument.service[0].serviceEndpoint.replace('bitcoin:', '');
const utxos = await bitcoin.active.rest.getAddressUtxos(bitcoinAddress);
const utxo = utxos.sort((a, b) => b.status.block_height - a.status.block_height)[0];
console.log('utxo:', utxo);
const hash = utxo.txid;
const index = utxo.vout;
const prevTx = await bitcoin.active.rest.getTransactionVerbosity(hash, 'hex') as string;
console.log('prevTx:', prevTx);
const nonWitnessUtxo = Buffer.from(prevTx as string, 'hex');
const hashBytes = Buffer.from(await JSON.canonicalization.process(didUpdatePayload), 'hex');
const utxoValue = BigInt(utxo.value);
const feeRate = 200n;
const estimatedVsize = 200n;
const fee = feeRate * estimatedVsize;
const valueToSend = 1n;
const changeValue = utxoValue - valueToSend - fee;

const psbt = new Psbt({ network: bitcoin.active.network });
psbt.addInput({ hash, index, nonWitnessUtxo });
psbt.addOutput({ script: script.compile([opcodes.OP_RETURN, hashBytes]), value: valueToSend });
psbt.addOutput({ address: bitcoinAddress, value: changeValue });
psbt.signInput(index, signer);
psbt.finalizeInput(index);

// psbt.setMaximumFeeRate(1_000_000);
console.log('psbt:', psbt);

const spendTx = psbt.extractTransaction().toHex();
console.log('spendTx:', spendTx);


/*
    if(!utxos.length) {
      // TODO: Discuss what to do here because sending to a beacon address does not allow you to spend from it immediately.
      Logger.debug('No UTXOs found, funding address...');
      // Send BTC to the beacon address
      const funded = await bitcoin.active.rpc.sendToAddress(bitcoinAddress, 0.1);

      Logger.debug('Funded tx ...', funded);
      // Push the funded transaction to the inputs array
      inputs.push({ txid: funded.txid, vout: funded.vout.last()?.n } as CreateRawTxInputs);
      // TODO: Wait for the transaction to be confirmed before proceeding ??
    } else {
      // Sort the UTXOs by block height and filter for confirmed UTXOs
      const utxo = utxos
        .sort((a, b) => a.status.block_height - b.status.block_height)
        .filter(utxo => utxo.status.confirmed).last();

      // If no confirmed UTXOs, throw an error
      if(!utxo) {
        throw new SingletonBeaconError(
          'Beacon bitcoin address unfunded or utxos unconfirmed.',
          'UNFUNDED_BEACON_ADDRESS', { bitcoinAddress });
      }

      // Push the UTXO to the inputs array
      inputs.push({ txid: utxo.txid, vout: utxo.vin[0]?.vout } as CreateRawTxInputs);
    }

    // Check if inputs is empty
    if(!inputs || !inputs.length) {
      throw new SingletonBeaconError(
        'Beacon bitcoin address unfunded or utxos unconfirmed.',
        'UNFUNDED_BEACON_ADDRESS', { bitcoinAddress });
    }
    // Find the last UTXO that is confirmed
    const utxo = utxos.filter(utxo => utxo.status.confirmed).last();
    */
