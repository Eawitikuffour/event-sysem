import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AppDialogComponent } from './app-dialog.component';

@NgModule({
  declarations: [AppDialogComponent],
  imports: [CommonModule, ConfirmPopupModule, ConfirmDialogModule],
  exports: [AppDialogComponent],
})
export class AppDialogModule {}
