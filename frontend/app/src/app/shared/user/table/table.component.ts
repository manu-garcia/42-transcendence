import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from 'core/services/language.service';

import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './table.component.html',
})
export class UserTableComponent implements OnInit {
  @Input() users: IUser[];

  constructor(
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    this.languageService.initializeLanguage();
  }
}