import {Payoff} from './Payoff';
import {Strategy} from './Strategy';

export class Player{
  public id: number;
  public name: string;
  public payoffs: Payoff[];
  public playableStrategies: Strategy[];
  constructor(name: string) {
    this.name = name;
    this.payoffs = [];
    this.playableStrategies = [];
  }
}
