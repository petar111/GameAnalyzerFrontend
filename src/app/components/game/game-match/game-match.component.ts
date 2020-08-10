import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class GameMatchComponent implements OnInit, OnDestroy {
  fadeInRight = true;
  public selectedStrategy = new Strategy('Not selected');
  public gameSession: GameSession;
  public playerRowName = 'playerRow';
  public playerColumnName = 'playerColumn';
  public playerColumn: PlayerMatch;
  public playerRow: PlayerMatch;
  constructor(private gameService: GameService, private router: Router, private notifierService: NotifierService) { }

  ngOnInit(): void {
    if (localStorage.getItem('gameSession') !== null && localStorage.getItem('gameSession') !== undefined){
      this.gameSession = JSON.parse(localStorage.getItem('gameSession'));
      this.initPlayers();
      return;
    }
    this.gameSession = new GameSession();
    this.gameService.getGameByName('CustomGame1').subscribe(
      data => {
        this.gameSession.game = data;
        this.gameSession.players[this.playerRowName] = new PlayerMatch(this.gameSession.game.players.find(p => p.name === 'Player1'));
        this.gameSession.players[this.playerColumnName] = new PlayerMatch(this.gameSession.game.players.find(p => p.name === 'Player2'));
        this.initPlayers();
        console.log(JSON.stringify(this.gameSession));
        console.log(JSON.stringify(this.playerRow));
        console.log(this.playerColumn);
      }
    );
  }

  getPlayerColumnPayoffAmount(playedStrategy: Strategy, opposingStrategy: Strategy): number {
    return this.playerColumn.player.payoffs.find(payoff =>
      payoff.playedStrategy.name === playedStrategy.name && payoff.opposingStrategy.name === opposingStrategy.name).amount;
  }

  getPlayerRowPayoffAmount(playedStrategy: Strategy, opposingStrategy: Strategy): number {
    return this.playerRow.player.payoffs.find(payoff =>
      payoff.playedStrategy.name === playedStrategy.name && payoff.opposingStrategy.name === opposingStrategy.name).amount;
  }

  onStrategyButtonClick(strategyRow: Strategy): void {
    this.playerRow.selectedStrategy = strategyRow;
    this.fadeInRight = !this.fadeInRight;
  }

  onMove(): void {
    if (this.playerRow.selectedStrategy.name === 'not selected'){
      this.notifierService.notify('warning', 'You have to select strategy first!');
      return;
    }
    const randomNum = Math.floor(Math.random() * this.playerColumn.player.playableStrategies.length);
    this.playerColumn.selectedStrategy = this.playerColumn.player.playableStrategies[randomNum];
    this.playerRow.totalPayoff +=
      this.getPlayerRowPayoffAmount(this.playerRow.selectedStrategy, this.playerColumn.selectedStrategy);
    this.playerColumn.totalPayoff +=
      this.getPlayerColumnPayoffAmount(this.playerColumn.selectedStrategy, this.playerRow.selectedStrategy);
    this.playerRow.strategyPlayed[this.playerRow.selectedStrategy.name]++;
    this.playerColumn.strategyPlayed[this.playerColumn.selectedStrategy.name]++;
    this.gameSession.numberOfRounds++;
    this.notifierService.notify('info', `You played ${this.playerRow.selectedStrategy.name} and your opponent played ${this.playerColumn.selectedStrategy.name}`);
  }

  ngOnDestroy(): void {
    localStorage.setItem('gameSession', JSON.stringify(this.gameSession));
  }

  private initPlayers(): void {
    this.playerColumn = this.gameSession.players[this.playerColumnName];
    this.playerRow = this.gameSession.players[this.playerRowName];
  }
}
