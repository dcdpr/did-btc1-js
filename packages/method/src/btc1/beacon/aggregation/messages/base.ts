export class BaseMessage {
  public type: string;
  public to: string;
  public from: string;
  public threadId?: string;
  public body?: {
    cohortId?: string;
    cohortSize?: number;
    network?: string;
  };

  constructor(type: string, to: string, from: string, threadId?: string, body?: object) {
    this.type = type;
    this.to = to;
    this.from = from;
    this.threadId = threadId;
    this.body = body;
  }

  public serialize(): object {
    return {
      type : this.type,
      to   : this.to,
      from : this.from
    };
  }
}