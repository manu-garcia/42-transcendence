import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { SigninModule } from 'shared/user/signin/signin.module';

import { SigninComponent } from './signin.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    SigninModule,
  ],
  declarations: [SigninComponent],
})
export class UserSigninScreenModule {}
