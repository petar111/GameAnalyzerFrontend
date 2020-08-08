import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LoginRequest} from '../model/LoginRequest';
import {User} from '../model/User';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
}
