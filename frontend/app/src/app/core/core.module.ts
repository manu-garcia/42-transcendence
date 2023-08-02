import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LibModule } from 'shared/lib/lib.module';

const modules = [
  BrowserModule,
  BrowserAnimationsModule,

  LibModule,
];

@NgModule({
  imports: modules,
  exports: [
    LibModule,
  ],
  providers: [],
})
export class CoreModule { }
