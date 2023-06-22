import { Inject, Injectable, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { EventFormModule } from './event-form/event-form.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './components/interceptor';
import { AlertsModule } from './common/alerts/alerts.module';
import { EventsModule } from './dashboard/events/events.module';
import { ConfirmDialogComponent } from './components/confirmDialog/confirmDialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxsModule } from '@ngxs/store';
import { EventState } from './store/event.state';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    EventFormModule,
    LoginModule,
    DashboardModule,
    EventsModule,
    SharedModule,
    HttpClientModule,
    AlertsModule,
    ConfirmDialogModule,
    NgxsModule.forRoot([EventState]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
@Injectable({
  providedIn: 'root',
})
export class AppModule {}
