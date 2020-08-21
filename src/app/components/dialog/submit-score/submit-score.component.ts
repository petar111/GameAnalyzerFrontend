import {Component, Inject, OnInit} from '@angular/core';
import {SubmitScoreOption} from '../../../enum/submit-score-option.enum';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.css']
})
export class SubmitScoreComponent implements OnInit {
  cancel = SubmitScoreOption.CANCEL;
  submit = SubmitScoreOption.SUBMIT;
  numberOfRounds: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.numberOfRounds = data.numberOfRounds;
  }

  ngOnInit(): void {
  }

}
