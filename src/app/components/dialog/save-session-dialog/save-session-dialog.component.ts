import {Component, Inject, Input, OnInit} from '@angular/core';
import {SaveSessionOptions} from '../../../enum/save-session-options.enum';
import {GameSession} from '../../../model/match/GameSession';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-save-session-dialog',
  templateUrl: './save-session-dialog.component.html',
  styleUrls: ['./save-session-dialog.component.css']
})
export class SaveSessionDialogComponent implements OnInit {
  public saveAsNewOption = SaveSessionOptions.SAVE_AS_NEW;
  public overwriteExistingOption = SaveSessionOptions.OVERWRITE_EXISTING;
  public isNewGameSession: boolean;
  public cancel = SaveSessionOptions.CANCEL;
  @Input() public gameSessionData: GameSession;
  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.isNewGameSession = this.gameSessionData.id !== undefined && this.gameSessionData.id != null;
  }

  onCancelClick(): void {
    this.activeModal.close(this.cancel);
  }

  onSaveClick(): void {
    this.activeModal.close(this.saveAsNewOption);
  }

  onOverwriteExistingClick(): void {
    this.activeModal.close(this.overwriteExistingOption);
  }
}
