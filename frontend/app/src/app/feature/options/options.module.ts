import { NgModule } from '@angular/core';
import { LibModule } from 'shared/lib/lib.module';
import { OptionsRoutingModule } from './options-routing.module';
import { ParametersScreenModule } from './parameters/parameters.module';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    // Own modules
    OptionsRoutingModule,
    ParametersScreenModule,
  ],
})
export class OptionsScreenModule {}
