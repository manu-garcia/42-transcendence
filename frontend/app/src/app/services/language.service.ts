import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'src/app/services/cookie.service'; // Reemplaza 'tu-libreria-de-cookies' con la librería real que estés utilizando

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(
    private translateService: TranslateService,
    private cookieService: CookieService
  ) { }

  initializeLanguage() {
    const selectedLanguage = this.cookieService.getCookie("app_language");
    if (!selectedLanguage) {
      this.cookieService.setCookie("app_language", 'en');
    }
    this.translateService.use(selectedLanguage || 'en');
  }
}