import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsScreenModule as FriendsListModule } from './list/friends.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    FriendsRoutingModule,
    FriendsListModule,
  ],
})
export class FriendsScreenModule {}
