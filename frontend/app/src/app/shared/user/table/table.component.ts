import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../../services/session.service';
import { CookieService } from '../../../services/cookie.service';

import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './table.component.html',
})
export class UserTableComponent {
  @Input() users: IUser[];

  constructor(
    private translateService: TranslateService,
    private sessionService: SessionService,
    private cookieService: CookieService
  ) {
    const selectedLanguage = this.cookieService.getCookie();
    // const selectedLanguage = this.sessionService.getLanguage();
    if (!selectedLanguage) {
      this.cookieService.setCookie('en');
      // this.sessionService.setLanguage('en');
    }
    this.translateService.use(selectedLanguage || 'en');
  }
}