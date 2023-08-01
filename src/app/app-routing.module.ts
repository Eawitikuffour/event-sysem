import { EventFormModule } from './event-form/event-form.module';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from './event-form/event-form/event-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './event-form/register/register.component';
import { ThankYouComponent } from './event-form/thank-you/thank-you.component';
import { ResetPasswordComponent } from './login/resetPassword/resetPassword.component';
import { AddNewParticipantFieldComponent } from './dashboard/participant/participantForm/addParticipant/addNewParticipantField/addNewParticipantField.component';
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
  {
    path: 'participant/add-new/:event_name',
    component: EventFormComponent,
  },
  {
    path: 'participant/:event_name',
    component: RegisterComponent,
  },
  {
    path: 'dashboard/event/show-events/details/:event_id/participant/add-fields/:event_id',
    component: AddNewParticipantFieldComponent,
    pathMatch: 'full',
  },

  { path: 'confirmation', component: ThankYouComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
