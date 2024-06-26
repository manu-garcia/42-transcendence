import { NgModule } from '@angular/core';

import { LibModuleShared } from './lib/lib.module';
import { UserModuleShared } from './user/user.module';
import { EventModuleShared } from './event/event.module';
import { StatsModuleShared } from './stats/stats.module';

const modules = [
  // Third Party modules
  LibModuleShared,
  // Own modules
  UserModuleShared,
  EventModuleShared,
  StatsModuleShared,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
