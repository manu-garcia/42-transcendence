import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameScreenComponent } from './game/game.component';
import { QuickGameListScreenComponent } from './list/list.component';
import { QuickGameDetailScreenComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'list/:id',
    component: QuickGameDetailScreenComponent,
  },
  {
    path: '',
    redirectTo: 'game', // Cambiar por list cuando se acabe el desarrollo del juego
    pathMatch: 'full',
  },
  {
    path: 'game',
    component: GameScreenComponent,
  },
  {
    path: 'list',
    component: QuickGameListScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class QuickGameRoutingModule {}
