import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IEvent, IEventMatchDiego } from 'shared/event/event';
import { EventService } from 'shared/event/event.service';

@Component({
  selector: 'app-tournament-detail-screen',
  templateUrl: './detail.component.html',
})
export class TournamentDetailScreenComponent implements OnInit {
  public event: IEvent;
  public matches$: Observable<IEventMatchDiego[]>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.event = history.state.event;
    this.matches$ = this.eventService.getMatches(this.event);
  }
}
