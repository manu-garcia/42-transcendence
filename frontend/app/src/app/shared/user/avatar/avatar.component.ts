import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { RouterService } from 'shared/router/router.service';
import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './avatar.component.html',
})
export class UserAvatarComponent implements OnInit, OnChanges {
  @Input() user: IUser;
  public avatarURL = 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';

  constructor(private userService: UserService, private router: Router, private routerService: RouterService) {}

  ngOnInit() {
    this.setAvatarUrl();
  }

  ngOnChanges() {
    this.setAvatarUrl();
  }

  public signout() {
    this.userService.signout().subscribe(() => {
      this.router.navigateByUrl('/signin');
    });
  }

  private setAvatarUrl() {
    if (this.user && this.user.profilePic) {
      this.avatarURL = this.routerService.getMediaUrl(this.user.profilePic);
    }
  }
}
