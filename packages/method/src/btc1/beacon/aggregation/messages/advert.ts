import { BaseMessage } from './base.js';

export class AdvertMessage extends BaseMessage {
  public cohortId: string;
  public cohortSize: number;
  public network: string = 'signet';

  constructor(to: string, from: string, cohortId: string, cohortSize: number, network: string, threadId?: string) {
    super('BEACON_ADVERT', to, from, threadId, { cohortId, cohortSize, network });
    this.cohortId = cohortId;
    this.cohortSize = cohortSize;
    this.network = network;
  }

  public static create(
    to: string,
    from: string,
    cohortId: string,
    cohortSize: number,
    network: string,
    threadId?: string
  ): AdvertMessage {
    return new AdvertMessage(to, from, cohortId, cohortSize, network, threadId);
  }

  public serialize(): object {
    return {
      type     : this.type,
      to       : this.to,
      from     : this.from,
      threadId : this.threadId,
      body     : this.body
    };
  }
}