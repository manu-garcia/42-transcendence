import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { UserRoutingModule } from './user-routing.module';
import { UserListScreenModule } from './list/list.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    UserRoutingModule,
    UserListScreenModule,
  ],
})
export class UserScreenModule {}
