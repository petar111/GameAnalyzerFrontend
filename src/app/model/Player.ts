import {Payoff} from './Payoff';

export class Player{
  public id: number;
  public name: string;
  public payoffs: Payoff[];
  constructor(name: string) {
    this.name = name;
    this.payoffs = [];
  }
}
