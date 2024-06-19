import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IEvent, IEventMatchDiego } from 'shared/event/event';
import { EventService } from 'shared/event/event.service';

@Component({
  selector: 'app-event-match-table',
  templateUrl: './detail.component.html',
})
export class EventMatchTableComponent implements OnInit {
  @Input() event: IEvent;
  public matches$: Observable<IEventMatchDiego[]>;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.event = history.state.event;
    this.matches$ = this.eventService.getMatches(this.event);
  }
}
