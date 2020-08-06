import { Component, OnInit } from '@angular/core';
import {Game} from '../../../model/Game';
import {GameService} from '../../../service/game.service';
import {Router} from '@angular/router';
import {Player} from '../../../model/Player';
import {Strategy} from '../../../model/Strategy';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeInRight} from 'ng-animate';

@Component({
  selector: 'app-game-match',
  templateUrl: './game-match.component.html',
  styleUrls: ['./game-match.component.css'],
  animations: [
    trigger('fadeInRight',
      [
        state('one', style({})),
        state('two', style({})),
        transition('*=>*', useAnimation(fadeInRight))])
  ]
})
export class GameMatchComponent implements OnInit {
  fadeInRight = true;
  public game: Game;
  public playerH: Player;
  public playerC: Player;
  public selectedStrategy = new Strategy('Not selected');
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.gameService.getGameByName('CustomGame1').subscribe(
      data => {
        this.game = data;
        this.playerH = this.game.players.find(p => p.name === 'Player1');
        this.playerC = this.game.players.find(p => p.name === 'Player2');

        console.log(this.game);
        console.log(this.playerH);
        console.log(this.playerC);
      }
    );
  }

  getOpposingPlayerPayoffAmount(playedStrategy: Strategy, opposingStrategy: Strategy): number {
    return this.playerC.payoffs.find(payoff =>
      payoff.playedStrategy.name === playedStrategy.name && payoff.opposingStrategy.name === opposingStrategy.name).amount;
  }

  getPlayerPayoffAmount(playedStrategy: Strategy, opposingStrategy: Strategy): number {
    return this.playerH.payoffs.find(payoff =>
      payoff.playedStrategy.name === playedStrategy.name && payoff.opposingStrategy.name === opposingStrategy.name).amount;
  }

  onStrategyButtonClick(strategyRow: Strategy): void {
    this.selectedStrategy = strategyRow;
    this.fadeInRight = !this.fadeInRight;
  }
}
