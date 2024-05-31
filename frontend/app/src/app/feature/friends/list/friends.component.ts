import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { Observable, tap } from 'rxjs';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';
import { UserFriendsFormComponent } from 'shared/user/friends-form/friends-form.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
})
export class FriendsScreenComponent implements OnInit {
  public user$: Observable<IUser>;
  public eventFormComponentRef: DynamicDialogRef | undefined;

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.user$ = this.userService.getUser();
  }

  public addFriends(user: IUser) {
    this.eventFormComponentRef = this.dialogService.open(UserFriendsFormComponent, {
      header: this.translateService.instant('general.friends'),
      width: '50vw',
      height: '75vh',
      data: {
        user: user,
      },
    });

    this.eventFormComponentRef.onClose.subscribe(() => {
      this.user$ = this.userService.getUser();
    });
  }
}
