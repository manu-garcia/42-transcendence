import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
})
export class FriendsScreenComponent implements OnInit {
  public users$: Observable<IUser[]>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
  }
}
