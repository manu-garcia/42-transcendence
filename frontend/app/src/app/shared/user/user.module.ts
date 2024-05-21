import { NgModule } from '@angular/core';

import { UserTableModule } from './table/table.module';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { UserAvatarModule } from './avatar/avatar.module';

const modules = [UserTableModule, SigninModule, SignupModule, UserAvatarModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class UserModuleShared {}
