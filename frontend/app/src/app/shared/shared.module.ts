import { NgModule } from '@angular/core';

import { LibModuleShared } from './lib/lib.module';
import { UserModule } from './user/user.module';
import { TournamentModuleShared } from './tournament/tournament.module';

const modules = [
  // Third Party modules
  LibModuleShared,
  // Own modules
  UserModule,
  TournamentModuleShared,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
