import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuickGameListScreenComponent } from './list/list.component';
import { QuickGameDetailScreenComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'list/:id',
    component: QuickGameDetailScreenComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: QuickGameListScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class QuickGameRoutingModule {}
