import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { UserStatusPipe } from './status.pipe';
import { UserStatusColorPipe } from './status-color.pipe';

@NgModule({
  declarations: [UserStatusPipe, UserStatusColorPipe],
  imports: [LibModuleShared],
  exports: [UserStatusPipe, UserStatusColorPipe],
})
export class StatusModule {}
