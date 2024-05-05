import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from 'core/core.module';
import { ApiUrlInterceptor } from 'core/http/apiurl.interceptor';
import { ErrorHandlerService } from 'core/error-handler/error-handler.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'core/services/cookie.service';
import { from } from 'rxjs';

const modules = [CoreModule, AppRoutingModule];

export function appInitializerFactory(translateService: TranslateService, cookieService: CookieService) {
  return () => {
    translateService.setDefaultLang('en');
    const selectedLanguage = cookieService.getCookie("app_language");
    // const selectedLanguage = sessionService.getLanguage();
    return from(translateService.use(selectedLanguage));
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: modules,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, CookieService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }