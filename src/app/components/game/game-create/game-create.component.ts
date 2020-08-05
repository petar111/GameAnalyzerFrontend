import { Component, OnInit } from '@angular/core';
import {Game} from '../../../model/Game';
import {Strategy} from '../../../model/Strategy';
import {Player} from '../../../model/Player';
import {Payoff} from '../../../model/Payoff';
import {GameService} from '../../../service/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {

  public name: string;
  public externalInfo: string;
  public description: string;
  public numberOfStrategies;
  public strategies: Strategy[] = [];
  public players: Player[] = [];
  public game: Game;
  public isInputValid = true;
  constructor(private gameService: GameService, private router: Router) {
    this.players.push(new Player('Player1'));
    this.players.push(new Player('Player2'));

    this.game = new Game();

    this.game.players.push(new Player('Player1'));
    this.game.players.push(new Player('Player2'));
  }

  ngOnInit(): void {
    this.onNumberOfStrategiesChange('2');
  }

  onSubmit(value: any): void {
    this.game.name = value[`name`];
    this.game.externalInfo = value[`externalInfo`];
    this.game.description = value[`description`];
    this.game.strategies = [];
    for (let i = 1; i <= this.numberOfStrategies; i++) {
      this.game.strategies.push(new Strategy(value[`S1_${i}`]));
    }
    for (let i = 1; i <= this.numberOfStrategies; i++) {
      this.game.strategies.push(new Strategy(value[`S2_${i}`]));
    }
    for (let i = 1; i <= this.numberOfStrategies; i++){
      for (let j = 1; j <= this.numberOfStrategies; j++){
        const payoffP1 = new Payoff();
        payoffP1.amount = Number(value[`P1_${i}${j}`]);
        payoffP1.playedStrategy = new Strategy(value[`S1_${i}`]);
        payoffP1.opposingStrategy = new Strategy(value[`S2_${j}`]);
        this.game.players.find(p => p.name === 'Player1').payoffs.push(payoffP1);
        const payoffP2 = new Payoff();
        payoffP2.amount = Number(value[`P2_${i}${j}`]);
        payoffP2.playedStrategy = new Strategy(value[`S2_${j}`]);
        payoffP2.opposingStrategy = new Strategy(value[`S1_${i}`]);
        this.game.players.find(p => p.name === 'Player2').payoffs.push(payoffP2);
      }
    }
    this.gameService.createGame(this.game).subscribe(
      data => {
        alert(data.message);
        this.router.navigateByUrl('');
      }
    );
  }

  onNumberOfStrategiesChange(numOfStrategies: string): void {
    if (!Number(numOfStrategies)){
      return;
    }
    this.numberOfStrategies = Number(numOfStrategies);
    this.strategies = [];
    this.game.strategies = [];
    for (let i = 0; i < this.numberOfStrategies; i++){
      this.game.strategies.push(new Strategy('S' + (i + 1)));
      this.strategies.push(new Strategy('S' + (i + 1)));
    }
  }
}
