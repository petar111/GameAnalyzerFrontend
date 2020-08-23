import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameInfo} from '../../../model/GameInfo';
import {GameService} from '../../../service/game.service';
import {Subscription} from 'rxjs';
import {User} from '../../../model/User';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css']
})
export class UserGamesComponent implements OnInit, OnDestroy {

  public games: GameInfo[] = [];
  private subscriptions: Subscription[] = [];
  private user: User;
  constructor(private gameService: GameService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    this.subscriptions.push(
      this.gameService.getAllGamesByCreator(this.user).subscribe( data => this.games = data)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}
