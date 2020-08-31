import {Component, Input, OnInit} from '@angular/core';
import {GameAdviceData} from '../../../model/GameAdviceData';

@Component({
  selector: 'app-game-advice',
  templateUrl: './game-advice.component.html',
  styleUrls: ['./game-advice.component.css']
})
export class GameAdviceComponent implements OnInit {

  @Input()
  public gameAdviceData: GameAdviceData;
  constructor() { }

  ngOnInit(): void {
  }

}
