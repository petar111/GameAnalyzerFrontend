import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthenticationGuard implements CanActivate{
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }
  canActivate(): boolean  {
    if (!this.authenticationService.isUserAuthenticated()){
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
