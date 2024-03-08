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
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class LibModule { }
