import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/user.service';
import {User} from '../../../model/User';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {ExternalService} from '../../../service/external.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public countryNames: string[];
  public followingEnabled = false;
  public followingUsernames: string[];

  public followersEnabled = false;
  public followersUsernames: string[];
  followingCount: any;
  followersCount: any;
  constructor(private userService: UserService,
              private notifierService: NotifierService,
              private router: Router,
              private externalService: ExternalService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    this.followingUsernames = [];
    this.externalService.getAllCountries().subscribe(
      data => {
        this.countryNames = data.map((val) => val.name );
      }
    );
    this.userService.getFollowersCount(this.user).subscribe(
      data => {
        this.followersCount = data;
      }
    );
    this.userService.getFollowingCount(this.user).subscribe(
      data => {
        this.followingCount = data;
      }
    );
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

  onCountryClick(countryName: string): void {
    this.user.country = countryName;
  }


  onCountryMenyFocus($event: FocusEvent): void {
    console.log($event);
  }


  onCountryInput(value: string): void {
    // const searchValue = target.value;
    console.log(value);
  }

  onFollowingClick(): void {
    if (this.followingEnabled){
      this.followingEnabled = false;
      this.followingUsernames = [];
    }else{
      this.userService.getAllFollowingUsernames(this.user).subscribe(
        data => {
          this.followingUsernames = data;
          this.followingEnabled = true;
        }
      );
    }
  }

  onFollowersClick(): void {
    if (this.followersEnabled){
      this.followersEnabled = false;
      this.followersUsernames = [];
    }else{
      this.userService.getAllFollowersUsernames(this.user).subscribe(
        data => {
          this.followersUsernames = data;
          this.followersEnabled = true;
        }
      );
    }
  }

  calculatePercentageExperience(): number {
    return (this.user.experience / this.user.rank.experienceMax) * 100;
  }

  calculateToPromotion(): number {
    return this.user.rank.experienceMax + 1 - this.user.experience;
  }
}
