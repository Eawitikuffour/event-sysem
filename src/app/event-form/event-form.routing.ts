import { Routes, RouterModule } from '@angular/router';
import { EventFormComponent } from './event-form/event-form.component';
import { RegisterComponent } from './register/register.component';

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
];

export const EventFormRoutes = RouterModule.forChild(routes);
