[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / SidecarData

# Type Alias: SidecarData\<T\&gt;

&gt; **SidecarData**\<`T`\&gt; = `T` *extends* `"SingletonBeacon"` ? [`SingletonSidecar`](../interfaces/SingletonSidecar.md) : `T` *extends* `"CIDAggregateBeacon"` ? [`CIDAggregateSidecar`](../interfaces/CIDAggregateSidecar.md) : `T` *extends* `"SMTAggregateBeacon"` ? [`SMTAggregateSidecar`](../interfaces/SMTAggregateSidecar.md) : `never`

Defined in: [packages/method/src/types/crud.ts:30](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/method/src/types/crud.ts#L30)

## Type Parameters

### T

`T`
