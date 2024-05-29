import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { UserFormComponent } from './form.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [UserFormComponent],
  exports: [UserFormComponent],
})
export class UserFormModule {}
