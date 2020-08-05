import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {GameAllComponent} from './components/game/game-all/game-all.component';
import {GameCreateComponent} from './components/game/game-create/game-create.component';
import {GameMatchComponent} from './components/game/game-match/game-match.component';

const routes: Routes = [
  {path : 'game/match',  component: GameMatchComponent},
  {path : 'game/create',  component: GameCreateComponent},
  {path : 'game/all',  component: GameAllComponent},
  {path : 'home',  component: HomeComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
