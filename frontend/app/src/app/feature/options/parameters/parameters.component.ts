import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from 'shared/user/user.service';
import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-options-screen',
  templateUrl: './parameters.component.html',
})
export class ParametersScreenComponent implements OnInit {
  public user$: Observable<IUser>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.userService.getUser();
  }
}
