import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { EventMatchTableComponent } from './detail.component';
import { GameModuleShared } from 'shared/game/game/game.module';

@NgModule({
  imports: [LibModuleShared, GameModuleShared],
  declarations: [EventMatchTableComponent],
  exports: [EventMatchTableComponent],
})
export class EventMatchTableModule {}
