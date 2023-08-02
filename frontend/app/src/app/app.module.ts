import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from './core/core.module';
import { ApiUrlInterceptor } from './core/http/apiurl.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const modules = [
  CoreModule,
  AppRoutingModule,
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: modules,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
