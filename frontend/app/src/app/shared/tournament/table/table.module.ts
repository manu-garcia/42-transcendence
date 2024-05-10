import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { TournamentFormModule } from 'shared/tournament/form/form.module';

import { TournamentTableComponent } from './table.component';

@NgModule({
  imports: [LibModuleShared, TournamentFormModule],
  declarations: [TournamentTableComponent],
  exports: [TournamentTableComponent],
})
export class TournamentTableModule {}
