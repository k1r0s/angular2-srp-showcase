import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { ErrorDialogComponent } from "./components/error-dialog/error-dialog.component"

import { AppComponent } from './components/app/app.component';
import { UserRepository } from './services/user-repository.service';
import { CommonCache } from './services/common-cache.service';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDialogComponent,
    LoadingDialogComponent,
    ErrorDialogComponent
  ],
  entryComponents: [
    UserDialogComponent,
    LoadingDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    HttpModule,
    MaterialModule,
    BrowserModule,
    NoopAnimationsModule
  ],
  providers: [
    UserRepository,
    CommonCache,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
