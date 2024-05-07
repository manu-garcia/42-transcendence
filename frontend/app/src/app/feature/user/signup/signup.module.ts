import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';
import { SignupModule } from 'shared/user/signup/signup.module';

import { SignupComponent } from './signup.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    SignupModule,
  ],
  declarations: [SignupComponent],
})
export class UserSignupScreenModule {}
