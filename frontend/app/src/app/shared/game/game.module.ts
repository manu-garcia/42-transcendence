import { NgModule } from '@angular/core';

import { GameModule } from './game/game.module';

@NgModule({
  imports: [GameModule],
  exports: [GameModule],
})
export class GameModule {}
