import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ShowEventsComponent } from './show-events/show-events.component';
import { AddEventComponent } from './addEvent/addEvent.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserEventsModule } from '../userEvents/userEvents.module';
import { EventDetailsComponent } from './eventDetails/eventDetails.component';
import { TabViewModule } from 'primeng/tabview';
import { EventLayoutComponent } from './eventLayout/eventLayout.component';
import { ParticipantModule } from '../participant/participant.module';
import { ModeratorsComponent } from './moderators/moderators.component';
import { UsersModule } from '../users/users.module';
import { AddModeratorComponent } from './addModerator/addModerator.component';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AppTableModule } from 'src/app/shared/app-table/app-table.module';
import { AttendanceListComponent } from './attendanceList/attendanceList.component';
@NgModule({
  declarations: [
    ShowEventsComponent,
    AddEventComponent,
    EventDetailsComponent,
    EventLayoutComponent,
    ModeratorsComponent,
    AddModeratorComponent,
    RegistrationFormComponent,
    AttendanceListComponent,
  ],

  exports: [AddEventComponent],
  imports: [
    CommonModule,
    EventsRoutingModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DynamicDialogModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    TooltipModule,
    FileUploadModule,
    MultiSelectModule,
    UserEventsModule,
    TabViewModule,
    ParticipantModule,
    UsersModule,
    AutoCompleteModule,
    AppTableModule,
  ],
  providers: [DialogService],
})
export class EventsModule {}
