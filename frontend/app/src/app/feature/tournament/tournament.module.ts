import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentListScreenModule } from './list/list.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    TournamentRoutingModule,
    TournamentListScreenModule,
  ],
})
export class TournamentScreenModule {}
