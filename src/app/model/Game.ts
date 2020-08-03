import {Strategy} from './Strategy';
import {Player} from './Player';

export class Game{
  private id: number;
  private name: string;
  private externalInfo: string;
  private description: string;
  private strategies: Strategy[];
  private players: Player[];
}
