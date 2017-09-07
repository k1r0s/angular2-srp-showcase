import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { WritersComponent } from './components/writers/writers.component';
import { UserRepository } from './services/user-repository.service';
import { PostRepository } from './services/post-repository.service';
import { CommonCache } from './services/common-cache.service';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { appRoutes } from './app.routes';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    WritersComponent,
    UserDialogComponent,
    LoadingDialogComponent,
    UserPostsComponent,
    ErrorDialogComponent
  ],
  entryComponents: [
    UserDialogComponent,
    LoadingDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpModule,
    MaterialModule,
    BrowserModule,
    NoopAnimationsModule
  ],
  providers: [
    UserRepository,
    PostRepository,
    CommonCache,
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
