import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';


import { FriendsScreenComponent } from './friends.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,


  ],
  declarations: [FriendsScreenComponent],
})
export class FriendsScreenModule {}
