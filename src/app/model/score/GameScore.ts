import {Game} from '../Game';
import {Player} from '../Player';
import {User} from '../User';

export class GameScore{
  public totalPayoff: number;
  public numberOfRounds: number;
  public game: Game;
  public player: Player;
  public user: User;
}
