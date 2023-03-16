import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToastsModule } from './app-toasts/app-toasts.module';
import { AppAlertModule } from './app-alert/app-alert.module';
import { AppDialogModule } from './app-dialog/app-dialog.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AppAlertService } from './service/app-alert.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, AppToastsModule, AppAlertModule, AppDialogModule],
  exports: [CommonModule, AppToastsModule, AppAlertModule, AppDialogModule],
  providers: [
    MessageService,
    ConfirmationService,
    DialogService,
    AppAlertService,
  ],
})
export class AlertsModule {}
