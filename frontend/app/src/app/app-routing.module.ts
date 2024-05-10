import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< Updated upstream
const routes: Routes = [
  {
    path: 'tournament',
    loadChildren: () => import('./feature/tournament/tournament.module').then((m) => m.TournamentScreenModule),
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
    path: 'friends',
    loadChildren: () => import('./feature/friends/friends.module').then((m) => m.FriendsScreenModule),
=======
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
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [SignedoutGuard],
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [SignedoutGuard],
>>>>>>> Stashed changes
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
