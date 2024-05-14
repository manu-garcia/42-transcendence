import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { EventFormComponent } from './form.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [EventFormComponent],
  exports: [EventFormComponent],
})
export class EventFormModule {}
