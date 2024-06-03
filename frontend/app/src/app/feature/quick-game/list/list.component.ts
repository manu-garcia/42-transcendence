import { Component } from '@angular/core';
import { EEventType } from 'shared/event/event';

@Component({
  selector: 'app-quick-game-list-screen',
  templateUrl: './list.component.html',
})
export class QuickGameListScreenComponent {
  public typeEvent: EEventType = EEventType.QUICK_GAME;
}
