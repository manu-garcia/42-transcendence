import { Pipe, PipeTransform } from '@angular/core';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';

@Pipe({
  name: 'userStatusColor',
})
export class UserStatusColorPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(user: IUser): string {
    if (this.userService.isOnline(user)) {
      return 'online';
    } else {
      return 'offline';
    }
  }
}
