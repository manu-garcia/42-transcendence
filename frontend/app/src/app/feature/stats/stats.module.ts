import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsScreenModule as StatsListModule } from './list/list.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    StatsRoutingModule,
    StatsListModule,
  ],
})
export class StatsScreenModule {}
