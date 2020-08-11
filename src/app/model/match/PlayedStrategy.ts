import {Strategy} from '../Strategy';

export class PlayedStrategy{
  public id: number;
  public timesPlayed: number;
  public strategy: Strategy;


  constructor(id: number, timesPlayed: number, strategy: Strategy) {
    this.id = id;
    this.timesPlayed = timesPlayed;
    this.strategy = strategy;
  }
}
