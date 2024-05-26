import { Component, Input, OnInit } from '@angular/core';

import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './avatar.component.html',
})
export class UserAvatarComponent implements OnInit {
  @Input() user: IUser;

  constructor() {}

  ngOnInit() {}
}
