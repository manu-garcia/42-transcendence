import { NgModule } from '@angular/core';

import { LibModuleShared } from './lib/lib.module';
import { UserModuleShared } from './user/user.module';
import { EventModuleShared } from './event/event.module';

const modules = [
  // Third Party modules
  LibModuleShared,
  // Own modules
  UserModuleShared,
  EventModuleShared,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
