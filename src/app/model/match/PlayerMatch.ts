import {Player} from '../Player';
import {Strategy} from '../Strategy';
import {PlayedStrategy} from './PlayedStrategy';

export class PlayerMatch{
  public id: number;
  public player: Player;
  public totalPayoff: number;
  public selectedStrategy: Strategy;
  public playedStrategies: PlayedStrategy[];
  public playerLabel: string;
  constructor(player: Player, playerLabel: string) {
    this.playerLabel = playerLabel;
    this.player = player;
    this.totalPayoff = 0;
    this.playedStrategies = [];
    for (const strategy of this.player.playableStrategies){
      // this.strategyPlayed[strategy.id] = 0;
      this.playedStrategies.push(new PlayedStrategy(null, 0, strategy));
    }
    this.selectedStrategy = new Strategy('not selected');
  }
}
