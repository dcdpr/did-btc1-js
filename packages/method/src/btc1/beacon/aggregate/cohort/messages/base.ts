import { Maybe } from '@did-btc1/common';

export type BaseBody = {
  cohortId: string;
  cohortSize?: number;
  network?: string;
  participantPk?: Uint8Array;
  beaconAddress?: string;
  cohortKeys?: Array<Uint8Array>;
  sessionId?: string;
  aggregatedNonce?: Uint8Array;
  nonceContribution?: Uint8Array;
  partialSignature?: Uint8Array;
  pendingTx?: string;
  beaconType?: string;
  data?: string;
};

export type Base = {
  type: string;
  to?: string;
  from: string;
  body?: BaseBody;
};

export class BaseMessage {
  public type: string;
  public to?: string;
  public from: string;
  public body?: BaseBody;

  constructor({ type, to, from, body }: Base) {
    this.type = type;
    this.to = to;
    this.from = from;
    this.body = body;
  }

  /**
   * Creates a BaseMessage from a JSON object.
   * @param {Maybe<Base>} data The JSON object to initialize the BaseMessage.
   * @returns {BaseMessage} The initialized BaseMessage.
   */
  public static fromJSON(data: Maybe<Base>): BaseMessage {
    return new BaseMessage(data);
  }

  /**
   * Converts a BaseMessage to a JSON object.
   * @returns {Base} The JSON representation of the BaseMessage.
   */
  public json(): Base {
    return Object.json(this) as Base;
  }
}