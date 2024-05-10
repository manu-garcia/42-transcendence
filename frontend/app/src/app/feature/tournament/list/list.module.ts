import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { TournamentModuleShared } from 'shared/tournament/tournament.module';

import { TournamentListScreenComponent } from './list.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    TournamentModuleShared,
  ],
  declarations: [TournamentListScreenComponent],
})
export class TournamentListScreenModule {}
