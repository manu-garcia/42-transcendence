import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { SignupComponent } from './signup.component';

@NgModule({
  imports: [LibModule],
  declarations: [SignupComponent],
  exports: [SignupComponent],
})
export class SignupModule {}
