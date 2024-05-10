import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninGuard } from 'core/guard/signin.guard';
import { RedirectorGuard } from 'core/guard/redirector.guard';
import { SignoutGuard } from 'core/guard/signout.guard';

import { SigninComponent } from 'feature/user/signin/signin.component';
import { SignupComponent } from 'feature/user/signup/signup.component';

import { SignedinGuard } from 'core/guard/signedin.guard';
import { SignedoutGuard } from 'core/guard/signedout.guard';
import { RedirectorGuard } from 'core/guard/redirector.guard';

import { SigninComponent } from 'feature/user/signin/signin.component';
import { SignupComponent } from 'feature/user/signup/signup.component';

const routes: Routes = [
  {
    path: 'signedin',
    canActivate: [SignedinGuard],
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full',
      },
      {
        path: 'user',
        loadChildren: () => import('./feature/user/user.module').then((m) => m.UserScreenModule),
      },
      {
        path: 'quick-game',
        loadChildren: () => import('./feature/quick-game/quick-game.module').then((m) => m.QuickGameScreenModule),
      },
      {
        path: 'tournament',
        loadChildren: () => import('./feature/tournament/tournament.module').then((m) => m.TournamentScreenModule),
      },
      {
        path: 'stats',
        loadChildren: () => import('./feature/stats/stats.module').then((m) => m.StatsScreenModule),
      },
      {
        path: 'options',
        loadChildren: () => import('./feature/options/options.module').then((m) => m.OptionsScreenModule),
      },
      {
        path: 'friends',
        loadChildren: () => import('./feature/friends/friends.module').then((m) => m.FriendsScreenModule),
      },
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [SignoutGuard],
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [SignoutGuard],
  },
  {
    path: '',
    component: SigninComponent,
    canActivate: [RedirectorGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
