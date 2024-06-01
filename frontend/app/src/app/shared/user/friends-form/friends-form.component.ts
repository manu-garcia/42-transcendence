import { Component, Input, OnInit, OnChanges, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Observable, Subscription } from 'rxjs';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';

@Component({
  selector: 'app-user-friends-form',
  templateUrl: './friends-form.component.html',
})
export class UserFriendsFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;
  @Output() onSaved: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup;
  public allUsers$: Observable<IUser[]>;

  private saveSubscription$: Subscription;

  constructor(
    public dialogConfig: DynamicDialogConfig,
    public dialogRef: DynamicDialogRef,
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.user = this.dialogConfig.data.user;
    this.allUsers$ = this.userService.getUsers();
    this.form = this.buildForm(this.user);
  }

  public ngOnChanges() {
    this.form = this.buildForm(this.user);
  }

  ngOnDestroy() {
    if (this.saveSubscription$) {
      this.saveSubscription$.unsubscribe();
      this.saveSubscription$ = null;
    }
  }

  public save() {
    if (this.form.valid) {
      if (this.saveSubscription$) {
        this.saveSubscription$.unsubscribe();
        this.saveSubscription$ = null;
      }

      this.saveSubscription$ = this.userService.saveUser({ ...this.form.value }).subscribe((savedUser: IUser) => {
        this.dialogRef.close(savedUser);
      });
    }
  }

  private buildForm(user: IUser): FormGroup {
    return new FormGroup({
      id: new FormControl<number>(user?.id || null),
      friends: new FormControl<IUser[]>(user?.friends || []),
    });
  }
}
