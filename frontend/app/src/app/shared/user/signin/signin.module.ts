import { NgModule } from '@angular/core';

import { LibModule } from 'shared/lib/lib.module';

import { SigninComponent } from './signin.component';

@NgModule({
  imports: [LibModule],
  declarations: [SigninComponent],
  exports: [SigninComponent],
})
export class SigninModule {}
