import { Component, OnInit } from '@angular/core';
import {GameService} from '../../../service/game.service';
import {Router} from '@angular/router';
import {Strategy} from '../../../model/Strategy';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeInRight} from 'ng-animate';
import {GameSession} from '../../../model/match/GameSession';
import {PlayerMatch} from '../../../model/match/PlayerMatch';
import {NotifierService} from 'angular-notifier';

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
  public selectedStrategy = new Strategy('Not selected');
  public gameSession: GameSession;
  constructor(private gameService: GameService, private router: Router, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.gameSession = new GameSession();
    this.gameService.getGameByName('CustomGame1').subscribe(
      data => {
        this.gameSession.game = data;
        this.gameSession.playerRow = new PlayerMatch(this.gameSession.game.players.find(p => p.name === 'Player1'));
        this.gameSession.playerColumn = new PlayerMatch(this.gameSession.game.players.find(p => p.name === 'Player2'));


        console.log(this.gameSession.game);
        console.log(this.gameSession.playerRow);
        console.log(this.gameSession.playerColumn);
      }
    );
  }

  getPlayerColumnPayoffAmount(playedStrategy: Strategy, opposingStrategy: Strategy): number {
    return this.gameSession.playerColumn.player.payoffs.find(payoff =>
      payoff.playedStrategy.name === playedStrategy.name && payoff.opposingStrategy.name === opposingStrategy.name).amount;
  }

  getPlayerRowPayoffAmount(playedStrategy: Strategy, opposingStrategy: Strategy): number {
    return this.gameSession.playerRow.player.payoffs.find(payoff =>
      payoff.playedStrategy.name === playedStrategy.name && payoff.opposingStrategy.name === opposingStrategy.name).amount;
  }

  onStrategyButtonClick(strategyRow: Strategy): void {
    this.gameSession.playerRow.selectedStrategy = strategyRow;
    this.fadeInRight = !this.fadeInRight;
  }

  onMove(): void {
    if (this.gameSession.playerRow.selectedStrategy.name === 'not selected'){
      this.notifierService.notify('warning', 'You have to select strategy first!');
      return;
    }
    const randomNum = Math.floor(Math.random() * this.gameSession.playerColumn.player.playableStrategies.length);
    this.gameSession.playerColumn.selectedStrategy = this.gameSession.playerColumn.player.playableStrategies[randomNum];
    this.gameSession.playerRow.totalPayoff +=
      this.getPlayerRowPayoffAmount(this.gameSession.playerRow.selectedStrategy, this.gameSession.playerColumn.selectedStrategy);
    this.gameSession.playerColumn.totalPayoff +=
      this.getPlayerColumnPayoffAmount(this.gameSession.playerColumn.selectedStrategy, this.gameSession.playerRow.selectedStrategy);
    this.gameSession.playerRow.strategyPlayed[this.gameSession.playerRow.selectedStrategy.name]++;
    this.gameSession.playerColumn.strategyPlayed[this.gameSession.playerColumn.selectedStrategy.name]++;
    this.gameSession.numberOfRounds++;
    this.notifierService.notify('info', `You played ${this.gameSession.playerRow.selectedStrategy.name} and your opponent played ${this.gameSession.playerColumn.selectedStrategy.name}`);
  }
}
