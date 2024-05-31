import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';
import { UserFormModule } from 'shared/user/form/form.module';

import { ParametersScreenComponent } from './parameters.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    UserFormModule,
  ],
  declarations: [ParametersScreenComponent],
})
export class ParametersScreenModule {}
