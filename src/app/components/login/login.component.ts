import { Component, OnInit } from '@angular/core';

import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {faCheckDouble} from '@fortawesome/free-solid-svg-icons/faCheckDouble';
import {faKey} from '@fortawesome/free-solid-svg-icons/faKey';
import {AuthenticationService} from '../../service/authentication.service';
import {LoginRequest} from '../../model/LoginRequest';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {User} from '../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerIcon = faCheckDouble;
  signInIcon = faKey;

  public loginRequest: LoginRequest;
  constructor(private authenticationService: AuthenticationService,
              private notifierService: NotifierService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit(value: any): void {
    console.log(value);
    this.loginRequest = new LoginRequest(value.username, value.password);
    this.authenticationService.login(this.loginRequest).subscribe(
      (data => {
        this.authenticationService.saveAuthenticationData(data);
        this.router.navigateByUrl('');
      }),
      (error => {
        this.notifierService.notify('error', 'The username or password are not correct.');
      })
    );
  }
}
