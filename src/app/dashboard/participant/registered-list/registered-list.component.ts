import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { EventService } from '../../events/service/event.service';
import { Attendance, EventDetails } from '../../modal/eventDetails';
import { ParticipantService } from '../service/participant.service';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { GetParticipants } from 'src/app/store/participant/participant.action';
import { Observable } from 'rxjs';
import { ParticipantState } from 'src/app/store/participant/participant.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss'],
})
export class RegisteredListComponent implements OnInit, AfterViewInit {
  attendance: Attendance[] = [];
  participant: any[] = [];
  events: EventDetails[] = [];
  columns: any[] = [];
  selectedAttendance: any;
  user_id: any;
  eventControl = new UntypedFormControl(1);
  event_id: any;
  selectedModetator: any;

  constructor(
    private participantService: ParticipantService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.eventService.getAllEvents().subscribe((data: any) => {
      this.events = data;
    });
    this.participantService.getAllParticpant().subscribe((data: any) => {
      this.events = data;
    });
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    // this.initializeForm();
  }

  initializeForm() {
    this.event_id = this.route.snapshot.params['event_id'];
    this.getParticipants();
    this.cdref.detectChanges();
  }

  getParticipants() {
    this.participantService
      .getEventRegisteredParticipant(this.event_id)
      .subscribe((data: any) => {
        console.log(data);
        this.participant = data;

        const firstElement = this.participant[0];
        const tableColumns = [];

        for (const [key] of Object.entries(firstElement.form_values)) {
          const data = {
            header: key,
            field: key,
          };
          tableColumns.push(data);
        }
        this.columns = tableColumns;
      });
    this.cdref.detectChanges();
  }
  get tableDataFromParticipant() {
    let values = this.participant;
    const emptyArray: any = [];

    values.forEach((element: any) => {
      emptyArray.push({ ...element.form_values });
    });
    return emptyArray;
  }
  filterEvents() {}
}
