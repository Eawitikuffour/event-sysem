import { Component, OnInit } from '@angular/core';
import { EventService } from '../../events/service/event.service';
import { Attendance, EventDetails } from '../../modal/eventDetails';
import { ParticipantService } from '../service/participant.service';
import { FormControl, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss'],
})
export class RegisteredListComponent implements OnInit {
  attendance: Attendance[] = [];
  events: EventDetails[] = [];
  selectedAttendance: any;
  user_id: any;
  eventControl = new UntypedFormControl(1);

  constructor(
    private participantService: ParticipantService,
    private eventService: EventService
  ) {}
  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.eventService.getAllEvents().subscribe((data: any) => {
      this.events = data;
    });
    this.participantService.getAllParticpant().subscribe((data: any) => {
      this.events = data;
    });
  }

  filterEvents() {}
}
