import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { UserAvatarComponent } from './avatar.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [UserAvatarComponent],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
