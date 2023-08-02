import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { UserRoutingModule } from './user-routing.module';
import { UserListScreenModule } from './list/list.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    // Own modules
    UserRoutingModule,
    UserListScreenModule,
  ],
})
export class UserScreenModule { }
