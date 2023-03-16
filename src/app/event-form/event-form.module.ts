import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFormComponent } from './event-form/event-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { RegisterComponent } from './register/register.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [EventFormComponent, RegisterComponent],
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ToolbarModule,
    TooltipModule,
    AutoCompleteModule,
    TableModule,
  ],
  exports: [EventFormComponent],
})
export class EventFormModule {}
