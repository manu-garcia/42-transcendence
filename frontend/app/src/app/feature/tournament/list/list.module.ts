import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';
import { TournamentModule } from 'shared/tournament/tournament.module';

import { TournamentListScreenComponent } from './list.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    // Own modules
    TournamentModule,
  ],
  declarations: [TournamentListScreenComponent],
})
export class TournamentListScreenModule {}
