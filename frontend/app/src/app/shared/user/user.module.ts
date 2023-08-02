import { NgModule } from '@angular/core';

import { UserTableModule } from './table/table.module';

@NgModule({
  imports: [
    UserTableModule,
  ],
  exports: [
    UserTableModule,
  ],
})
export class UserModule { }
