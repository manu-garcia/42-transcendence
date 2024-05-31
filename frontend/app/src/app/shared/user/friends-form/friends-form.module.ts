import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { UserFriendsFormComponent } from './friends-form.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [UserFriendsFormComponent],
  exports: [UserFriendsFormComponent],
})
export class UserFriendsFormModule {}
