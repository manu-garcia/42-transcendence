import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { EventModuleShared } from 'shared/event/event.module';

import { QuickGameListScreenComponent } from './list.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    EventModuleShared,
  ],
  declarations: [QuickGameListScreenComponent],
})
export class QuickGameListScreenModule {}
