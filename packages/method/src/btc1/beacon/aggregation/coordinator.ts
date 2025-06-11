import { ProtocolService } from './protocol/service.js';

export class BeaconCoordinator {
  public name: string = 'BeaconCoordinator';
  private protocol: ProtocolService;
  private id: string = '';
  private subscribers: string[] = [];

  constructor(protocol: ProtocolService) {
    this.protocol = protocol;
  }

  async initialize(): Promise<void> {
    this.id = await this.protocol.generateIdentity();

    this.protocol.registerHandler('SUBSCRIBE', this._handleSubscribe.bind(this));
    this.protocol.registerHandler('OPT_IN', this._handleSubscribe.bind(this));
    this.protocol.registerHandler('REQUEST_SIGNATURE', this._handleSubscribe.bind(this));
    this.protocol.registerHandler('NONCE_CONTRIBUTION', this._handleSubscribe.bind(this));
    this.protocol.registerHandler('SIGNATURE_AUTHORIZATION', this._handleSubscribe.bind(this));

    await this.protocol.start();
  }

  private async _handleSubscribe(message: any): Promise<void> {
    const sender = message.from;
    if (!this.subscribers.includes(sender)) {
      this.subscribers.push(sender);
      await this.acceptSubscription(sender);
    }
  }

  private async _handleJoinCohort(message: any, contactContext: InMemoryContextStorage, threadContext: InMemoryContextStorage): Promise<void> {
    const sender = message.from;
    if (!this.subscribers.includes(sender)) {
      this.subscribers.push(sender);
      await this.acceptSubscription(sender);
    }
  }

  public async acceptSubscription(sender: string): Promise<void> {
    console.log(`Accepting subscription from ${sender}`);
    const response = {
      type : 'SUBSCRIBE_ACCEPT',
      to   : sender,
      from : this.id
    };
    await this.protocol.sendMessage(response, sender, this.id);
  }


}
