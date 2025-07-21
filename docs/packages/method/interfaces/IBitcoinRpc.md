[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / IBitcoinRpc

# Interface: IBitcoinRpc

Defined in: [packages/method/src/bitcoin/interface.ts:28](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L28)

Interface for the Bitcoin Core RPC client.

## Methods

### abandonTransaction()

&gt; **abandonTransaction**(`txid`): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:33](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L33)

Marks a transaction and its in-wallet descendants as abandoned, allowing their inputs to be respent.

#### Parameters

##### txid

`string`

#### Returns

`Promise`\<`void`\&gt;

***

### abortRescan()

&gt; **abortRescan**(): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:36](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L36)

Stops the current wallet rescan triggered by an RPC call, such as by an importprivkey call.

#### Returns

`Promise`\<`void`\&gt;

***

### addMultiSigAddress()

&gt; **addMultiSigAddress**(`__namedParameters`): `Promise`\<`string`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:39](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L39)

Adds a multi-signature address with n required signatures and a set of keys.

#### Parameters

##### \_\_namedParameters

[`AddMultiSigAddressParams`](../type-aliases/AddMultiSigAddressParams.md)

#### Returns

`Promise`\<`string`\&gt;

***

### addWitnessAddress()

&gt; **addWitnessAddress**(`address`): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:42](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L42)

Adds a witness address for SegWit compatibility.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`void`\&gt;

***

### backupWallet()

&gt; **backupWallet**(`destination`): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:45](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L45)

Backs up the wallet file to a specified destination.

#### Parameters

##### destination

`string`

#### Returns

`Promise`\<`void`\&gt;

***

### bumpFee()

&gt; **bumpFee**(`txid`, `options?`): `Promise`\<[`BumpFeeResult`](../type-aliases/BumpFeeResult.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:48](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L48)

Increases the fee of an unconfirmed transaction to improve its confirmation time.

#### Parameters

##### txid

`string`

##### options?

[`BumpFeeOption`](../type-aliases/BumpFeeOption.md)

#### Returns

`Promise`\<[`BumpFeeResult`](../type-aliases/BumpFeeResult.md)\&gt;

***

### clearBanned()

&gt; **clearBanned**(): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:51](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L51)

Removes all banned nodes from the ban list.

#### Returns

`Promise`\<`void`\&gt;

***

### combineRawTransaction()

&gt; **combineRawTransaction**(`txs`): `Promise`\<`string`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:54](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L54)

Combines multiple raw transactions into a single transaction.

#### Parameters

##### txs

`string`[]

#### Returns

`Promise`\<`string`\&gt;

***

### command()?

&gt; `optional` **command**\<`R`\&gt;(`methods`): `Promise`\<readonly `R`[]\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:30](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L30)

Executes multiple commands in a batch request.

#### Type Parameters

##### R

`R` *extends* `unknown`

#### Parameters

##### methods

[`BatchOption`](../type-aliases/BatchOption.md)[]

#### Returns

`Promise`\<readonly `R`[]\&gt;

***

### createMultiSig()

&gt; **createMultiSig**(`nrequired`, `keys`): `Promise`\<[`CreateMultiSigResult`](../type-aliases/CreateMultiSigResult-1.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:57](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L57)

Creates a multi-signature address with n required signatures and a set of keys.

#### Parameters

##### nrequired

`number`

##### keys

`string`[]

#### Returns

`Promise`\<[`CreateMultiSigResult`](../type-aliases/CreateMultiSigResult-1.md)\&gt;

***

### createRawTransaction()

&gt; **createRawTransaction**(`inputs`, `outputs`, `locktime?`, `replacable?`): `Promise`\<`string`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:60](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L60)

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

`Promise`\<`string`\&gt;

***

### createWallet()

&gt; **createWallet**(`__namedParameters`): `Promise`\<[`CreateWalletResult`](../type-aliases/CreateWalletResult.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:63](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L63)

Creates a new wallet with various optional parameters.

#### Parameters

##### \_\_namedParameters

[`CreateWalletParams`](../type-aliases/CreateWalletParams.md)

