import {Strategy} from './Strategy';
import {Player} from './Player';
import {User} from './User';

export class Game{
  public creator: User;
  public id: number;
  public name: string;
  public externalInfo: string;
  public description: string;
  public strategies: Strategy[];
  public players: Player[];

  constructor() {
  }

}
