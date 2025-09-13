# Class: DidBtc1CLI

Defined in: [cli.ts:14](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/cli/src/cli.ts#L14)

A class-based CLI using Commander.
- No forced process.exit().
- Configurable by calling `run(argv?)`.

## Constructors

### Constructor

> **new DidBtc1CLI**(): `DidBtc1CLI`

Defined in: [cli.ts:17](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/cli/src/cli.ts#L17)

#### Returns

`DidBtc1CLI`

## Methods

### run()

> **run**(`argv?`): `void`

Defined in: [cli.ts:120](https://github.com/dcdpr/did-btcr2-js/blob/4a717493e735221d072999f212891939f4de3f23/packages/cli/src/cli.ts#L120)

Parse and run the CLI.
You can supply custom argv for testing, or let it default to process.argv in production.

#### Parameters

##### argv?

`string`[]

#### Returns

`void`
