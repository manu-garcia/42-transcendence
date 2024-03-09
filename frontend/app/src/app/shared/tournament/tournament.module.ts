import { NgModule } from '@angular/core';

import { TournamentTableModule } from './table/table.module';

@NgModule({
  imports: [TournamentTableModule],
  exports: [TournamentTableModule],
})
export class TournamentModule {}
