[**@did-btc1/method**](../README.md)

***

[@did-btc1/method](../globals.md) / SidecarData

# Type Alias: SidecarData\<T\>

> **SidecarData**\<`T`\> = `T` *extends* `"SingletonBeacon"` ? [`SingletonSidecar`](../interfaces/SingletonSidecar.md) : `T` *extends* `"CIDAggregateBeacon"` ? [`CIDAggregateSidecar`](../interfaces/CIDAggregateSidecar.md) : `T` *extends* `"SMTAggregateBeacon"` ? [`SMTAggregateSidecar`](../interfaces/SMTAggregateSidecar.md) : `never`

Defined in: [packages/method/src/types/crud.ts:30](https://github.com/dcdpr/did-btc1-js/blob/751aedd75738c26882a2149e644ae32b9e424707/packages/method/src/types/crud.ts#L30)

## Type Parameters

### T

`T`
