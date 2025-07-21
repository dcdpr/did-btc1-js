[**@did-btc1/cli**](../README.md)

***

[@did-btc1/cli](../globals.md) / DidBtc1CLI

# Class: DidBtc1CLI

Defined in: [cli.ts:14](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cli/src/cli.ts#L14)

A class-based CLI using Commander.
- No forced process.exit().
- Configurable by calling `run(argv?)`.

## Constructors

### Constructor

> **new DidBtc1CLI**(): `DidBtc1CLI`

Defined in: [cli.ts:17](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cli/src/cli.ts#L17)

#### Returns

`DidBtc1CLI`

## Methods

### run()

> **run**(`argv?`): `void`

Defined in: [cli.ts:120](https://github.com/dcdpr/did-btc1-js/blob/4ab6f9915d95beed9bc633644c9db1539395f512/packages/cli/src/cli.ts#L120)

Parse and run the CLI.
You can supply custom argv for testing, or let it default to process.argv in production.

#### Parameters

##### argv?

`string`[]

#### Returns

`void`
