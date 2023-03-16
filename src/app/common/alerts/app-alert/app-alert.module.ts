import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAlertComponent } from './app-alert.component';
import { MessagesModule } from 'primeng/messages';
@NgModule({
  declarations: [AppAlertComponent],
  imports: [CommonModule, MessagesModule],
  exports: [AppAlertComponent],
})
export class AppAlertModule {}
