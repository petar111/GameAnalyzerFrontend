import { Injectable } from '@angular/core';
import {User} from '../model/User';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {FollowRequest} from '../model/FollowRequest';

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

  getUserFromLocalStorage(): User{
    return JSON.parse(localStorage.getItem('user'));
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, user);
  }

  getAllFollowingUsernames(user: User): Observable<string[]> {
    return this.http.get<string[]>(`${this.host}/user/${user.id}/following`);
  }

  getAllFollowersUsernames(user: User): Observable<string[]> {
    return this.http.get<string[]>(`${this.host}/user/${user.id}/followers`);
  }

  getFollowersCount(user: User): Observable<number> {
    return this.http.get<number>(`${this.host}/user/${user.id}/followers/count`);
  }
  getFollowingCount(user: User): Observable<number> {
    return this.http.get<number>(`${this.host}/user/${user.id}/following/count`);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.host}/user/@/${username}`);
  }

  followUser(loggedUser: User, user: User): Observable<any> {
    const followRequest = new FollowRequest();
    followRequest.followerId = loggedUser.id;
    followRequest.followingId = user.id;
    return this.http.post<any>(`${this.host}/user/follow`, followRequest);
  }

  UnfollowUser(loggedUser: User, user: User): Observable<any> {
    const followRequest = new FollowRequest();
    followRequest.followerId = loggedUser.id;
    followRequest.followingId = user.id;
    return this.http.post<any>(`${this.host}/user/un-follow`, followRequest);
  }

  isUserFollowing(loggedUser: User, user: User): Observable<boolean> {
    return this.http.get<boolean>(`${this.host}/user/${loggedUser.id}/is-following/${user.id}`);
  }
}
