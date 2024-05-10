import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { StatsScreenComponent } from './list.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,
  ],
  declarations: [StatsScreenComponent],
})
export class StatsScreenModule {}
