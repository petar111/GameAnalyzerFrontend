import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameService} from '../../../service/game.service';
import {GameInfo} from '../../../model/GameInfo';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Game} from '../../../model/Game';
import {Router} from '@angular/router';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-all',
  templateUrl: './game-all.component.html',
  styleUrls: ['./game-all.component.css']
})
export class GameAllComponent implements OnInit, OnDestroy {

  public games: GameInfo[];
  private subscriptions: Subscription[] = [];
  page = 1;
  pageSize = 5;
  collectionSize;
  faVerified = faCheck;

  constructor(private gameService: GameService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.gameService.getAllCount().subscribe(
        (data) => {
          this.collectionSize = data;
        }
      )
    );
    this.refreshGames();
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

  refreshGames(): void {
    this.subscriptions.push(
      this.gameService.getAllGamesPage(this.page - 1, this.pageSize).subscribe( data => this.games = data)
    );
  }
}
