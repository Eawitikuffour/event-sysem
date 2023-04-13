import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { AddEventComponent } from './addEvent/addEvent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { ShowEventsComponent } from './show-events/show-events.component';


@NgModule({
  declarations: [
    AddEventComponent,
    AddEventComponent,
    ShowEventsComponent,
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
    CalendarModule,
    TooltipModule,
  ]
})
export class EventsModule { }
