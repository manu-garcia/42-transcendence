import { Component, Input } from '@angular/core';

import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './table.component.html',
})
export class UserTableComponent {
  @Input() users: IUser[];
}
