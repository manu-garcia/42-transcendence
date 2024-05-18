import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { GameComponent } from './game.component';
import { GameOptionsComponent } from './options/options.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [GameComponent, GameOptionsComponent],
  exports: [GameComponent, GameOptionsComponent],
})
export class GameModuleShared {}
