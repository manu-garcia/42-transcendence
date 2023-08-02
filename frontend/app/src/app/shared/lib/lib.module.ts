import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const modules = [
    // Third-party modules
    CommonModule,
    HttpClientModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class LibModule { }
