import { Component, Input, OnInit } from '@angular/core';

import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './table.component.html',
})
export class UserTableComponent implements OnInit {
  @Input() users: IUser[];

  constructor() { }

  ngOnInit() { }
}