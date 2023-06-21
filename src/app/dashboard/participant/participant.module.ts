import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantRoutingModule } from './participant-routing.module';
import { RegisteredListComponent } from './registered-list/registered-list.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { VirtualListComponent } from './virtual-list/virtual-list.component';
import { PresentListComponent } from './present-list/present-list.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTableComponent } from './list-table/list-table.component';
import { AddParticipantComponent } from './participantForm/addParticipant/addParticipant.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { DateComponent } from './participantForm/addParticipant/fieldType/date/date.component';
import { DropdownComponent } from './participantForm/addParticipant/fieldType/dropdown/dropdown.component';
import { NumberComponent } from './participantForm/addParticipant/fieldType/number/number.component';
import { TextAreaComponent } from './participantForm/addParticipant/fieldType/textArea/textArea.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ViewParticipantFormComponent } from './participantForm/addParticipant/viewParticipantForm/viewParticipantForm.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    RegisteredListComponent,
    AttendanceListComponent,
    VirtualListComponent,
    PresentListComponent,
    ListTableComponent,
    AddParticipantComponent,
    DateComponent,
    DropdownComponent,
    NumberComponent,
    TextAreaComponent,
    ViewParticipantFormComponent,
  ],
  exports: [
    AddParticipantComponent,
    DateComponent,
    DropdownComponent,
    NumberComponent,
    TextAreaComponent,
  ],
  imports: [
    CommonModule,
    ParticipantRoutingModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    ToolbarModule,
    TooltipModule,
    CalendarModule,
  ],
})
export class ParticipantModule {}
