import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { UserTableModule } from 'shared/user/table/table.module';

import { FriendsScreenComponent } from './friends.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    UserTableModule,
  ],
  declarations: [FriendsScreenComponent],
})
export class FriendsScreenModule {}
