import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameService} from '../../../service/game.service';
import {GameInfo} from '../../../model/GameInfo';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Game} from '../../../model/Game';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-all',
  templateUrl: './game-all.component.html',
  styleUrls: ['./game-all.component.css']
})
export class GameAllComponent implements OnInit, OnDestroy {

  public games: GameInfo[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit(): void {
      this.subscriptions.push(
        this.gameService.getAllGames().subscribe( data => this.games = data)
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  async onNewGameMatch(game: GameInfo): Promise<void> {
    let wholeGame: Game;
    await this.gameService.getGameById(game.id).then(
      (data) => {
        wholeGame = data;
      }
    );
    this.gameService.makeNewGameSessionAndSaveItToLocalStorage(wholeGame);
    this.router.navigateByUrl('game/match');
  }
}
