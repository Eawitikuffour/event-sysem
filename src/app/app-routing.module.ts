import { EventFormModule } from './event-form/event-form.module';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form/event-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './event-form/register/register.component';
import { ThankYouComponent } from './event-form/thank-you/thank-you.component';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  // {
  //   path: 'participant',
  //   loadChildren: () =>
  //     import('./event-form/event-form.module').then((m) => m.EventFormModule),
  // },

  // { path: 'attendance-form', component: EventFormComponent },

  {
    path: 'participant/add-new/:event_name',
    component: EventFormComponent,
  },
  {
    path: 'participant/:event_name',
    component: RegisterComponent,
  },
  { path: 'confirmation', component: ThankYouComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // {
  //   path: 'Participant',
  //   loadChildren: () =>
  //     import('./dashboard/participant/participant.module').then(
  //       (m) => m.ParticipantModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
