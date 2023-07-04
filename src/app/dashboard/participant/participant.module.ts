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
// import { AddParticipantFieldComponent } from './participantForm/addParticipant/addParticipant.component';
import { AddParticipantFieldComponent } from './participantForm/addParticipant/addParticipantField.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ViewParticipantFormComponent } from './participantForm/addParticipant/viewParticipantForm/viewParticipantForm.component';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'src/app/shared/shared.module';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ValidatorsComponent } from './participantForm/validators/validators.component';
import { ChipsModule } from 'primeng/chips';
@NgModule({
  declarations: [
    RegisteredListComponent,
    AttendanceListComponent,
    VirtualListComponent,
    PresentListComponent,
    ListTableComponent,
    AddParticipantFieldComponent,
    ViewParticipantFormComponent,
    ValidatorsComponent,
  ],
  exports: [AddParticipantFieldComponent],
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
    CalendarModule,
    ToolbarModule,
    TooltipModule,
    SharedModule,
    CardModule,
    CheckboxModule,
    ChipsModule,
  ],
})
export class ParticipantModule {}
