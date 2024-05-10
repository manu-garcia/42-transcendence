import { NgModule } from '@angular/core';
import { LibModuleShared } from 'shared/lib/lib.module';
import { ParametersScreenComponent } from './parameters.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModuleShared,
  ],
  declarations: [ParametersScreenComponent],
})
export class ParametersScreenModule {}
