import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GameAllComponent } from './components/game/game-all/game-all.component';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { GameCreateComponent } from './components/game/game-create/game-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GameMatchComponent } from './components/game/game-match/game-match.component';
import {NotifierModule} from 'angular-notifier';
import { LoginComponent } from './components/login/login.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CustomHttpInterceptor} from './interceptor/CustomHttpInterceptor';
import { GameSessionComponent } from './components/user/game-session/game-session.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SaveSessionDialogComponent } from './components/dialog/save-session-dialog/save-session-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import { GameSessionDetailsComponent } from './components/user/game-session/game-session-details/game-session-details.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SubmitScoreComponent } from './components/dialog/submit-score/submit-score.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    GameAllComponent,
    GameCreateComponent,
    GameMatchComponent,
    LoginComponent,
    GameSessionComponent,
    SaveSessionDialogComponent,
    GameSessionDetailsComponent,
    ProfileComponent,
    SubmitScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NotifierModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
