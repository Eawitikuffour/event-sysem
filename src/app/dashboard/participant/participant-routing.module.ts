import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { PresentListComponent } from './present-list/present-list.component';
import { RegisteredListComponent } from './registered-list/registered-list.component';
import { VirtualListComponent } from './virtual-list/virtual-list.component';


const routes: Routes = [
  { path: 'registered', component: RegisteredListComponent },
  { path: 'attending', component: AttendanceListComponent },
  {path: 'attending/virtual', component: VirtualListComponent},
  {path: 'attending/present', component: PresentListComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantRoutingModule { }
