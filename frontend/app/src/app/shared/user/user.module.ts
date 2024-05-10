import { NgModule } from '@angular/core';

import { UserTableModule } from './table/table.module';
import { SigninModule } from './signin/signin.module';
import { SignupModule } from './signup/signup.module';

const modules = [UserTableModule, SigninModule, SignupModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class UserModuleShared {}
