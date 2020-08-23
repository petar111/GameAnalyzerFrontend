import {VerificationStatus} from './VerificationStatus';

export class GameInfo{
  public id: number;
  public name: string;
  public externalInfo: string;
  public description: string;
  public creatorUsername: string;
  public verificationStatus: VerificationStatus;
}
