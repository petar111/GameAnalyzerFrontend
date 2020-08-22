import { Component, OnInit } from '@angular/core';

import {faCheckDouble} from '@fortawesome/free-solid-svg-icons/faCheckDouble';
import {faKey} from '@fortawesome/free-solid-svg-icons/faKey';
import {AuthenticationService} from '../../service/authentication.service';
import {LoginRequest} from '../../model/LoginRequest';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';

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
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          this.notifierService.notify('error', error.error.message);
        }else{
          // A server-side error
          console.log(error);
          this.notifierService.notify('error', error.statusText + ' ' + error.body);
        }
      })
    );
  }
}
