import { Base } from './messages/base.js';
import { OptInMessage } from './messages/opt-in.js';
import { ProtocolService } from './protocol/service.js';

export class BeaconCoordinator {
  private protocol: ProtocolService;
  public name: string = 'BeaconCoordinator';
  private subscribers: string[] = [];
  public did?: string;

  constructor(protocol: ProtocolService) {
    this.protocol = protocol;
    void this.protocol.generateIdentity().then((identity) => {
      this.did = identity;
    });
  }

  async initialize(): Promise<void> {
    this.did = await this.protocol.generateIdentity();

    this.protocol.registerHandler('SUBSCRIBE', this._handleSubscribe.bind(this));
    this.protocol.registerHandler('OPT_IN', this._handleSubscribe.bind(this));
    this.protocol.registerHandler('REQUEST_SIGNATURE', this._handleSubscribe.bind(this));
    this.protocol.registerHandler('NONCE_CONTRIBUTION', this._handleSubscribe.bind(this));
    this.protocol.registerHandler('SIGNATURE_AUTHORIZATION', this._handleSubscribe.bind(this));

    await this.protocol.start();
  }

  private async _handleSubscribe(message: Base): Promise<void> {
    const sender = message.from;
    if (!this.subscribers.includes(sender)) {
      this.subscribers.push(sender);
      await this.acceptSubscription(sender);
    }
  }

  private async _handleJoinCohort(message: any): Promise<void> {
    const optIn = OptInMessage.initialize(message);
    const cohortId = optIn.cohortId;
    const participant = optIn.from;
    const participantPk = optIn.participantPk;
    if (!this.subscribers.includes(participant)) {
      this.subscribers.push(participant);
      await this.acceptSubscription(participant);
    }
  }

  public async acceptSubscription(sender: string): Promise<void> {
    console.log(`Accepting subscription from ${sender}`);
    const response = {
      type : 'SUBSCRIBE_ACCEPT',
      to   : sender,
      from : this.did
    };
    await this.protocol.sendMessage(response, sender, this.did);
  }
}
