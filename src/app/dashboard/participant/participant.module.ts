import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantRoutingModule } from './participant-routing.module';
import { RegisteredListComponent } from './registered-list/registered-list.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { VirtualListComponent } from './virtual-list/virtual-list.component';
import { PresentListComponent } from './present-list/present-list.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTableComponent } from './list-table/list-table.component';

@NgModule({
  declarations: [
    RegisteredListComponent,
    AttendanceListComponent,
    VirtualListComponent,
    PresentListComponent,
    ListTableComponent,

  ],
  imports: [
    CommonModule,
    ParticipantRoutingModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class ParticipantModule { }
