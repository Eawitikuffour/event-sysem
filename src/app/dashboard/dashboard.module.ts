import { LayoutComponent } from './layout/layout.component';
import { ShowEventsComponent } from './show-events/show-events.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardRoute } from './dashboard.routing';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddEventComponent } from './addEvent/addEvent.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AttendanceComponent } from './attendance/attendance.component';
import { EditEventComponent } from './editEvent/editEvent.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoute,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DynamicDialogModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    TooltipModule,
  ],
  declarations: [
    DashboardComponent,
    SideBarComponent,
    ShowEventsComponent,
    AddEventComponent,
    AttendanceComponent,
    LayoutComponent,
    EditEventComponent,
  ],
  exports: [LayoutComponent],
})
export class DashboardModule {}
