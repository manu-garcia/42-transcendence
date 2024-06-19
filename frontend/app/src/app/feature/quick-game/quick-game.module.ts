import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { QuickGameRoutingModule } from './quick-game-routing.module';
import { QuickGameListScreenModule } from './list/list.module';
import { GameScreenModule } from './game/game.module';
import { QuickGameDetailScreenModule } from './detail/detail.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    QuickGameRoutingModule,
    QuickGameListScreenModule,
    GameScreenModule,
    QuickGameDetailScreenModule,
  ],
})
export class QuickGameScreenModule {}
