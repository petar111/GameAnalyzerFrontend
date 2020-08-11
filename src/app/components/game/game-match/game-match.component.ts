import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../../service/game.service';
import {Router} from '@angular/router';
import {Strategy} from '../../../model/Strategy';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeInRight} from 'ng-animate';
import {GameSession} from '../../../model/match/GameSession';
import {PlayerMatch} from '../../../model/match/PlayerMatch';
import {NotifierService} from 'angular-notifier';
import {PlayedStrategy} from '../../../model/match/PlayedStrategy';
import {MatDialog} from '@angular/material/dialog';
import {SaveSessionDialogComponent} from '../../dialog/save-session-dialog/save-session-dialog.component';
import {logger} from 'codelyzer/util/logger';
import {SaveSessionOptions} from '../../../enum/save-session-options.enum';

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
  constructor(private gameService: GameService,
              private router: Router,
              private notifierService: NotifierService,
              private saveSessionDialog: MatDialog) { }

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
        this.gameSession.players
          .push(new PlayerMatch(this.gameSession.game.players.find(p => p.name === 'Player1'), this.playerRowName));
        this.gameSession.players
          .push(new PlayerMatch(this.gameSession.game.players.find(p => p.name === 'Player2'), this.playerColumnName));
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
    this.findPlayedStrategyByStrategyAndPlayerMatch(this.playerRow.selectedStrategy, this.playerRow).timesPlayed++;
    this.findPlayedStrategyByStrategyAndPlayerMatch(this.playerColumn.selectedStrategy, this.playerColumn).timesPlayed++;
    this.gameSession.numberOfRounds++;
    this.notifierService.notify('info', `You played ${this.playerRow.selectedStrategy.name} and your opponent played ${this.playerColumn.selectedStrategy.name}`);
  }
  findPlayedStrategyByStrategyAndPlayerMatch(strategy: Strategy, playerMatch: PlayerMatch): PlayedStrategy{
    return playerMatch.playedStrategies.find(value => value.strategy.id === strategy.id);
  }

  ngOnDestroy(): void {
    localStorage.setItem('gameSession', JSON.stringify(this.gameSession));
  }

  private initPlayers(): void {
    this.playerColumn = this.gameSession.players[1];
    this.playerRow = this.gameSession.players[0];
  }

  onSaveSession(): void {
    const dialog = this.saveSessionDialog.open(SaveSessionDialogComponent, {
      data: {
        id: this.gameSession.id
      }
    } );
    dialog.afterClosed().subscribe(data => {
      if (data === SaveSessionOptions.SAVE_AS_NEW){
        this.gameSession.id = null;
        this.gameSession.players.forEach(value => value.id = null);
        this.gameSession.players.forEach(value => value.playedStrategies.forEach(value1 => value1.id = null));
      }
      this.gameSession.creator = JSON.parse(localStorage.getItem('user'));
      this.gameService.saveGameSession(this.gameSession).subscribe(
        response => {
          this.updateGameSessionIds(response);
          this.notifierService.notify('success', 'Game session is successfully saved.');
          console.log(response);
        },
        error => {
          this.notifierService.notify('error', 'Game session saving is failed.');
        }
      );
    });
  }


  private updateGameSessionIds(gameSessionResponse: GameSession): void {
    this.gameSession.id = gameSessionResponse.id;
    this.gameSession.players.forEach(player => player.id = gameSessionResponse.players
      .find(playerInResponse => playerInResponse.player.id === player.player.id).id);
    this.gameSession.players.forEach(player => player.playedStrategies
      .forEach(playedStrategy => playedStrategy.id = gameSessionResponse.players
        .find(playerInResponse => playerInResponse.player.id === player.player.id).playedStrategies
        .find(playedStrategyInResponse => playedStrategyInResponse.strategy.id === playedStrategy.strategy.id).id));
  }
}
