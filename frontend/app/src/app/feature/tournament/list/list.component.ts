import { Component } from '@angular/core';
import { EEventType } from 'shared/event/event';

@Component({
  selector: 'app-tournament-list-screen',
  templateUrl: './list.component.html',
})
export class TournamentListScreenComponent {
  public typeEvent: EEventType = EEventType.TOURNAMENT;
}
