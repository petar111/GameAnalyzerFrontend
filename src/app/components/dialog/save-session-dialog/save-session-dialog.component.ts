import {Component, Inject, OnInit} from '@angular/core';
import {SaveSessionOptions} from '../../../enum/save-session-options.enum';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-save-session-dialog',
  templateUrl: './save-session-dialog.component.html',
  styleUrls: ['./save-session-dialog.component.css']
})
export class SaveSessionDialogComponent implements OnInit {
  public saveAsNewOption = SaveSessionOptions.SAVE_AS_NEW;
  public overwriteExistingOption = SaveSessionOptions.OVERWRITE_EXISTING;
  public isNewGameSession: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public gameSessionData: any) {
    this.isNewGameSession = gameSessionData.id !== undefined && gameSessionData.id != null;
  }

  ngOnInit(): void {
  }

}
