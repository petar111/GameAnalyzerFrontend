import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GameAllComponent } from './components/game/game-all/game-all.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { GameCreateComponent } from './components/game/game-create/game-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GameMatchComponent } from './components/game/game-match/game-match.component';
import {NotifierModule} from 'angular-notifier';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    GameAllComponent,
    GameCreateComponent,
    GameMatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NotifierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
