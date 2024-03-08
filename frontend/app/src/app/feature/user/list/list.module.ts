import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';
import { UserTableModule } from 'shared/user/table/table.module';

import { UserListScreenComponent } from './list.component';

@NgModule({
  imports: [
    // Third-party modules
    LibModule,

    // Own modules
    UserTableModule,
  ],
  declarations: [UserListScreenComponent],
})
export class UserListScreenModule {}
