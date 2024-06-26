import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { StatsModuleShared } from 'shared/stats/stats.module';

import { StatsDashboardScreenComponent } from './dashboard.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    StatsModuleShared,
  ],
  declarations: [StatsDashboardScreenComponent],
})
export class StatsDashboardScreenModule {}
