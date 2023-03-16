import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';

export interface Attendance {
  name: string;
  gender: string;
  email: string;
  institution: string;
  telNumber: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  attendance: Attendance[] = [];
  selectedAttendance: any;
  constructor(private dashboardService: DashboardService) {}
  ngOnInit() {
    this.dashboardService.getAllParticpant().subscribe((data: any) => {
      this.attendance = data;
    });
  }
}
