import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { UserTableComponent } from './table.component';

@NgModule({
  imports: [
    LibModule,
  ],
  declarations: [
    UserTableComponent,
  ],
  exports: [
    UserTableComponent,
  ],
})
export class UserTableModule { }
