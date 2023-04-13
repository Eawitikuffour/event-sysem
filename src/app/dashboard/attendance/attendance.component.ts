import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../participant/service/participant.service';


// export interface Attendance {
//   name: string;
//   gender: string;
//   email: string;
//   institution: string;
//   telNumber: string;
// }

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  // attendance: Attendance[] = [];
  selectedAttendance: any;
  constructor(private participantService: ParticipantService) {}
  ngOnInit() {
    this.participantService.getAllParticpant().subscribe((data: any) => {
      // this.attendance = data;
    });
  }
}
