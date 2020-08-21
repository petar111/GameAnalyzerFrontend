import { Injectable } from '@angular/core';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;
  constructor(private http: HttpClient) { }

  updateUserExperience(experienceAmount: number): Observable<any> {
    const userLocal: User = JSON.parse(localStorage.getItem('user'));
    return this.http.post<any>(`${this.host}/user/update/experience`, {user: userLocal, experience: experienceAmount},
      {headers: {'Content-type': `application/json`}});
  }
  saveUserToLocalStorage(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }
}
