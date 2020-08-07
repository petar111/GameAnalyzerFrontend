import {PlayerMatch} from './PlayerMatch';
import {Game} from '../Game';

export class GameSession{
  public numberOfRounds: number;
  public game: Game;
  public playerRow: PlayerMatch;
  public playerColumn: PlayerMatch;
  constructor() {
    this.numberOfRounds = 0;
  }
}
