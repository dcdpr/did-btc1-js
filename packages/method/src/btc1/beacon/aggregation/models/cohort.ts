type Musig2CohortParams = {
    id?: string;
    coordinatorDid: string;
    minParticipants: number;
    status: string;
    network: string;
}

export class Musig2Cohort {
  public id: string;
  public coordinatorDid: string;
  public participants: Array<string>;
  public minParticipants: number;
  public status: string;
  public network: string;
  public pendingSignatureRequests: Record<string, string>;
  public trMerkleRoot: string;

  constructor(params: Musig2CohortParams) {
    this.id = params.id || crypto.randomUUID();
    this.coordinatorDid = params.coordinatorDid;
    this.minParticipants = params.minParticipants;
    this.status = params.status;
    this.network = params.network;

    this.participants = new Array<string>();
    this.pendingSignatureRequests = {};
    this.trMerkleRoot = '';
  }
}