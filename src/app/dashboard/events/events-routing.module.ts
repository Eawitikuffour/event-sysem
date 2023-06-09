import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './addEvent/addEvent.component';
import { EditEventComponent } from './editEvent/editEvent.component';
// import { EventsComponent } from './events.component';
import { ShowEventsComponent } from './show-events/show-events.component';

const routes: Routes = [
  { path: 'add', component: AddEventComponent },
  { path: 'edit', component: EditEventComponent},
  { path: 'show-events', component: ShowEventsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
