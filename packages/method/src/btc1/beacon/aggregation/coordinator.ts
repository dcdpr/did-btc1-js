import { CommunicationService } from './communication.js';

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
    // Add other handlers here

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
