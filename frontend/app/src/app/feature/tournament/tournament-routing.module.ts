import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TournamentListScreenComponent } from './list/list.component';
import { TournamentDetailScreenComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'list/:id',
    component: TournamentDetailScreenComponent,
  },
  {
    path: 'list',
    component: TournamentListScreenComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TournamentRoutingModule {}
