import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ChartModule } from 'primeng/chart';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const modules = [
  // Angular
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,

  // PrimeNG
  CheckboxModule,
  DropdownModule,
  PanelModule,
  CardModule,
  DividerModule,
  ConfirmDialogModule,
  TabMenuModule,
  ProgressSpinnerModule,
  ToastModule,
  InputTextModule,
  MultiSelectModule,
  FloatLabelModule,
  AvatarModule,
  ChartModule,

  //Translations
  TranslateModule.forChild(),
];

@NgModule({
  imports: modules,
  exports: [modules],
  providers: [MessageService, DialogService],
})
export class LibModuleShared {}
