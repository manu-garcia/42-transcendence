import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';

@Component({
  selector: 'app-user-list-screen',
  templateUrl: './list.component.html',
})
export class UserListScreenComponent implements OnInit {

  public users$: Observable<IUser[]>;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }

}
