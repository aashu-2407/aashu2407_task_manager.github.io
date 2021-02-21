import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTaskComponent } from './Components/new-task/new-task.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './auth/auth-token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';
import { LoadingIndicatorComponent } from './Components/loading-indicator/loading-indicator.component';
import { MaterialModule } from './material.module';
import { EditTaskDialogComponent } from './Components/dialogs/edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './Components/dialogs/delete-task-dialog/delete-task-dialog.component';
import { SearchTaskComponent } from './Components/search-task/search-task.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent,
    TaskListComponent,
    HeaderComponent,
    FooterComponent,
    LoadingIndicatorComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    SearchTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
