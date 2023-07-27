import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './addEvent/addEvent.component';
import { EditEventComponent } from './editEvent/editEvent.component';
// import { EventsComponent } from './events.component';
import { ShowEventsComponent } from './show-events/show-events.component';
import { AddNewParticipantFieldComponent } from '../participant/participantForm/addParticipant/addNewParticipantField/addNewParticipantField.component';
import { EventLayoutComponent } from './eventLayout/eventLayout.component';

const routes: Routes = [
  { path: 'add', component: AddEventComponent },
  { path: 'edit', component: EditEventComponent },
  { path: 'show-events', component: ShowEventsComponent },
  {
    path: 'show-events/add-participantFields/:event_id',
    component: AddNewParticipantFieldComponent,
  },
  {
    path: 'show-events/details/:event_id',
    component: EventLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
