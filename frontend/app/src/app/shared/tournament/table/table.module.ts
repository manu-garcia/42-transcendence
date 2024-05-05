import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';
import { TournamentFormModule } from 'shared/tournament/form/form.module';

import { TournamentTableComponent } from './table.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [LibModule, TournamentFormModule],
  declarations: [TournamentTableComponent],
  exports: [TournamentTableComponent],
})
export class TournamentTableModule {}
