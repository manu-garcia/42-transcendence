import { NgModule } from '@angular/core';

import { GameModuleShared } from './game/game.module';

@NgModule({
  imports: [GameModuleShared],
  exports: [GameModuleShared],
})
export class GameModuleShared {}
