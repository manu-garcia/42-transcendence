import { NgModule } from '@angular/core';

import { UserModule } from './user/user.module';

const modules = [
    // Own modules
    UserModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule { }
