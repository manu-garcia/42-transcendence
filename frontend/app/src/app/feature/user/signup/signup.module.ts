import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { SignupModule } from 'shared/user/signup/signup.module';

import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    SignupModule,
  ],
  declarations: [SignupComponent],
})
export class UserSignupScreenModule {}
