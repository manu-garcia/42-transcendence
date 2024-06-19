import { NgModule } from '@angular/core';

import { EventTableModule } from './table/table.module';
import { EventFormModule } from './form/form.module';
import { EventMatchTableModule } from './detail/detail.module';

@NgModule({
  imports: [EventTableModule, EventFormModule, EventMatchTableModule],
  exports: [EventTableModule, EventFormModule, EventMatchTableModule],
})
export class EventModuleShared {}
