import { Component, Input, OnInit } from '@angular/core';

import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './avatar.component.html',
})
export class UserAvatarComponent implements OnInit {
  @Input() user: IUser;
  public defaultAvatar = 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
  constructor() {}

  ngOnInit() {
    if (this.user && this.user.profile_pic) {
      this.defaultAvatar = this.user.profile_pic;
    }
  }
}
