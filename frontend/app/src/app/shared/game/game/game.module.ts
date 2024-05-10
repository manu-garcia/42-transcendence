import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { GameComponent } from './game.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [GameComponent],
  exports: [GameComponent],
})
export class GameModuleShared {}
