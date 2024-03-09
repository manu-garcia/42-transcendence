import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TournamentListScreenComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: TournamentListScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TournamentRoutingModule {}
