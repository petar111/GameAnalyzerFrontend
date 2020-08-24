import { Component, OnInit } from '@angular/core';
import {GameSessionInfo} from '../../../model/match/GameSessionInfo';
import {GameService} from '../../../service/game.service';
import {GameSessionDetailsComponent} from './game-session-details/game-session-details.component';
import {GameSessionDetailsOptions} from '../../../enum/game-session-details-options.enum';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {

  public gameSessionsInfo: GameSessionInfo[];
  constructor(private gameService: GameService, private gameSessionDetailsDialog: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.gameService.getAllGameSessionsForUser().subscribe(data => {
      console.log(data);
      this.gameSessionsInfo = data;
      console.log(this.gameSessionsInfo);
      console.log(this.gameSessionsInfo[0].game.name);
    });
  }

  onDetailsClick(gameSessionId: number): void {
    this.gameService.getGameSessionById(gameSessionId).subscribe(response => {
      console.log(response);
      const dialogRef = this.gameSessionDetailsDialog.open(GameSessionDetailsComponent);
      dialogRef.componentInstance.gameSession = response;

      dialogRef.result.then(
        data => {
          if (data === GameSessionDetailsOptions.LOAD_GAME_SESSION){
            localStorage.setItem('gameSession', JSON.stringify(response));
            this.router.navigateByUrl('game/match');
          }
        }, reason => {
          console.log(reason);
        }
      );
    });
  }

  onLoad(gameSessionId: number): void {
    this.gameService.getGameSessionById(gameSessionId).subscribe(response => {
      localStorage.setItem('gameSession', JSON.stringify(response));
      this.router.navigateByUrl('game/match');
    });
  }
}
