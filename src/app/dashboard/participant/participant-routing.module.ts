import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisteredListComponent } from './registered-list/registered-list.component';
import { AddNewParticipantFieldComponent } from './participantForm/addParticipant/addNewParticipantField/addNewParticipantField.component';

const routes: Routes = [
  { path: 'registered', component: RegisteredListComponent },
  {
    path: 'add-fields/event_id',
    component: AddNewParticipantFieldComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipantRoutingModule {}
