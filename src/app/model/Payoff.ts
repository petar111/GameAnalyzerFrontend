import {Strategy} from './Strategy';

export class Payoff{
  public id: number;
  public amount: number;
  public playedStrategy: Strategy;
  public opposingStrategy: Strategy;
}
