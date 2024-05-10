import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParametersScreenComponent } from './parameters/parameters.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'parameters',
    pathMatch: 'full',
  },
  {
    path: 'options',
    component: ParametersScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class OptionsRoutingModule {}
