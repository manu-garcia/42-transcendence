import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListScreenComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: UserListScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule {}
