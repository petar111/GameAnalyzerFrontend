import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameService} from '../../../service/game.service';
import {GameInfo} from '../../../model/GameInfo';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-game-all',
  templateUrl: './game-all.component.html',
  styleUrls: ['./game-all.component.css']
})
export class GameAllComponent implements OnInit, OnDestroy {

  public games: GameInfo[] = [];
  private subscriptions: Subscription[] = [];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
      this.subscriptions.push(
        this.gameService.getAllGames().subscribe( data => this.games = data)
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}
