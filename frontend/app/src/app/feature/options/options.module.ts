import { NgModule } from '@angular/core';
import { LibModuleShared } from 'shared/lib/lib.module';
import { OptionsRoutingModule } from './options-routing.module';
import { ParametersScreenModule } from './parameters/parameters.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,

    // Own modules
    OptionsRoutingModule,
    ParametersScreenModule,
  ],
})
export class OptionsScreenModule {}
