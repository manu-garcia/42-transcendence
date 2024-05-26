import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription, map } from 'rxjs';
import { IEvent, IEventPayload, EEventType } from 'shared/event/event';
import { IUser, IUserWithAlias } from 'shared/user/user';
import { EventService } from 'shared/event/event.service';
import { UserService } from 'shared/user/user.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './form.component.html',
})
export class EventFormComponent implements OnInit, OnDestroy {
  @Input() event: IEvent;
  @Input() typeEvent: EEventType;
  @Output() onEventSaved: EventEmitter<IEvent> = new EventEmitter<IEvent>();

  public form: FormGroup;
  public users$: Observable<IUser[]>;

  public eventPayload: IEventPayload = {
    name: '',
    type: EEventType.NONE,
    users1: [],
    users2: [],
  };
  public selectedUsers: IUserWithAlias[] = [];
  public availableUsers1: IUserWithAlias[] = [];
  public availableUsers2: IUserWithAlias[] = [];

  public minUsersGroup1: number = 0;
  public minUsersGroup2: number = 0;

  private saveSubscription$: Subscription;

  constructor(
    private eventService: EventService,
    public dialogConfig: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
    private userService: UserService
  ) {
    if (this.dialogConfig?.data?.typeEvent) {
      this.eventPayload.type = this.dialogConfig.data.typeEvent;
    }

    this.users$ = this.userService.getUsers();
    this.users$.subscribe((users) => {
      this.availableUsers1.push(
        ...users.map((user) => ({
          user: user,
          alias: user.username,
        }))
      );
      this.availableUsers2.push(...this.availableUsers1);
    });

    if (this.eventPayload.type === EEventType.TOURNAMENT) {
      this.minUsersGroup1 = 2;
      this.minUsersGroup2 = 0;
    } else if (this.eventPayload.type === EEventType.QUICK_GAME) {
      this.minUsersGroup1 = 1;
      this.minUsersGroup2 = 1;
    }
  }

  public ngOnInit() {
    this.form = this.buildForm();
  }

  ngOnDestroy() {
    if (this.saveSubscription$) {
      this.saveSubscription$.unsubscribe();
      this.saveSubscription$ = null;
    }
  }

  public save(): void {
    if (this.form.valid) {
      if (this.saveSubscription$) {
        this.saveSubscription$.unsubscribe();
        this.saveSubscription$ = null;
      }

      this.saveSubscription$ = this.eventService.saveEvent(this.form.value).subscribe((savedEvent: IEvent) => {
        this.dialogRef.close(savedEvent);
      });
    }
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>(this.eventPayload.name || null, Validators.required),
      type: new FormControl<EEventType>(this.eventPayload.type || null),

      users1: new FormControl<{ user: IUser; alias: string }[]>(this.eventPayload.users2 || [], [
        Validators.required,
        this.minLengthArray(this.minUsersGroup1),
      ]),

      users2: new FormControl<{ user: IUser; alias: string }[]>(this.eventPayload.users2 || [], [
        this.minUsersGroup2 > 0 ? Validators.required : Validators.nullValidator,
        this.minLengthArray(this.minUsersGroup2),
      ]),
    });
  }

  private minLengthArray(min: number) {
    return (control: FormControl) => {
      if (control.value.length >= min) {
        return null;
      }
      return { minLengthArray: { valid: false } };
    };
  }

  onAliasChange(user: IUserWithAlias) {
    if (user) {
      const user1 = this.availableUsers1.find((selectedUser) => user.user.id === selectedUser.user.id);
      const user2 = this.availableUsers2.find((selectedUser) => user.user.id === selectedUser.user.id);
      if (user1) {
        user1.alias = user.alias;
      }
      if (user2) {
        user2.alias = user.alias;
      }
    }
    if (this.checkAliases()) {
      this.form.setErrors(null);
    } else {
      this.form.setErrors({ notAliases: true });
    }
  }

  checkAliases(): boolean {
    const aliases = this.selectedUsers.map((user) => user.alias);
    const uniqueAliases = new Set(aliases);
    const allNonEmpty = aliases.every((alias) => alias.trim().length > 0);
    return allNonEmpty && uniqueAliases.size === aliases.length;
  }

  selectAlias(event: FocusEvent) {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  onUsers1Change() {
    this.users$
      .pipe(
        map((users) =>
          users
            .filter((user) => !this.eventPayload.users1.some((selectedUser) => user.id === selectedUser.user.id))
            .map((user) => ({
              user: user,
              alias: user.username,
            }))
        )
      )
      .subscribe((filteredUsers) => {
        this.availableUsers2.length = 0;
        this.availableUsers2.push(...filteredUsers);
      });

    this.selectedUsers.length = 0;
    this.selectedUsers.push(...this.eventPayload.users1, ...this.eventPayload.users2);
    this.onAliasChange(null);
  }

  onUsers2Change() {
    this.users$
      .pipe(
        map((users) =>
          users
            .filter((user) => !this.eventPayload.users2.some((selectedUser) => user.id === selectedUser.user.id))
            .map((user) => ({
              user: user,
              alias: user.username,
            }))
        )
      )
      .subscribe((filteredUsers) => {
        this.availableUsers1.length = 0;
        this.availableUsers1.push(...filteredUsers);
      });

    this.selectedUsers.length = 0;
    this.selectedUsers.push(...this.eventPayload.users1, ...this.eventPayload.users2);
    this.onAliasChange(null);
  }
}
