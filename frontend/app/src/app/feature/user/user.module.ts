import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { UserRoutingModule } from './user-routing.module';
import { UserListScreenModule } from './list/list.module';
import { UserSigninScreenModule } from './signin/signin.module';
import { UserSignupScreenModule } from './signup/signup.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    // Own modules
    UserRoutingModule,
    UserListScreenModule,
    UserSigninScreenModule,
    UserSignupScreenModule,
  ],
})
export class UserScreenModule {}
