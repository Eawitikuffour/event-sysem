import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { EventService } from '../../events/service/event.service';
import { Attendance, EventDetails } from '../../modal/eventDetails';
import { ParticipantService } from '../service/participant.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss'],
})
export class ListTableComponent {
  attendance: Attendance[] = [];
  events: EventDetails[] = [];
  selectedAttendance: any;
  eventControl = new UntypedFormControl(1);

  constructor(
    private participantService: ParticipantService,
    private eventService: EventService
  ) {}
  ngOnInit() {
    this.eventService.getAllEvents().subscribe((data: any) => {
      this.events = data;
    });
    this.participantService.getAllParticpant().subscribe((data: any) => {
      this.attendance = data;
    });
  }

  filterEvents() {}
}
