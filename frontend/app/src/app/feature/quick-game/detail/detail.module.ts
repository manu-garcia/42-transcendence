import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { EventModuleShared } from 'shared/event/event.module';

import { QuickGameDetailScreenComponent } from './detail.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    EventModuleShared,
  ],
  declarations: [QuickGameDetailScreenComponent],
})
export class QuickGameDetailScreenModule {}
