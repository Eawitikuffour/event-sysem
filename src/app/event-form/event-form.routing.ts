import { Routes, RouterModule } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { RegisterComponent } from './register/register.component';
import { RegisteredParticipantFieldsComponent } from './registeredParticipantFields/registeredParticipantFields.component';

const routes: Routes = [
  {
    path: 'add-new/:event_name',
    component: EventFormComponent,
    pathMatch: 'full',
  },
  {
    path: ':event_name',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'confirm-data/:event_name/:participant_id',
    component: RegisteredParticipantFieldsComponent,
    pathMatch: 'full',
  },
];

export const EventFormRoutes = RouterModule.forChild(routes);
