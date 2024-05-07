import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translateService: TranslateService, private cookieService: CookieService) {}

  initializeLanguage(): string {
    let selectedLanguage = this.cookieService.getCookie('app_language');
    if (!selectedLanguage) selectedLanguage = 'en';
    this.cookieService.setCookie('app_language', selectedLanguage);
    this.translateService.use(selectedLanguage);
    return selectedLanguage;
  }

  changeLanguage(language: string) {
    this.translateService.use(language);
    this.cookieService.setCookie('app_language', language);
    window.location.reload();
  }
}
