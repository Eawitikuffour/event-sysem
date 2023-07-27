import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEventsComponent } from './userEvents.component';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  imports: [CommonModule, DataViewModule, ButtonModule, LayoutModule],
  exports: [UserEventsComponent],
  declarations: [UserEventsComponent],
})
export class UserEventsModule {}
