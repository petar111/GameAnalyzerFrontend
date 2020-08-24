import {Component, Inject, Input, OnInit} from '@angular/core';
import {GameSession} from '../../../../model/match/GameSession';
import {PlayerMatch} from '../../../../model/match/PlayerMatch';
import {Strategy} from '../../../../model/Strategy';
import {PlayedStrategy} from '../../../../model/match/PlayedStrategy';
import {GameSessionDetailsOptions} from '../../../../enum/game-session-details-options.enum';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-session-details',
  templateUrl: './game-session-details.component.html',
  styleUrls: ['./game-session-details.component.css']
})
export class GameSessionDetailsComponent implements OnInit {

  public playerRow: PlayerMatch;
  public playerColumn: PlayerMatch;
  public loadGameSession = GameSessionDetailsOptions.LOAD_GAME_SESSION;
  public cancel = GameSessionDetailsOptions.CANCEL;
  @Input() public gameSession: GameSession;
  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.playerRow = this.gameSession.players.find(playerMatch => playerMatch.playerLabel === 'playerRow');
    this.playerColumn = this.gameSession.players.find(playerMatch => playerMatch.playerLabel === 'playerColumn');
  }

  findPlayedStrategyByStrategyAndPlayerMatch(strategy: Strategy, playerMatch: PlayerMatch): PlayedStrategy{
    return playerMatch.playedStrategies.find(value => value.strategy.id === strategy.id);
  }

  getPlayerColumnPayoffAmount(playedStrategy: Strategy, opposingStrategy: Strategy): number {
    return this.playerColumn.player.payoffs.find(payoff =>
      payoff.playedStrategy.name === playedStrategy.name && payoff.opposingStrategy.name === opposingStrategy.name).amount;
  }

  getPlayerRowPayoffAmount(playedStrategy: Strategy, opposingStrategy: Strategy): number {
    return this.playerRow.player.payoffs.find(payoff =>
      payoff.playedStrategy.name === playedStrategy.name && payoff.opposingStrategy.name === opposingStrategy.name).amount;
  }

  onCloseClick(): void {
    this.activeModal.close(this.cancel);
  }

  onLoadClick(): void {
    this.activeModal.close(this.loadGameSession);
  }
}
