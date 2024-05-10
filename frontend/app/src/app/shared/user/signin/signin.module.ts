import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { SigninComponent } from './signin.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [SigninComponent],
  exports: [SigninComponent],
})
export class SigninModule {}
