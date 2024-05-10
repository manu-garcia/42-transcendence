import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';
import { SigninModule } from 'shared/user/signin/signin.module';

import { SigninComponent } from './signin.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    SigninModule,
  ],
  declarations: [SigninComponent],
})
export class UserSigninScreenModule {}
