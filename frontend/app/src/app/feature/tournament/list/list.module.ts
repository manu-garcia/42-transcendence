import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { TournamentModule } from 'shared/tournament/tournament.module';

import { TournamentListScreenComponent } from './list.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    TournamentModule,
  ],
  declarations: [TournamentListScreenComponent],
})
export class TournamentListScreenModule {}
