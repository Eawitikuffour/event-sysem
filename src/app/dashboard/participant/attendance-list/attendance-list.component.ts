import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../modal/eventDetails';
import { ParticipantService } from '../service/participant.service';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.scss']
})
export class AttendanceListComponent implements OnInit {
  attendance: Attendance[] = [];
  selectedAttendance: any;
  constructor(private participantService: ParticipantService) {}
  ngOnInit() {
    this.participantService.getAllParticpant().subscribe((data: any) => {
      this.attendance = data;
    });
  }

}
