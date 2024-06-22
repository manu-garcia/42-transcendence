import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GameService } from 'shared/game/game.service';
import { IEvent, IEventMatch } from 'shared/event/event';
import { EventService } from 'shared/event/event.service';

@Component({
  selector: 'app-event-match-table',
  templateUrl: './detail.component.html',
})
export class EventMatchTableComponent implements OnInit {
  @Input() event: IEvent;
  public matches$: Observable<IEventMatch[]>;
  public eventMatch$: Observable<IEventMatch>;
  public eventMatch: IEventMatch;
  public playingMatch: boolean = false;

  constructor(private eventService: EventService, private gameService: GameService) {}

  ngOnInit() {
    this.event = history.state.event;
    this.matches$ = this.eventService.getMatches(this.event);
    this.eventMatch$ = this.gameService.getMatch(this.event).pipe(
      catchError((error) => {
        return of(null);
      })
    );
    this.eventMatch$.subscribe((match) => {
      this.eventMatch = match;
    });
  }

  goToEventGame() {
    this.playingMatch = true;
  }
}
