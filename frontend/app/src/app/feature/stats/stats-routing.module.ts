import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatsDashboardScreenComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: StatsDashboardScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StatsRoutingModule {}
