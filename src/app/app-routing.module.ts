import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {GameAllComponent} from './components/game/game-all/game-all.component';
import {GameCreateComponent} from './components/game/game-create/game-create.component';
import {GameMatchComponent} from './components/game/game-match/game-match.component';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationGuard} from './guard/AuthenticationGuard';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : 'game/match', canActivate: [AuthenticationGuard], component: GameMatchComponent},
  {path : 'game/create', canActivate: [AuthenticationGuard],   component: GameCreateComponent},
  {path : 'game/all', canActivate: [AuthenticationGuard],  component: GameAllComponent},
  {path : 'home', canActivate: [AuthenticationGuard],  component: HomeComponent},
  {path : '', redirectTo: 'home', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
