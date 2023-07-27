import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTableComponent } from './app-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    SkeletonModule,
    PaginatorModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AppTableComponent],
  exports: [AppTableComponent],
})
export class AppTableModule {}
