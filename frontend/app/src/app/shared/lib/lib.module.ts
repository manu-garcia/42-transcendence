import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [MessageService],
})
export class LibModule {}
