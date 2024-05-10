import { NgModule } from '@angular/core';

import { TournamentTableModule } from './table/table.module';
import { TournamentFormModule } from './form/form.module';

@NgModule({
  imports: [TournamentTableModule, TournamentFormModule],
  exports: [TournamentTableModule, TournamentFormModule],
})
export class TournamentModuleShared {}
