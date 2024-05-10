import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { TournamentFormComponent } from './form.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [TournamentFormComponent],
  exports: [TournamentFormComponent],
})
export class TournamentFormModule {}
