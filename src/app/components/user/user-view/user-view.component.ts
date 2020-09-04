import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../../model/User';
import {UserService} from '../../../service/user.service';
import {Subscription} from 'rxjs';
import {NotifierService} from 'angular-notifier';
import {faSubscript, faUnlink, faUserMinus, faUserPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {

  faFollow = faUserPlus;
  faUnFollow = faUserMinus;
  @Input()
  public username: string;
  public user: User;
  public loggedUser: User;
  public subscriptions: Subscription[] = [];
  public isFollowing: boolean;
  @Output()
  public unFollowUser: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public followUser: EventEmitter<string> = new EventEmitter<string>();
  constructor(private userService: UserService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.loggedUser = this.userService.getUserFromLocalStorage();
    this.subscriptions.push(
      this.userService.getUserByUsername(this.username).subscribe(
        (data) => {
          this.user = data;
          this.userService.isUserFollowing(this.loggedUser, this.user).subscribe(
            (dataFollowing) => this.isFollowing = dataFollowing
          );
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      sub => sub.unsubscribe()
    );
  }

  onFollow(): void {
    this.isFollowing = true;
    this.subscriptions.push(
      this.userService.followUser(this.loggedUser, this.user).subscribe(
        (data) => {
          this.notifierService.notify('info', data.message);
          this.followUser.emit(this.user.username);
        }, (err) => {
          this.notifierService.notify('error', err.error);
        }
      )
    );
  }

  onUnFollow(): void {
    this.isFollowing = false;
    this.subscriptions.push(
      this.userService.UnfollowUser(this.loggedUser, this.user).subscribe(
        (data) => {
          this.notifierService.notify('info', data.message);
          this.unFollowUser.emit(this.user.username);
        }, (err) => {
          this.notifierService.notify('error', err.error);
        }
      )
    );
  }
}
