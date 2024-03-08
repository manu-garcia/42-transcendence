import { NgModule } from '@angular/core';

import { LibModule } from './lib/lib.module';
import { UserModule } from './user/user.module';

const modules = [
  // Third Party modules
  LibModule,
  // Own modules
  UserModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
