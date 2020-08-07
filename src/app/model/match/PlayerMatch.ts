import {Player} from '../Player';
import {Strategy} from '../Strategy';

export class PlayerMatch{
  public player: Player;
  public totalPayoff: number;
  public selectedStrategy: Strategy;
  public strategyPlayed = [];
  constructor(player: Player) {
    this.player = player;
    this.totalPayoff = 0;
    for (const strategy of this.player.playableStrategies){
      this.strategyPlayed[strategy.name] = 0;
    }
    this.selectedStrategy = new Strategy('not selected');
  }
}
