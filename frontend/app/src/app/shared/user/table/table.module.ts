import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { UserTableComponent } from './table.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [LibModule],
  declarations: [UserTableComponent],
  exports: [UserTableComponent],
})
export class UserTableModule {}
