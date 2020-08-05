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
  public numberOfStrategiesPlayerRow = 2;
  public numberOfStrategiesPlayerColumn = 2;
  public strategies: Strategy[] = [];
  public game: Game;
  public playerRow: Player;
  public playerColumn: Player;
  public isInputValid = true;
  constructor(private gameService: GameService, private router: Router) {
    this.game = new Game();
    this.game.players = [];
    this.playerRow = new Player('Player1');
    this.playerColumn = new Player('Player2');
    this.game.players.push(this.playerRow);
    this.game.players.push(this.playerColumn);
  }

  ngOnInit(): void {
    this.onNumberOfStrategiesPlayerColumnChange(2);
    this.onNumberOfStrategiesPlayerRowChange(2);
  }

  onSubmit(value: any): void {
    this.game.name = value[`name`];
    this.game.externalInfo = value[`externalInfo`];
    this.game.description = value[`description`];
    this.game.strategies = [];
    for (let i = 1; i <= this.numberOfStrategiesPlayerRow; i++) {
      this.game.strategies.push(new Strategy(value[`S1_${i}`]));
      this.game.players.find(p => p.name === 'Player1').playableStrategies.push(new Strategy(value[`S1_${i}`]));
    }
    for (let i = 1; i <= this.numberOfStrategiesPlayerColumn; i++) {
      this.game.strategies.push(new Strategy(value[`S2_${i}`]));
      this.game.players.find(p => p.name === 'Player2').playableStrategies.push(new Strategy(value[`S2_${i}`]));
    }
    for (let i = 1; i <= this.numberOfStrategiesPlayerRow; i++){
      for (let j = 1; j <= this.numberOfStrategiesPlayerColumn; j++){
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

  onNumberOfStrategiesPlayerRowChange(value: number): void {
    this.numberOfStrategiesPlayerRow = Number(value);
    this.game.strategies = [];
    this.game.players.find(p => p.name === 'Player1').playableStrategies = [];
    for (let i = 0; i < this.numberOfStrategiesPlayerRow; i++){
      this.game.strategies.push(new Strategy('S' + (i + 1)));
      this.game.players.find(p => p.name === 'Player1').playableStrategies.push(new Strategy('S' + (i + 1)));
    }
  }

  onNumberOfStrategiesPlayerColumnChange(value: number): void {
    this.numberOfStrategiesPlayerColumn = Number(value);
    this.game.strategies = [];
    this.game.players.find(p => p.name === 'Player2').playableStrategies = [];
    for (let i = 0; i < this.numberOfStrategiesPlayerColumn; i++){
      this.game.strategies.push(new Strategy('S' + (i + 1)));
      this.game.players.find(p => p.name === 'Player2').playableStrategies.push(new Strategy('S' + (i + 1)));
    }
  }
}
