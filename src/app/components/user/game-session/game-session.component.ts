import { Component, OnInit } from '@angular/core';
import {GameSessionInfo} from '../../../model/match/GameSessionInfo';
import {GameService} from '../../../service/game.service';

@Component({
  selector: 'app-game-session',
  templateUrl: './game-session.component.html',
  styleUrls: ['./game-session.component.css']
})
export class GameSessionComponent implements OnInit {

  public gameSessionsInfo: GameSessionInfo[];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getAllGameSessionsForUser().subscribe(data => {
      console.log(data);
      this.gameSessionsInfo = data;
      console.log(this.gameSessionsInfo);
      console.log(this.gameSessionsInfo[0].game.name);
    });
  }

}
