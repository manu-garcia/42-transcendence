import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { EventModuleShared } from 'shared/event/event.module';

import { TournamentDetailScreenComponent } from './detail.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    EventModuleShared,
  ],
  declarations: [TournamentDetailScreenComponent],
})
export class TournamentDetailScreenModule {}
