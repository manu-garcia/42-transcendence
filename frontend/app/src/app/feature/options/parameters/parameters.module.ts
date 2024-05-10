import { NgModule } from '@angular/core';
import { LibModule } from 'shared/lib/lib.module';
import { ParametersScreenComponent } from './parameters.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,
  ],
  declarations: [ParametersScreenComponent],
})
export class ParametersScreenModule {}
