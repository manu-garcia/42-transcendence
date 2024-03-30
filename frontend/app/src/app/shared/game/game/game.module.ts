import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { GameComponent } from './game.component';

@NgModule({
  imports: [LibModule],
  declarations: [GameComponent],
  exports: [GameComponent],
})
export class GameModule {}
