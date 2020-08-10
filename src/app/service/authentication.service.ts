import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LoginRequest} from '../model/LoginRequest';
import {User} from '../model/User';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public token: string;
  private jwtHelper = new JwtHelperService();
  constructor(private httpClient: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(`${environment.apiUrl}/login`, loginRequest, {observe: 'response'});
  }
  logout(): void{
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
  }

  saveAuthenticationData(data: HttpResponse<User>): void {
    localStorage.setItem('token', data.headers.get('Jwt-token'));
    localStorage.setItem('user', JSON.stringify(data.body));
    console.log(data.body);
    console.log(data.headers);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
  loadToken(): void{
    this.token = localStorage.getItem('token');
  }

  isUserAuthenticated(): boolean {
    this.loadToken();
    if (this.token === null || this.token === ''){
      return false;
    }
    if (this.jwtHelper.decodeToken(this.token).sub === null || this.jwtHelper.decodeToken(this.token).sub === ''){
      return false;
    }
    if (this.jwtHelper.isTokenExpired(this.token)){
      return false;
    }
    return true;
  }
}
