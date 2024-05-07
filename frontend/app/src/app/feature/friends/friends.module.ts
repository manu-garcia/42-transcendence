import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsScreenModule as FriendsListModule } from './list/friends.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    // Own modules
    FriendsRoutingModule,
    FriendsListModule,
  ],
})
export class FriendsScreenModule {}
