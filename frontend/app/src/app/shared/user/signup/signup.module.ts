import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { SignupComponent } from './signup.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [SignupComponent],
  exports: [SignupComponent],
})
export class SignupModule {}
