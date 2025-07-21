[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / FeeEstimateMode

# Type Alias: FeeEstimateMode

&gt; **FeeEstimateMode** = `"UNSET"` \| `"ECONOMICAL"` \| `"CONSERVATIVE"`

Defined in: [packages/method/src/types/bitcoin.ts:112](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/bitcoin.ts#L112)

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
