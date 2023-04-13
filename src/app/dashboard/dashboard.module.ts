import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DashboardRoute } from './dashboard.routing';
import { AttendanceComponent } from './attendance/attendance.component';
import {RippleModule} from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  imports: [
    CommonModule,
    DashboardRoute,
    RippleModule,
    StyleClassModule,
    InputTextModule,
  ],
  declarations: [
    DashboardComponent,
    SideBarComponent,
    AttendanceComponent,
    LayoutComponent,

  ],
  exports: [LayoutComponent],
})
export class DashboardModule {}
