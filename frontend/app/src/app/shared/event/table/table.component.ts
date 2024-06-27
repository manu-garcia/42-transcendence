import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Observable, map } from 'rxjs';

import { IEvent, EEventType } from 'shared/event/event';
import { EventService } from 'shared/event/event.service';
import { EventFormComponent } from 'shared/event/form/form.component';

@Component({
  selector: 'app-event-table',
  templateUrl: './table.component.html',
})
export class EventTableComponent implements OnInit, OnDestroy {
  @Input() typeEvent: EEventType;
  public events$: Observable<IEvent[]>;
  public eventFormComponentRef: DynamicDialogRef | undefined;

  constructor(
    private eventService: EventService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.events$ = this.eventService.getEvents().pipe(
      map((events) => {
        return events.sort((a, b) => {
          return a.id - b.id;
        });
      })
    );
  }

  ngOnDestroy() {
    if (this.eventFormComponentRef) {
      this.eventFormComponentRef.close();
    }
  }

  public createEvent(): void {
    this.openEventFormDialog();
  }

  public goToEventDetail(event: IEvent) {
    this.router.navigate(['./', event.id], { relativeTo: this.route, state: { event } });
  }

  private openEventFormDialog(event: IEvent = null): void {
    this.eventFormComponentRef = this.dialogService.open(EventFormComponent, {
      header: this.translateService.instant('shared.event.list.create.event'),
      width: '50vw',
      data: {
        event,
        typeEvent: this.typeEvent,
      },
    });

    this.eventFormComponentRef.onClose.subscribe((data: any) => {
      this.events$ = this.eventService.getEvents();
    });
  }
}
