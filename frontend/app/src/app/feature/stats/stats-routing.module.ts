import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsScreenComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: StatsScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StatsRoutingModule {}
