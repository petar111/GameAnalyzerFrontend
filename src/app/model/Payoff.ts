import {Strategy} from './Strategy';

export class Payoff{
  private id: number;
  private amount: number;
  private playedStrategy: Strategy;
  private opposingStrategy: Strategy;
}
