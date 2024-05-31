import { Pipe, PipeTransform } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';

@Pipe({
  name: 'userStatus',
})
export class UserStatusPipe implements PipeTransform {
  constructor(private translateService: TranslateService, private userService: UserService) {}

  transform(user: IUser): string {
    if (this.userService.isOnline(user)) {
      return this.translateService.instant('general.user.list.online');
    } else {
      return this.translateService.instant('general.user.list.offline');
    }
  }
}
