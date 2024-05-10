import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LibModuleShared } from 'shared/lib/lib.module';

const modules = [BrowserModule, BrowserAnimationsModule, LibModuleShared];

@NgModule({
  imports: modules,
  exports: [LibModuleShared],
  providers: [],
})
export class CoreModule {}
