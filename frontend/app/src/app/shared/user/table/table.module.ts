import { NgModule } from '@angular/core';

import { UserTableComponent } from './table.component';

@NgModule({
  declarations: [
    UserTableComponent,
  ],
  exports: [
    UserTableComponent,
  ],
})
export class UserTableModule { }