#### Returns

`Promise`\<[`CreateWalletResult`](../type-aliases/CreateWalletResult.md)\&gt;

***

### decodeRawTransaction()

&gt; **decodeRawTransaction**(`hexstring`): `Promise`\<[`DecodedRawTransaction`](../type-aliases/DecodedRawTransaction.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:74](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L74)

Decodes a raw transaction hex string.

#### Parameters

##### hexstring

`string`

#### Returns

`Promise`\<[`DecodedRawTransaction`](../type-aliases/DecodedRawTransaction.md)\&gt;

***

### decodeScript()

&gt; **decodeScript**(`hexstring`): `Promise`\<[`ScriptDecoded`](../type-aliases/ScriptDecoded.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:77](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L77)

Decodes a hex-encoded script.

#### Parameters

##### hexstring

`string`

#### Returns

`Promise`\<[`ScriptDecoded`](../type-aliases/ScriptDecoded.md)\&gt;

***

### disconnectNode()

&gt; **disconnectNode**(`address?`, `nodeid?`): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:80](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L80)

Disconnects a node by address or node ID.

#### Parameters

##### address?

`string`

##### nodeid?

`number`

#### Returns

`Promise`\<`void`\&gt;

***

### dumpPrivKey()

&gt; **dumpPrivKey**(`address`): `Promise`\<`string`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:83](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L83)

Reveals the private key corresponding to an address.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`string`\&gt;

***

### dumpWallet()

&gt; **dumpWallet**(`filename`): `Promise`\<\{ `filename`: `string`; \}\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:86](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L86)

Dumps all wallet keys and metadata to a file.

#### Parameters

##### filename

`string`

#### Returns

`Promise`\<\{ `filename`: `string`; \}\&gt;

***

### encryptWallet()

&gt; **encryptWallet**(`passphrase`): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:89](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L89)

Encrypts the wallet with a passphrase.

#### Parameters

##### passphrase

`string`

#### Returns

`Promise`\<`void`\&gt;

***

### estimateSmartFee()

&gt; **estimateSmartFee**(`conf_target`, `estimate_mode?`): `Promise`\<\{ `blocks?`: `number`; `errors?`: `string`[]; `feerate?`: `number`; \}\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:92](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L92)

Estimates the fee rate for a given confirmation target.

#### Parameters

##### conf\_target

`number`

##### estimate\_mode?

[`FeeEstimateMode`](../type-aliases/FeeEstimateMode.md)

#### Returns

`Promise`\<\{ `blocks?`: `number`; `errors?`: `string`[]; `feerate?`: `number`; \}\&gt;

***

### fundRawTransaction()

&gt; **fundRawTransaction**(`hexstring`, `options`): `Promise`\<\{ `changepos`: `number`; `fee`: `number`; `hex`: `string`; \}\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:98](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L98)

Funds a raw transaction by adding necessary inputs and change.

#### Parameters

##### hexstring

`string`

##### options

[`FundRawTxOptions`](../type-aliases/FundRawTxOptions.md)

#### Returns

`Promise`\<\{ `changepos`: `number`; `fee`: `number`; `hex`: `string`; \}\&gt;

***

### getBlock()

&gt; **getBlock**(`__namedParameters`): `Promise`\<`undefined` \| [`BlockResponse`](../type-aliases/BlockResponse.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:110](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L110)

Gets detailed information about a specific block.

#### Parameters

##### \_\_namedParameters

[`GetBlockParams`](GetBlockParams.md)

#### Returns

`Promise`\<`undefined` \| [`BlockResponse`](../type-aliases/BlockResponse.md)\&gt;

***

### getBlockchainInfo()

&gt; **getBlockchainInfo**(): `Promise`\<[`ChainInfo`](../type-aliases/ChainInfo.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:113](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L113)

Retrieves general blockchain state info.

#### Returns

`Promise`\<[`ChainInfo`](../type-aliases/ChainInfo.md)\&gt;

***

### getBlockCount()

&gt; **getBlockCount**(): `Promise`\<`number`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:104](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L104)

