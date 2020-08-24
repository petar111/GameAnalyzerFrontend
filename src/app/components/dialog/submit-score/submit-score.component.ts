import {Component, Input, OnInit} from '@angular/core';
import {SubmitScoreOption} from '../../../enum/submit-score-option.enum';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.css']
})
export class SubmitScoreComponent implements OnInit {
  cancel = SubmitScoreOption.CANCEL;
  submit = SubmitScoreOption.SUBMIT;
  @Input() numberOfRounds: number;
  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.activeModal.close(this.cancel);
  }

  onSubmitClick(): void {
    this.activeModal.close(this.submit);
  }
}
