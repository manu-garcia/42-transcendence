import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FriendsScreenComponent } from './list/friends.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'friends',
    pathMatch: 'full',
  },
  {
    path: 'friends',
    component: FriendsScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FriendsRoutingModule {}
