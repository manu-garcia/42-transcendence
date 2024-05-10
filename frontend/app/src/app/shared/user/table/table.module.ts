import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { UserTableComponent } from './table.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [UserTableComponent],
  exports: [UserTableComponent],
})
export class UserTableModule {}
