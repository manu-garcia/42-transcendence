import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';
import { TournamentFormModule } from 'shared/tournament/form/form.module';

import { TournamentTableComponent } from './table.component';

@NgModule({
  imports: [LibModule, TournamentFormModule],
  declarations: [TournamentTableComponent],
  exports: [TournamentTableComponent],
})
export class TournamentTableModule {}
