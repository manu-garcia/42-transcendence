import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
import { InputTextModule } from 'primeng/inputtext';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from 'src/app/services/language.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const modules = [
  // Angular
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,

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
  InputTextModule,
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
  providers: [MessageService, DialogService, TranslateService, LanguageService],
})
export class LibModule { }
