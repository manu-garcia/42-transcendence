import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentListScreenModule } from './list/list.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    // Own modules
    TournamentRoutingModule,
    TournamentListScreenModule,
  ],
})
export class TournamentScreenModule {}
