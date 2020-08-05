import {Strategy} from './Strategy';
import {Player} from './Player';

export class Game{
  public id: number;
  public name: string;
  public externalInfo: string;
  public description: string;
  public strategies: Strategy[];
  public players: Player[];

  constructor() {
    this.players = [];
  }

}
