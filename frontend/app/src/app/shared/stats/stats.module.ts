import { NgModule } from '@angular/core';

import { PieChartModuleShared } from './pie/pie.module';

@NgModule({
  imports: [PieChartModuleShared],
  exports: [PieChartModuleShared],
})
export class StatsModuleShared {}
