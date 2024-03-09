import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { TournamentTableComponent } from './table.component';

@NgModule({
  imports: [LibModule],
  declarations: [TournamentTableComponent],
  exports: [TournamentTableComponent],
})
export class TournamentTableModule {}
