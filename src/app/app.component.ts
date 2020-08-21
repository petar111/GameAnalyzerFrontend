import { Component } from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'games-client';
  isLoginComponent = false;
  public onRouterOutletActivate(event: any): void {
    if (event instanceof LoginComponent || event instanceof RegisterComponent){
      this.isLoginComponent = true;
    }else{
      this.isLoginComponent = false;
    }
  }
}
