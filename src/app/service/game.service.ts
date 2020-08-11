import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameInfo} from '../model/GameInfo';
import {Game} from '../model/Game';
import {GameSession} from '../model/match/GameSession';
import {GameSessionInfo} from '../model/match/GameSessionInfo';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private host = environment.apiUrl;
  constructor(private http: HttpClient) { }

  public getAllGames(): Observable<GameInfo[]>{
    return  this.http.get<GameInfo[]>(`${this.host}/game/all`);
  }
  public createGame(game: Game): Observable<any>{
    const gameJSON = JSON.stringify(game);
    return this.http.post<any>(`${this.host}/game/insert`, gameJSON, {headers: {'Content-type': `application/json`}});
  }

  getGameByName(name: string): Observable<Game> {
    return  this.http.get<Game>(`${this.host}/game/get?name=${name}`);
  }

  saveGameSession(gameSession: GameSession): Observable<GameSession> {
    const gameSessionJson = JSON.stringify(gameSession);
    return this.http.post<GameSession>(`${this.host}/game/game-session/save`, gameSessionJson,
      {headers: {'Content-type': `application/json`}});
  }

  getAllGameSessionsForUser(): Observable<GameSessionInfo[]> {
      const username = JSON.parse(localStorage.getItem('user')).username;
      return this.http.get<GameSessionInfo[]>(`${this.host}/game/game-session/get-by-creator?username=${username}`);
  }
}
