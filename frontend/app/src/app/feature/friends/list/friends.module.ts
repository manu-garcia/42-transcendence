import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';


import { FriendsScreenComponent } from './friends.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,


  ],
  declarations: [FriendsScreenComponent],
})
export class FriendsScreenModule {}
