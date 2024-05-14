import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Subscription } from 'rxjs';

import { IEvent } from 'shared/event/event';
import { EventService } from 'shared/event/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './form.component.html',
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() event: IEvent;
  @Output() onEventSaved: EventEmitter<IEvent> = new EventEmitter<IEvent>();

  public form: FormGroup;

  private saveSubscription$: Subscription;

  constructor(
    private eventService: EventService,
    public dialogConfig: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef
  ) {
    // If called within a dialog
    if (this.dialogConfig?.data?.event) {
      this.event = this.dialogConfig.data.event;
    }
  }

  public ngOnInit() {
    this.form = this.buildForm(this.event);
  }

  ngOnDestroy() {
    if (this.saveSubscription$) {
      this.saveSubscription$.unsubscribe();
      this.saveSubscription$ = null;
    }
  }

  public save(): void {
    if (this.saveSubscription$) {
      this.saveSubscription$.unsubscribe();
      this.saveSubscription$ = null;
    }

    this.saveSubscription$ = this.eventService
      .saveEvent(this.form.value)
      .subscribe((savedEvent: IEvent) => {
        this.dialogRef.close(savedEvent);
      });
  }

  private buildForm(event: IEvent): FormGroup {
    return new FormGroup({
      id: new FormControl<number>(event?.id || null),
      name: new FormControl<string>(event?.name || null, Validators.required),
    });
  }
}
