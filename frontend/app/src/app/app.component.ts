import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { LanguageService } from 'core/services/language.service';
import { CookieService } from 'core/services/cookie.service';

import { UserService } from 'shared/user/user.service';
import { IUser } from 'shared/user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'Transcendence';
  public items: MenuItem[] | undefined;
  public activeItem: MenuItem | undefined;
  public user$: Observable<IUser>;
  currentLanguage: string;

  constructor(
    private translateService: TranslateService,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router,
    private languageService: LanguageService
  ) {}

  changeLanguage(language: string) {
    this.languageService.changeLanguage(language);
    window.location.reload();
  }

  ngOnInit() {
    this.translateService.setDefaultLang('en');
    this.currentLanguage = this.cookieService.getCookie('app_language');
    this.translateService.use(this.currentLanguage);
    this.items = [
      {
        label: this.translateService.instant('general.home'),
        icon: 'pi pi-fw pi-home',
        routerLink: ['signedin/user'],
      },
      {
        label: this.translateService.instant('general.quickgame'),
        icon: 'pi pi-fw pi-discord',
        routerLink: ['signedin/quick-game'],
      },
      {
        label: this.translateService.instant('general.tournament'),
        icon: 'pi pi-fw pi-users',
        routerLink: ['signedin/tournament'],
      },
      {
        label: this.translateService.instant('general.options'),
        icon: 'pi pi-fw pi-cog',
        routerLink: ['signedin/options'],
      },
      {
        label: this.translateService.instant('general.friends'),
        icon: 'pi pi-fw pi-home',
        routerLink: ['signedin/friends'],
      },
      {
        label: this.translateService.instant('general.stats'),
        icon: 'pi pi-fw pi-home',
        routerLink: ['signedin/stats'],
      },
    ];

    this.activeItem = this.items[0];

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.user$ = this.userService.getUser();
    });
  }

  public onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  public signout() {
    this.userService.signout().subscribe(() => {
      this.user$ = null;
      this.router.navigateByUrl('/signin');
    });
  }
}
