import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AppToastsComponent } from './app-toasts.component';

@NgModule({
  declarations: [AppToastsComponent],
  exports: [AppToastsComponent],
  imports: [CommonModule, ToastModule],
})
export class AppToastsModule {}
