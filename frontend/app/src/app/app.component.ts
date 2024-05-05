import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'core/services/cookie.service';
import { LanguageService } from 'core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'Transcendence';
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem | undefined;

  currentLanguage: string;

  constructor(
    private translateService: TranslateService,
    private cookieService: CookieService,
    private languageService: LanguageService
  ) { };

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
  }

  ngOnInit() {
    this.currentLanguage = this.languageService.initializeLanguage();

    this.items = [
      {
        label: this.translateService.instant('general.home'),
        icon: 'pi pi-fw pi-home',
        routerLink: ['user'],
      },
      {
        label: this.translateService.instant('general.quickgame'),
        icon: 'pi pi-fw pi-discord',
        routerLink: ['quick-game'],
      },
      {
        label: this.translateService.instant('general.tournament'),
        icon: 'pi pi-fw pi-users',
        routerLink: ['tournament'],
      },

    ];

    this.activeItem = this.items[0];
  }

  public onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
