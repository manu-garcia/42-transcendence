import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';
import { GameModuleShared } from 'shared/game/game/game.module';

import { GameScreenComponent } from './game.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    GameModuleShared,
  ],
  declarations: [GameScreenComponent],
})
export class GameScreenModule {}
