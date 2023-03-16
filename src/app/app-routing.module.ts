import { EventFormModule } from './event-form/event-form.module';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowEventsComponent } from './dashboard/show-events/show-events.component';
import { AttendanceComponent } from './dashboard/attendance/attendance.component';
import { EventFormComponent } from './event-form/event-form/event-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './event-form/register/register.component';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'dashboard/show-events',
    component: ShowEventsComponent,
  },
  {
    path: 'dashboard/show-attendance',
    component: AttendanceComponent,
  },
  { path: 'add-event', component: ShowEventsComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'attendance-form', component: EventFormComponent },
  // {
  //   path: 'eventForm',
  //   loadChildren: () =>
  //     import('./event-form/event-form.module').then((m) => m.EventFormModule),
  // },
  {
    path: 'participant/add-new',
    component: EventFormComponent,
  },
  {
    path: 'participant',
    component: RegisterComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
