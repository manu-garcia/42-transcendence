import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { EventMatchTableComponent } from './detail.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [EventMatchTableComponent],
  exports: [EventMatchTableComponent],
})
export class EventMatchTableModule {}
