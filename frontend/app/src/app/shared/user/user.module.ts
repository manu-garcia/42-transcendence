import { NgModule } from '@angular/core';

import { UserTableModule } from './table/table.module';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';
import { UserAvatarModule } from './avatar/avatar.module';
import { StatusModule } from './status/status.module';
import { UserFriendsFormModule } from './friends-form/friends-form.module';

const modules = [UserTableModule, SigninModule, SignupModule, UserAvatarModule, StatusModule, UserFriendsFormModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class UserModuleShared {}
