import { Component, OnInit, OnDestroy } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Observable } from 'rxjs';

import { IEvent } from 'shared/event/event';
import { EventService } from 'shared/event/event.service';
import { EventFormComponent } from 'shared/event/form/form.component';

@Component({
  selector: 'app-event-table',
  templateUrl: './table.component.html',
})
export class EventTableComponent implements OnInit, OnDestroy {
  public events$: Observable<IEvent[]>;
  public eventFormComponentRef: DynamicDialogRef | undefined;

  constructor(
    private eventService: EventService,
    private dialogService: DialogService,
    private translateService: TranslateService
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

  private openEventFormDialog(event: IEvent = null): void {
    this.eventFormComponentRef = this.dialogService.open(EventFormComponent, {
      header: this.translateService.instant('general.event.list.create.event'),
      width: '50vw',
      data: {
        event,
      },
    });

    this.eventFormComponentRef.onClose.subscribe((data: any) => {
      this.events$ = this.eventService.getEvents();
    });
  }
}