Returns the number of blocks in the longest blockchain.

#### Returns

`Promise`\<`number`\&gt;

***

### getBlockHash()

&gt; **getBlockHash**(`height`): `Promise`\<`string`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:107](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L107)

Gets the hash of a block at a given height.

#### Parameters

##### height

`number`

#### Returns

`Promise`\<`string`\&gt;

***

### getConnectionCount()

&gt; **getConnectionCount**(): `Promise`\<`number`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:116](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L116)

Gets the number of active connections to other nodes.

#### Returns

`Promise`\<`number`\&gt;

***

### getDifficulty()

&gt; **getDifficulty**(): `Promise`\<`number`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:119](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L119)

Gets the estimated network difficulty.

#### Returns

`Promise`\<`number`\&gt;

***

### getMempoolInfo()

&gt; **getMempoolInfo**(): `Promise`\<[`MempoolInfo`](../type-aliases/MempoolInfo.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:122](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L122)

Retrieves memory pool statistics.

#### Returns

`Promise`\<[`MempoolInfo`](../type-aliases/MempoolInfo.md)\&gt;

***

### getMiningInfo()

&gt; **getMiningInfo**(): `Promise`\<[`MiningInfo`](../type-aliases/MiningInfo.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:125](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L125)

Retrieves mining statistics.

#### Returns

`Promise`\<[`MiningInfo`](../type-aliases/MiningInfo.md)\&gt;

***

### getNewAddress()

&gt; **getNewAddress**(`account?`): `Promise`\<`string`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:128](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L128)

Gets a new Bitcoin address for receiving payments.

#### Parameters

##### account?

`string`

#### Returns

`Promise`\<`string`\&gt;

***

### getPeerInfo()

&gt; **getPeerInfo**(): `Promise`\<[`PeerInfo`](../type-aliases/PeerInfo.md)[]\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:131](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L131)

Gets detailed peer connection information.

#### Returns

`Promise`\<[`PeerInfo`](../type-aliases/PeerInfo.md)[]\&gt;

***

### sendRawTransaction()

&gt; **sendRawTransaction**(`hexstring`, `maxfeerate?`, `maxBurnAmount?`): `Promise`\<`string`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:134](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L134)

Sends raw transaction hex to the Bitcoin network.

#### Parameters

##### hexstring

`string`

##### maxfeerate?

`string` | `number`

##### maxBurnAmount?

`string` | `number`

#### Returns

`Promise`\<`string`\&gt;

***

### sendToAddress()

&gt; **sendToAddress**(`address`, `amount`, `comment?`, `comment_to?`, `subtreactfeefromamount?`, `replaceable?`, `conf_target?`, `estimate_mode?`): `Promise`\<[`RawTransactionResponse`](../type-aliases/RawTransactionResponse.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:141](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L141)

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

`Promise`\<[`RawTransactionResponse`](../type-aliases/RawTransactionResponse.md)\&gt;

***

### validateAddress()

&gt; **validateAddress**(`address`): `Promise`\<[`ValidateAddressResult`](../type-aliases/ValidateAddressResult.md)\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:153](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L153)

Validates a Bitcoin address.

#### Parameters

##### address

`string`

#### Returns

`Promise`\<[`ValidateAddressResult`](../type-aliases/ValidateAddressResult.md)\&gt;

***

### verifyMessage()

&gt; **verifyMessage**(`address`, `signature`, `message`): `Promise`\<`boolean`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:156](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L156)

Verifies a signed message.

#### Parameters

##### address

`string`

##### signature

`string`

##### message

`string`

#### Returns

`Promise`\<`boolean`\&gt;

***

### walletLock()

&gt; **walletLock**(`passphrase`, `timeout`): `Promise`\<`void`\&gt;

Defined in: [packages/method/src/bitcoin/interface.ts:159](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/bitcoin/interface.ts#L159)

Locks the wallet, requiring a passphrase to unlock.

#### Parameters

##### passphrase

`string`

##### timeout

`number`

#### Returns

`Promise`\<`void`\&gt;
