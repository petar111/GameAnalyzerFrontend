import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameInfo} from '../model/GameInfo';
import {Game} from '../model/Game';
import {GameSession} from '../model/match/GameSession';
import {GameSessionInfo} from '../model/match/GameSessionInfo';
import {Payoff} from '../model/Payoff';
import {GameAdviceData} from '../model/GameAdviceData';
import {GameScore} from '../model/score/GameScore';
import {User} from '../model/User';
import {VerificationRequest} from '../model/VerificationRequest';
import {PlayerMatch} from '../model/match/PlayerMatch';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private host = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllGamesByCreator(creator: User): Observable<GameInfo[]> {
    return  this.http.get<GameInfo[]>(`${this.host}/user/${creator.id}/games`);
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

  getGameSessionById(gameSessionId: number): Observable<GameSession> {
    return this.http.get<GameSession>(`${this.host}/game/game-session/${gameSessionId}`);
  }

  getGameAdvice(game: Game): Observable<GameAdviceData> {
    return this.http.get<GameAdviceData>(`${this.host}/game/${game.id}/advice`);
  }

  getGameById(gameId: number): Promise<Game> {
    return this.http.get<Game>(`${this.host}/game/${gameId}`).toPromise();
  }

  submitScore(gameScore: GameScore): Observable<any> {
    return this.http.post<any>(`${this.host}/game/score/submit`, gameScore, {headers: {'Content-type': `application/json`}});
  }


  requestVerification(game: GameInfo, user: User): Observable<any> {
    const verificationRequest = new VerificationRequest();
    verificationRequest.gameId = game.id;
    verificationRequest.userId = user.id;
    return this.http.post<any>(`${this.host}/game/request-verification`, verificationRequest);
  }

  makeNewGameSessionAndSaveItToLocalStorage(game: Game): void {
    const gameSession = new GameSession();

    gameSession.game = game;
    gameSession.players
      .push(new PlayerMatch(gameSession.game.players.find(p => p.name === 'Player1'), 'playerRow'));
    gameSession.players
      .push(new PlayerMatch(gameSession.game.players.find(p => p.name === 'Player2'), 'playerColumn'));

    localStorage.setItem('gameSession', JSON.stringify(gameSession));
  }

  getTodaysGameScores(): Observable<GameScore[]> {
    return this.http.get<GameScore[]>(`${this.host}/game/scores-today`);
  }

  getAllCount(): Observable<number> {
    return this.http.get<number>(`${this.host}/game/all/count`);
  }

  getAllGamesPage(page: number, pageSize: number): Observable<GameInfo[]> {
    return  this.http.get<GameInfo[]>(`${this.host}/game/all?page=${page}&pageSize=${pageSize}`);
  }
}
