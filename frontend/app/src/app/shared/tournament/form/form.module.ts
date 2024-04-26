import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { TournamentFormComponent } from './form.component';

@NgModule({
  imports: [LibModule],
  declarations: [TournamentFormComponent],
  exports: [TournamentFormComponent],
})
export class TournamentFormModule {}
