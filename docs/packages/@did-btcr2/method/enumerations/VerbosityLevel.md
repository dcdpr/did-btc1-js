# Enumeration: VerbosityLevel

Defined in: [packages/method/src/types/bitcoin.ts:998](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/types/bitcoin.ts#L998)

Defines verbosity levels for block and transaction outputs.
Used to specify the format of returned block or transaction data.
  VerbosityLevel for block and transaction outputs.

## Enumeration Members

### hex

> **hex**: `0`

Defined in: [packages/method/src/types/bitcoin.ts:1000](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/types/bitcoin.ts#L1000)

Return block or transaction data in raw hex-encoded format

***

### json

> **json**: `1`

Defined in: [packages/method/src/types/bitcoin.ts:1002](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/types/bitcoin.ts#L1002)

Return block or transaction data in JSON object format

***

### jsonext

> **jsonext**: `2`

Defined in: [packages/method/src/types/bitcoin.ts:1008](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/types/bitcoin.ts#L1008)

Return block or transaction data in JSON object format with additional information.
Returns block data with information about each transaction.
Returns transaction data with information about the transaction including fee and prevout information.

***

### jsonextprev

> **jsonextprev**: `3`

Defined in: [packages/method/src/types/bitcoin.ts:1013](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/types/bitcoin.ts#L1013)

Return block data in JSON object format with additional information.
Returns block data with information about each transaction, including prevout information for inputs.
