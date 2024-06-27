import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  public nextMatchExist: boolean = false;
  public playingMatch: boolean = false;

  constructor(private eventService: EventService, private gameService: GameService) {}

  ngOnInit() {
    this.event = history.state.event;

    // Get all matches for the event
    this.matches$ = this.eventService.getMatches(this.event).pipe(
      map((matches) => {
        return matches.sort((a, b) => {
          return a.id - b.id;
        });
      })
    );

    // Check if there is a match that has not been played yet
    this.matches$.subscribe((matches) => {
      matches.forEach((match) => {
        if (match.played == false) {
          this.nextMatchExist = true;
        }
      });
    });
  }

  goToEventGame() {
    // Get the next match that has not been played yet
    this.eventMatch$ = this.gameService.getMatch(this.event);
    this.playingMatch = true;
  }
}
