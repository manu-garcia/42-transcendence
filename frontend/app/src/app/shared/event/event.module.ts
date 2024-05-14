import { NgModule } from '@angular/core';

import { EventTableModule } from './table/table.module';
import { EventFormModule } from './form/form.module';

@NgModule({
  imports: [EventTableModule, EventFormModule],
  exports: [EventTableModule, EventFormModule],
})
export class EventModuleShared {}
