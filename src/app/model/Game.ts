import {Strategy} from './Strategy';
import {Player} from './Player';
import {User} from './User';
import {VerificationStatus} from './VerificationStatus';

export class Game{
  public creator: User;
  public id: number;
  public name: string;
  public externalInfo: string;
  public description: string;
  public strategies: Strategy[];
  public players: Player[];
  public verificationStatus: VerificationStatus;

  constructor() {
  }

}
