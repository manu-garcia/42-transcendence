import { NgModule } from '@angular/core';

import { LibModuleShared } from './lib/lib.module';
import { UserModuleShared } from './user/user.module';
import { TournamentModuleShared } from './tournament/tournament.module';

const modules = [
  // Third Party modules
  LibModuleShared,
  // Own modules
  UserModuleShared,
  TournamentModuleShared,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
