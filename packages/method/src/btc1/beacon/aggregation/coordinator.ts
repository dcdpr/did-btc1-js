import { CommunicationService } from './communication.js';

export interface BeaconAdvert {
  id: string;
  type: string;
}

export class BeaconCoordinator {
  private comms: CommunicationService;
  private id: string = '';
  private subscribers: string[] = [];

  constructor(commService: CommunicationService) {
    this.comms = commService;
  }

  async initialize(): Promise<void> {
    this.id = await this.comms.generateIdentity();

    this.comms.registerHandler('SUBSCRIBE', this.handleSubscribe.bind(this));
    this.comms.registerHandler('OPT_IN', this.handleSubscribe.bind(this));
    this.comms.registerHandler('REQUEST_SIGNATURE', this.handleSubscribe.bind(this));
    this.comms.registerHandler('NONCE_CONTRIBUTION', this.handleSubscribe.bind(this));
    this.comms.registerHandler('SIGNATURE_AUTHORIZATION', this.handleSubscribe.bind(this));

    await this.comms.start();
  }

  private async handleSubscribe(message: any): Promise<void> {
    const sender = message.from;
    if (!this.subscribers.includes(sender)) {
      this.subscribers.push(sender);
      await this.acceptSubscription(sender);
    }
  }

  private async acceptSubscription(sender: string): Promise<void> {
    console.log(`Accepting subscription from ${sender}`);
    const response = {
      type : 'SUBSCRIBE_ACCEPT',
      to   : sender,
      from : this.id
    };
    await this.comms.sendMessage(response, sender, this.id);
  }
}
