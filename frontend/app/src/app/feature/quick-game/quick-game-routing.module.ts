import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameScreenComponent } from './game/game.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
  {
    path: 'game',
    component: GameScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class QuickGameRoutingModule {}
