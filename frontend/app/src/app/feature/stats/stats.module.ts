import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { StatsRoutingModule } from './stats-routing.module';
import { StatsDashboardScreenModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    StatsRoutingModule,
    StatsDashboardScreenModule,
  ],
})
export class StatsScreenModule {}
