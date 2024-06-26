import { NgModule } from '@angular/core';

import { LibModuleShared } from 'shared/lib/lib.module';

import { PieChartComponent } from './pie.component';

@NgModule({
  imports: [LibModuleShared],
  declarations: [PieChartComponent],
  exports: [PieChartComponent],
})
export class PieChartModuleShared {}
