import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../../service/game.service';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {Strategy} from '../../../model/Strategy';
import {state, style, transition, trigger, useAnimation} from '@angular/animations';
import {fadeInRight} from 'ng-animate';
import {GameSession} from '../../../model/match/GameSession';
import {PlayerMatch} from '../../../model/match/PlayerMatch';
import {NotifierService} from 'angular-notifier';
import {PlayedStrategy} from '../../../model/match/PlayedStrategy';
import {SaveSessionDialogComponent} from '../../dialog/save-session-dialog/save-session-dialog.component';
import {SaveSessionOptions} from '../../../enum/save-session-options.enum';
import {SubmitScoreComponent} from '../../dialog/submit-score/submit-score.component';
import {SubmitScoreOption} from '../../../enum/submit-score-option.enum';
import {GameScore} from '../../../model/score/GameScore';
import {UserService} from '../../../service/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import * as CanvasJS from '../../../../assets/js/canvasjs.min.js';
import {AnalyticChart} from '../../../model/AnalyticChart';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';
import {GameAdviceComponent} from '../../dialog/game-advice/game-advice.component';

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

  faVerified = faCheck;

  public selectedStrategy = new Strategy('Not selected');
  public gameSession: GameSession;
  public playerRowName = 'playerRow';
  public playerColumnName = 'playerColumn';
  public playerColumn: PlayerMatch;
  public playerRow: PlayerMatch;
  public chartPlayerRow: AnalyticChart;
  public chartPlayerColumn: AnalyticChart;
  public chartStrategiesPlayerRow: AnalyticChart;
  public chartStrategiesPlayerColumn: AnalyticChart;
  public strategiesPlayedPlayerRowDataPoints = [];
  public subscriptions: Subscription[] = [];

  constructor(private gameService: GameService,
              private router: Router,
              private notifierService: NotifierService,
              private userService: UserService,
              private saveSessionDialog: NgbModal) { }

  @HostListener('window:beforeunload')
  onUnload(): void {
    localStorage.setItem('gameSession', JSON.stringify(this.gameSession));
  }
  ngOnInit(): void {

    if (localStorage.getItem('gameSession') !== undefined  && localStorage.getItem('gameSession') !== null) {
      this.gameSession = JSON.parse(localStorage.getItem('gameSession'));
      this.initPlayers();
    }else{
      alert('You have to select a game first.');
      this.router.navigateByUrl('game/all');
    }
    this.chartPlayerRow = this.initChart(this.playerRow, 'chartContainerPlayerRow');
    this.chartPlayerColumn = this.initChart(this.playerColumn, 'chartContainerPlayerColumn');
    this.chartStrategiesPlayerRow = this.initPieChart(this.playerRow, 'chartStrategiesPlayerRow');
    this.chartStrategiesPlayerColumn = this.initPieChart(this.playerColumn, 'chartStrategiesPlayerColumn');

  }
  initPieChart(player: PlayerMatch, chartId: string): AnalyticChart{
    const analyticChart = new AnalyticChart();
    player.playedStrategies.forEach( strategy =>
      analyticChart.dataPoints.push({y : strategy.timesPlayed, name : strategy.strategy.name})
    );
    analyticChart.chartId = chartId;
    analyticChart.chart = new CanvasJS.Chart(chartId, {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      height: 400,
      width: 500,
      interactivityEnabled: false,
      title: {
        text: 'Strategies played'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: analyticChart.dataPoints
      }]
    });

    analyticChart.chart.render();
    return analyticChart;
  }
  initChart(player: PlayerMatch, chartId: string): AnalyticChart{
    const analyticChart = new AnalyticChart();
    analyticChart.dataPoints.push({
      x: this.gameSession.numberOfRounds,
      y: player.totalPayoff
    });
    analyticChart.chartId = chartId;
    analyticChart.chart = new CanvasJS.Chart(chartId, {
      exportEnabled: true,
      height: 400,
      width: 500,
      interactivityEnabled: false,
      title: {
        text: 'Total payoff at round'
      },
      axisX: {
        title: 'Total rounds',
        interval: 1
      },
      axisY: {
        title: 'Total payoff',
        interval: 1
      },
      data: [{
        type: 'spline',
        dataPoints: analyticChart.dataPoints
      }]
    });
    analyticChart.chart.render();
    return analyticChart;
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
    this.onNumberOfRoundsChanged();
    this.notifierService.notify('info', `You played ${this.playerRow.selectedStrategy.name} and your opponent played ${this.playerColumn.selectedStrategy.name}`);


    this.updateTotalPayoffCharts();
    this.updateStrategiesCharts();

  }

  private updateTotalPayoffCharts(): void{
    this.chartPlayerRow.dataPoints.push(
      {
        y: this.playerRow.totalPayoff,
        x: this.gameSession.numberOfRounds
      }
    );
    this.chartPlayerRow.chart.render();

    this.chartPlayerColumn.dataPoints.push(
      {
        y: this.playerColumn.totalPayoff,
        x: this.gameSession.numberOfRounds
      }
    );
    this.chartPlayerColumn.chart.render();
  }

  private updateStrategiesCharts(): void{
    this.chartStrategiesPlayerColumn.dataPoints.length = 0;
    this.playerColumn.playedStrategies.forEach(
      strategy => {
        this.chartStrategiesPlayerColumn.dataPoints.push(
          {y : strategy.timesPlayed, name : strategy.strategy.name});
      }
    );
    this.chartStrategiesPlayerColumn.chart.render();

    this.chartStrategiesPlayerRow.dataPoints.length = 0;
    this.playerRow.playedStrategies.forEach(
      strategy => {
        this.chartStrategiesPlayerRow.dataPoints.push(
          {y : strategy.timesPlayed, name : strategy.strategy.name}
        );
      }
    );
    this.chartStrategiesPlayerRow.chart.render();
  }
  onNumberOfRoundsChanged(): void{
    switch (this.gameSession.numberOfRounds){
      case 10:
      case 20:
      case 50:
      case 100:
        const dialog = this.saveSessionDialog.open(SubmitScoreComponent, {centered: true});
        dialog.componentInstance.numberOfRounds = this.gameSession.numberOfRounds;
        dialog.result.then(data => {
          if (data === undefined || data === null || data === SubmitScoreOption.CANCEL){
            return;
          }

          const gameScore: GameScore = new GameScore();
          gameScore.game = this.gameSession.game;
          gameScore.numberOfRounds = this.gameSession.numberOfRounds;
          gameScore.totalPayoff = this.playerRow.totalPayoff;
          gameScore.player = this.playerRow.player;
          gameScore.user = JSON.parse(localStorage.getItem('user'));
          this.gameService.submitScore(gameScore).subscribe(
            response => {
              if (response.experience !== undefined){
                this.userService.updateUserExperience(response.experience).subscribe(
                  response2 => {
                    this.userService.saveUserToLocalStorage(response2.user);
                    this.notifierService.notify('success', response2.message);
                  }
                );
              }
              this.notifierService.notify('info', response.message);
            }
          );
        }, reason => {
          console.log(reason);
        });
        break;
    }
  }
  findPlayedStrategyByStrategyAndPlayerMatch(strategy: Strategy, playerMatch: PlayerMatch): PlayedStrategy{
    return playerMatch.playedStrategies.find(value => value.strategy.id === strategy.id);
  }

  ngOnDestroy(): void {
    if (this.gameSession !== undefined){
      localStorage.setItem('gameSession', JSON.stringify(this.gameSession));
    }
    this.subscriptions.forEach(
      sub => sub.unsubscribe()
    );
  }

  private initPlayers(): void {
    this.playerColumn = this.gameSession.players[1];
    this.playerRow = this.gameSession.players[0];
  }

  onSaveSession(): void {
    if (this.gameSession.numberOfRounds === 0){
      return;
    }
    const dialog = this.saveSessionDialog.open(SaveSessionDialogComponent, {centered: true});
    dialog.componentInstance.gameSessionData = this.gameSession;
    dialog.result.then(data => {
      if (data === undefined || data === null || data === SaveSessionOptions.CANCEL){
        return;
      }
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
    }, reason => {
      console.log(reason);
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

  onAdvice(): void {
    this.gameService.getGameAdvice(this.gameSession.game).subscribe(
      data => {
        const dialog = this.saveSessionDialog.open(GameAdviceComponent, {centered: true});
        dialog.componentInstance.gameAdviceData = data;
      }
    );
  }



}
