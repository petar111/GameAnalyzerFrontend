import {PlayerMatch} from './PlayerMatch';
import {Game} from '../Game';

export class GameSession{
  public numberOfRounds: number;
  public game: Game;
  public players = {};
  constructor() {
    this.numberOfRounds = 0;
  }
}
