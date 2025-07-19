import { ErrorOptions } from '@did-btc1/common';

/**
 * Base class for Bitcoin-related errors.
 * @class BitcoinError @extends {Error}
 * @type {BitcoinError}
 */
export class BitcoinError extends Error {
  name: string = 'BitcoinError';
  type: string = 'BitcoinError';
  data?: Record<string, any>;

  constructor(message: string, options: ErrorOptions = {}) {
    super(message);
    this.type = options.type ?? this.type;
    this.name = options.name ?? this.name;
    this.data = options.data;

    // Ensures that instanceof works properly, the correct prototype chain when using inheritance,
    // and that V8 stack traces (like Chrome, Edge, and Node.js) are more readable and relevant.
    Object.setPrototypeOf(this, new.target.prototype);

    // Captures the stack trace in V8 engines (like Chrome, Edge, and Node.js).
    // In non-V8 environments, the stack trace will still be captured.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BitcoinError);
    }
  }
}

/**
 * Represents an error that occurs during Bitcoin RPC operations.
 * @class BitcoinRpcError @extends {BitcoinError}
 * @type {BitcoinRpcError}
 */
export class BitcoinRpcError extends BitcoinError {
  public readonly code: number | string;
  public readonly data?: any;
  constructor(code: number | string, message: string, data?: any) {
    super(message);
    this.code = code;
    this.data = data;
    this.name = 'BitcoinRpcError';
  }
}

/**
 * Represents an error specific to Bitcoin Taproot operations.
 * @class TaprootError @extends {BitcoinRpcError}
 * @type {TaprootError}
 */
export class TaprootError extends BitcoinError {
  constructor(message: string, type: string = 'TaprootError', data?: Record<string, any>) {
    super(message, { type, name: 'TaprootError', data });
  }
}