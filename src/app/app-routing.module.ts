import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {GameAllComponent} from './components/game/game-all/game-all.component';
import {GameCreateComponent} from './components/game/game-create/game-create.component';
import {GameMatchComponent} from './components/game/game-match/game-match.component';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationGuard} from './guard/AuthenticationGuard';
import {GameSessionComponent} from './components/user/game-session/game-session.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {RegisterComponent} from './components/user/register/register.component';
import {UserGamesComponent} from './components/user/user-games/user-games.component';

const routes: Routes = [
  {path : 'register', component: RegisterComponent},
  {path : 'login', component: LoginComponent},
  {path : 'user/my-sessions', canActivate: [AuthenticationGuard], component: GameSessionComponent},
  {path : 'user/my-games', canActivate: [AuthenticationGuard], component: UserGamesComponent},
  {path : 'user/profile', canActivate: [AuthenticationGuard], component: ProfileComponent},
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
