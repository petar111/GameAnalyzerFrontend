import {PlayerMatch} from './PlayerMatch';
import {Game} from '../Game';
import {User} from '../User';

export class GameSession{
  public id: number;
  public creator: User;
  public numberOfRounds: number;
  public game: Game;
  public players: PlayerMatch[];
  constructor() {
    this.players = [];
    this.numberOfRounds = 0;
  }
}
