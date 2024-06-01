import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { StatusModule } from 'shared/user/status/status.module';

import { UserTableComponent } from './table.component';

@NgModule({
  imports: [LibModuleShared, StatusModule],
  declarations: [UserTableComponent],
  exports: [UserTableComponent],
})
export class UserTableModule {}
