import { NgModule } from '@angular/core';

import { LibModuleShared } from './lib/lib.module';
import { UserModule } from './user/user.module';
import { TournamentModule } from './tournament/tournament.module';

const modules = [
  // Third Party modules
  LibModuleShared,
  // Own modules
  UserModule,
  TournamentModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
