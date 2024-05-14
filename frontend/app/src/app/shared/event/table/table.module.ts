import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { EventFormModule } from 'shared/event/form/form.module';

import { EventTableComponent } from './table.component';

@NgModule({
  imports: [LibModuleShared, EventFormModule],
  declarations: [EventTableComponent],
  exports: [EventTableComponent],
})
export class EventTableModule {}
