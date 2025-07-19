[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / IBitcoinRpc

# Interface: IBitcoinRpc

Defined in: [packages/method/src/bitcoin/interface.ts:28](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L28)

Interface for the Bitcoin Core RPC client.

## Methods

### abandonTransaction()

> **abandonTransaction**(`txid`): `Promise`\<`void`\>

Defined in: [packages/method/src/bitcoin/interface.ts:33](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L33)

Marks a transaction and its in-wallet descendants as abandoned, allowing their inputs to be respent.

#### Parameters

##### txid

`string`

#### Returns

`Promise`\<`void`\>

***

### abortRescan()

> **abortRescan**(): `Promise`\<`void`\>

Defined in: [packages/method/src/bitcoin/interface.ts:36](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L36)

Stops the current wallet rescan triggered by an RPC call, such as by an importprivkey call.

#### Returns

`Promise`\<`void`\>

***

### addMultiSigAddress()

> **addMultiSigAddress**(`__namedParameters`): `Promise`\<`string`\>

Defined in: [packages/method/src/bitcoin/interface.ts:39](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L39)

Adds a multi-signature address with n required signatures and a set of keys.

#### Parameters

##### \_\_namedParameters

[`AddMultiSigAddressParams`](../type-aliases/AddMultiSigAddressParams.md)

#### Returns

`Promise`\<`string`\>

***

### addWitnessAddress()

> **addWitnessAddress**(`address`): `Promise`\<`void`\>

Defined in: [packages/method/src/bitcoin/interface.ts:42](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L42)

Adds a witness address for SegWit compatibility.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`void`\>

***

### backupWallet()

> **backupWallet**(`destination`): `Promise`\<`void`\>

Defined in: [packages/method/src/bitcoin/interface.ts:45](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L45)

Backs up the wallet file to a specified destination.

#### Parameters

##### destination

`string`

#### Returns

`Promise`\<`void`\>

***

### bumpFee()

> **bumpFee**(`txid`, `options?`): `Promise`\<[`BumpFeeResult`](../type-aliases/BumpFeeResult.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:48](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L48)

Increases the fee of an unconfirmed transaction to improve its confirmation time.

#### Parameters

##### txid

`string`

##### options?

[`BumpFeeOption`](../type-aliases/BumpFeeOption.md)

#### Returns

`Promise`\<[`BumpFeeResult`](../type-aliases/BumpFeeResult.md)\>

***

### clearBanned()

> **clearBanned**(): `Promise`\<`void`\>

Defined in: [packages/method/src/bitcoin/interface.ts:51](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L51)

Removes all banned nodes from the ban list.

#### Returns

`Promise`\<`void`\>

***

### combineRawTransaction()

> **combineRawTransaction**(`txs`): `Promise`\<`string`\>

Defined in: [packages/method/src/bitcoin/interface.ts:54](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L54)

Combines multiple raw transactions into a single transaction.

#### Parameters

##### txs

`string`[]

#### Returns

`Promise`\<`string`\>

***

### command()?

> `optional` **command**\<`R`\>(`methods`): `Promise`\<readonly `R`[]\>

Defined in: [packages/method/src/bitcoin/interface.ts:30](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L30)

Executes multiple commands in a batch request.

#### Type Parameters

##### R

`R` *extends* `unknown`

#### Parameters

##### methods

[`BatchOption`](../type-aliases/BatchOption.md)[]

#### Returns

`Promise`\<readonly `R`[]\>

***

### createMultiSig()

> **createMultiSig**(`nrequired`, `keys`): `Promise`\<[`CreateMultiSigResult`](../type-aliases/CreateMultiSigResult-1.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:57](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L57)

Creates a multi-signature address with n required signatures and a set of keys.

#### Parameters

##### nrequired

`number`

##### keys

`string`[]

#### Returns

`Promise`\<[`CreateMultiSigResult`](../type-aliases/CreateMultiSigResult-1.md)\>

***

### createRawTransaction()

> **createRawTransaction**(`inputs`, `outputs`, `locktime?`, `replacable?`): `Promise`\<`string`\>

Defined in: [packages/method/src/bitcoin/interface.ts:60](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L60)

Creates a raw transaction spending specified inputs to specified outputs.

#### Parameters

##### inputs

[`CreateRawTxInputs`](../type-aliases/CreateRawTxInputs.md)[]

##### outputs

[`CreateRawTxOutputs`](../type-aliases/CreateRawTxOutputs.md)[]

##### locktime?

`number`

##### replacable?

`boolean`

#### Returns

`Promise`\<`string`\>

***

### createWallet()

> **createWallet**(`__namedParameters`): `Promise`\<[`CreateWalletResult`](../type-aliases/CreateWalletResult.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:63](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L63)

Creates a new wallet with various optional parameters.

#### Parameters

##### \_\_namedParameters

[`CreateWalletParams`](../type-aliases/CreateWalletParams.md)

#### Returns

`Promise`\<[`CreateWalletResult`](../type-aliases/CreateWalletResult.md)\>

***

### decodeRawTransaction()

> **decodeRawTransaction**(`hexstring`): `Promise`\<[`DecodedRawTransaction`](../type-aliases/DecodedRawTransaction.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:74](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L74)

Decodes a raw transaction hex string.

#### Parameters

##### hexstring

`string`

#### Returns

`Promise`\<[`DecodedRawTransaction`](../type-aliases/DecodedRawTransaction.md)\>

***

### decodeScript()

> **decodeScript**(`hexstring`): `Promise`\<[`ScriptDecoded`](../type-aliases/ScriptDecoded.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:77](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L77)

Decodes a hex-encoded script.

#### Parameters

##### hexstring

`string`

#### Returns

`Promise`\<[`ScriptDecoded`](../type-aliases/ScriptDecoded.md)\>

***

### disconnectNode()

> **disconnectNode**(`address?`, `nodeid?`): `Promise`\<`void`\>

Defined in: [packages/method/src/bitcoin/interface.ts:80](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L80)

Disconnects a node by address or node ID.

#### Parameters

##### address?

`string`

##### nodeid?

`number`

#### Returns

`Promise`\<`void`\>

***

### dumpPrivKey()

> **dumpPrivKey**(`address`): `Promise`\<`string`\>

Defined in: [packages/method/src/bitcoin/interface.ts:83](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L83)

Reveals the private key corresponding to an address.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`string`\>

***

### dumpWallet()

> **dumpWallet**(`filename`): `Promise`\<\{ `filename`: `string`; \}\>

Defined in: [packages/method/src/bitcoin/interface.ts:86](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L86)

Dumps all wallet keys and metadata to a file.

#### Parameters

##### filename

`string`

#### Returns

`Promise`\<\{ `filename`: `string`; \}\>

***

### encryptWallet()

> **encryptWallet**(`passphrase`): `Promise`\<`void`\>

Defined in: [packages/method/src/bitcoin/interface.ts:89](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L89)

Encrypts the wallet with a passphrase.

#### Parameters

##### passphrase

`string`

#### Returns

`Promise`\<`void`\>

***

### estimateSmartFee()

> **estimateSmartFee**(`conf_target`, `estimate_mode?`): `Promise`\<\{ `blocks?`: `number`; `errors?`: `string`[]; `feerate?`: `number`; \}\>

Defined in: [packages/method/src/bitcoin/interface.ts:92](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L92)

Estimates the fee rate for a given confirmation target.

#### Parameters

##### conf\_target

`number`

##### estimate\_mode?

[`FeeEstimateMode`](../type-aliases/FeeEstimateMode.md)

#### Returns

`Promise`\<\{ `blocks?`: `number`; `errors?`: `string`[]; `feerate?`: `number`; \}\>

***

### fundRawTransaction()

> **fundRawTransaction**(`hexstring`, `options`): `Promise`\<\{ `changepos`: `number`; `fee`: `number`; `hex`: `string`; \}\>

Defined in: [packages/method/src/bitcoin/interface.ts:98](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L98)

Funds a raw transaction by adding necessary inputs and change.

#### Parameters

##### hexstring

`string`

##### options

[`FundRawTxOptions`](../type-aliases/FundRawTxOptions.md)

#### Returns

`Promise`\<\{ `changepos`: `number`; `fee`: `number`; `hex`: `string`; \}\>

***

### getBlock()

> **getBlock**(`__namedParameters`): `Promise`\<`undefined` \| [`BlockResponse`](../type-aliases/BlockResponse.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:110](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L110)

Gets detailed information about a specific block.

#### Parameters

##### \_\_namedParameters

[`GetBlockParams`](GetBlockParams.md)

#### Returns

`Promise`\<`undefined` \| [`BlockResponse`](../type-aliases/BlockResponse.md)\>

***

### getBlockchainInfo()

> **getBlockchainInfo**(): `Promise`\<[`ChainInfo`](../type-aliases/ChainInfo.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:113](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L113)

Retrieves general blockchain state info.

#### Returns

`Promise`\<[`ChainInfo`](../type-aliases/ChainInfo.md)\>

***

### getBlockCount()

> **getBlockCount**(): `Promise`\<`number`\>

Defined in: [packages/method/src/bitcoin/interface.ts:104](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L104)

Returns the number of blocks in the longest blockchain.

#### Returns

`Promise`\<`number`\>

***

### getBlockHash()

> **getBlockHash**(`height`): `Promise`\<`string`\>

Defined in: [packages/method/src/bitcoin/interface.ts:107](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L107)

Gets the hash of a block at a given height.

#### Parameters

##### height

`number`

#### Returns

`Promise`\<`string`\>

***

### getConnectionCount()

> **getConnectionCount**(): `Promise`\<`number`\>

Defined in: [packages/method/src/bitcoin/interface.ts:116](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L116)

Gets the number of active connections to other nodes.

#### Returns

`Promise`\<`number`\>

***

### getDifficulty()

> **getDifficulty**(): `Promise`\<`number`\>

Defined in: [packages/method/src/bitcoin/interface.ts:119](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L119)

Gets the estimated network difficulty.

#### Returns

`Promise`\<`number`\>

***

### getMempoolInfo()

> **getMempoolInfo**(): `Promise`\<[`MempoolInfo`](../type-aliases/MempoolInfo.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:122](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L122)

Retrieves memory pool statistics.

#### Returns

`Promise`\<[`MempoolInfo`](../type-aliases/MempoolInfo.md)\>

***

### getMiningInfo()

> **getMiningInfo**(): `Promise`\<[`MiningInfo`](../type-aliases/MiningInfo.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:125](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L125)

Retrieves mining statistics.

#### Returns

`Promise`\<[`MiningInfo`](../type-aliases/MiningInfo.md)\>

***

### getNewAddress()

> **getNewAddress**(`account?`): `Promise`\<`string`\>

Defined in: [packages/method/src/bitcoin/interface.ts:128](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L128)

Gets a new Bitcoin address for receiving payments.

#### Parameters

##### account?

`string`

#### Returns

`Promise`\<`string`\>

***

### getPeerInfo()

> **getPeerInfo**(): `Promise`\<[`PeerInfo`](../type-aliases/PeerInfo.md)[]\>

Defined in: [packages/method/src/bitcoin/interface.ts:131](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L131)

Gets detailed peer connection information.

#### Returns

`Promise`\<[`PeerInfo`](../type-aliases/PeerInfo.md)[]\>

***

### sendRawTransaction()

> **sendRawTransaction**(`hexstring`, `maxfeerate?`, `maxBurnAmount?`): `Promise`\<`string`\>

Defined in: [packages/method/src/bitcoin/interface.ts:134](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L134)

Sends raw transaction hex to the Bitcoin network.

#### Parameters

##### hexstring

`string`

##### maxfeerate?

`string` | `number`

##### maxBurnAmount?

`string` | `number`

#### Returns

`Promise`\<`string`\>

***

### sendToAddress()

> **sendToAddress**(`address`, `amount`, `comment?`, `comment_to?`, `subtreactfeefromamount?`, `replaceable?`, `conf_target?`, `estimate_mode?`): `Promise`\<[`RawTransactionResponse`](../type-aliases/RawTransactionResponse.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:141](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L141)

Sends bitcoins to a specified address.

#### Parameters

##### address

`string`

##### amount

`number`

##### comment?

`string`

##### comment\_to?

`string`

##### subtreactfeefromamount?

`boolean`

##### replaceable?

`boolean`

##### conf\_target?

`number`

##### estimate\_mode?

[`FeeEstimateMode`](../type-aliases/FeeEstimateMode.md)

#### Returns

`Promise`\<[`RawTransactionResponse`](../type-aliases/RawTransactionResponse.md)\>

***

### validateAddress()

> **validateAddress**(`address`): `Promise`\<[`ValidateAddressResult`](../type-aliases/ValidateAddressResult.md)\>

Defined in: [packages/method/src/bitcoin/interface.ts:153](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L153)

Validates a Bitcoin address.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<[`ValidateAddressResult`](../type-aliases/ValidateAddressResult.md)\>

***

### verifyMessage()

> **verifyMessage**(`address`, `signature`, `message`): `Promise`\<`boolean`\>

Defined in: [packages/method/src/bitcoin/interface.ts:156](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L156)

Verifies a signed message.

#### Parameters

##### address

`string`

##### signature

`string`

##### message

`string`

#### Returns

`Promise`\<`boolean`\>

***

### walletLock()

> **walletLock**(`passphrase`, `timeout`): `Promise`\<`void`\>

Defined in: [packages/method/src/bitcoin/interface.ts:159](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/bitcoin/interface.ts#L159)

Locks the wallet, requiring a passphrase to unlock.

#### Parameters

##### passphrase

`string`

##### timeout

`number`

#### Returns

`Promise`\<`void`\>
