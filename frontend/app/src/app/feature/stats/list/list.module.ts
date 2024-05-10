import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';


import { StatsScreenComponent } from './list.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,


  ],
  declarations: [StatsScreenComponent],
})
export class StatsScreenModule {}
