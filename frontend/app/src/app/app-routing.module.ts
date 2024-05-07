import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
