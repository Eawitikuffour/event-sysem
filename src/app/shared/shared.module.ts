import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateComponent } from './fieldType/date/date.component';
import { DropdownComponent } from './fieldType/dropdown/dropdown.component';
import { NumberComponent } from './fieldType/number/number.component';
import { TextAreaComponent } from './fieldType/textArea/textArea.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AppTableModule } from './app-table/app-table.module';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    CalendarModule,
    AppTableModule,
  ],
  exports: [
    DateComponent,
    DropdownComponent,
    NumberComponent,
    TextAreaComponent,
  ],
  declarations: [
    DateComponent,
    DropdownComponent,
    NumberComponent,
    TextAreaComponent,
  ],
})
export class SharedModule {}
