import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/User';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;
  constructor(private userService: UserService, private notifierService: NotifierService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
  }

  onChange(): void {
    console.log(this.user.firstName);
  }

  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe(
      data => {
        this.userService.saveUserToLocalStorage(data);
        this.notifierService.notify('success', 'Your profile has been modified.');
      }
    );
  }
}
