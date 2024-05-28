import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Observable } from 'rxjs';

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
    this.events$ = this.eventService.getEvents();
  }

  ngOnDestroy() {
    if (this.eventFormComponentRef) {
      this.eventFormComponentRef.close();
    }
  }

  public createEvent(): void {
    this.openEventFormDialog();
  }

  public editEvent(event: IEvent): void {
    this.openEventFormDialog(event);
  }

  public goToEventDetail(event: IEvent) {
    this.router.navigate(['./', event.id], { relativeTo: this.route });
  }

  private openEventFormDialog(event: IEvent = null): void {
    this.eventFormComponentRef = this.dialogService.open(EventFormComponent, {
      header: this.translateService.instant('general.event.list.create.event'),
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
