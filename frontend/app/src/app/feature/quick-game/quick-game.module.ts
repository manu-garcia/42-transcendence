import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { QuickGameRoutingModule } from './quick-game-routing.module';
import { GameScreenModule } from './game/game.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    // Own modules
    QuickGameRoutingModule,
    GameScreenModule,
  ],
})
export class QuickGameScreenModule {}
