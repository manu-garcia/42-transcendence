import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './avatar.component.html',
})
export class UserAvatarComponent implements OnInit {
  @Input() user: IUser;
  public defaultAvatar = 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.user && this.user.profilePic) {
      this.defaultAvatar = this.user.profilePic;
    }
  }

  public signout() {
    this.userService.signout().subscribe(() => {
      this.router.navigateByUrl('/signin');
    });
  }
}
