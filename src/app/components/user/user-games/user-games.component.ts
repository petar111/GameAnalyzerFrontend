import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameInfo} from '../../../model/GameInfo';
import {GameService} from '../../../service/game.service';
import {Subscription} from 'rxjs';
import {User} from '../../../model/User';
import {UserService} from '../../../service/user.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.css']
})
export class UserGamesComponent implements OnInit, OnDestroy {

  public games: GameInfo[] = [];
  private subscriptions: Subscription[] = [];
  private user: User;
  constructor(private gameService: GameService,
              private userService: UserService,
              private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    this.subscriptions.push(
      this.gameService.getAllGamesByCreator(this.user).subscribe( data => this.games = data)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  isGameVerified(game: GameInfo): boolean {
    return game.verificationStatus.name === 'VERIFIED' || game.verificationStatus.name === 'WILDCARD_VERIFIED';
  }

  onAttemptVerification(game: GameInfo): void {
    this.gameService.requestVerification(game, this.user).subscribe(
      (data) => {
        this.userService.saveUserToLocalStorage(data.user);
        this.user = this.userService.getUserFromLocalStorage();
        this.games = this.games.filter(gameInArray => game.id !== gameInArray.id);
        this.games.push(data.game);
        this.notifierService.notify('info', data.message);
      }
    );
  }
}
