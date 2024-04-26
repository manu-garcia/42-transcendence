import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const modules = [
  // Angular
  CommonModule,
  HttpClientModule,

  // PrimeNG
  TableModule,
  CheckboxModule,
  DropdownModule,
  ButtonModule,
  PanelModule,
  CardModule,
  DividerModule,
  ConfirmDialogModule,
  TabMenuModule,
  ProgressSpinnerModule,
  ToastModule,

  //Translations
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    }
  }),
];

@NgModule({
  imports: modules,
  exports: [modules],
  providers: [MessageService],
})
export class LibModule {}
