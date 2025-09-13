# Type Alias: FeeEstimateMode

> **FeeEstimateMode** = `"UNSET"` \| `"ECONOMICAL"` \| `"CONSERVATIVE"`

Defined in: [packages/method/src/types/bitcoin.ts:112](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/method/src/types/bitcoin.ts#L112)

unset
   - no mode set
economical
   - used if the transaction is replaceable
   - uses shorter time horizon to estimate
   - more responsive to short-term drops in the prevailing fee market
   - potentially returns a lower fee rate estimate
conservative
   - used is the transaction is not replaceable
   - use a longer time horizon to estimate
   - less responsive to short-term drops in the prevailing fee market
   - potentially returns a higher fee rate estimate
