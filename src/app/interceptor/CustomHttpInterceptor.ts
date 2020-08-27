import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {environment} from '../../environments/environment';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor{
  private hostUrl = environment.apiUrl;
  constructor(private authenticationService: AuthenticationService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    if (request.url === `${this.hostUrl}/login` || request.url === `${this.hostUrl}/auth/login`
      || request.url === `${this.hostUrl}/register` || request.url === `${this.hostUrl}/auth/register`){
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
