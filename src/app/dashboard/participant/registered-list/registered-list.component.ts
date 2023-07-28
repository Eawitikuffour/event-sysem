import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventService } from '../../events/service/event.service';
import { Attendance, EventDetails } from '../../modal/eventDetails';
import { ParticipantService } from '../service/participant.service';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { GetParticipants } from 'src/app/store/participant/participant.action';
import { Observable } from 'rxjs';
import { ParticipantState } from 'src/app/store/participant/participant.state';

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
  @Select(ParticipantState.selectStateData) participant$:
    | Observable<any>
    | undefined;

  constructor(
    private participantService: ParticipantService,
    private eventService: EventService,
    private store: Store
  ) {}
  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.event_id = localStorage.getItem('id');
    this.eventService.getAllEvents().subscribe((data: any) => {
      this.events = data;
    });
    this.participantService.getAllParticpant().subscribe((data: any) => {
      this.events = data;
    });
    // this.getParticipants();
  }

  ngAfterViewInit(): void {
    this.event_id = localStorage.getItem('id');
    this.getParticipants();
  }

  getParticipants() {
    this.store.dispatch(new GetParticipants(this.event_id));
    this.participant$?.subscribe((data: any) => {
      this.participant = data;
      const firstElement = this.participant[0];
      const columns = [];

      for (const [key, value] of Object.entries(firstElement.form_values)) {
        const data = {
          header: key,
          field: key,
        };
        columns.push(data);
      }
      this.columns = columns;
    });
  }
  get tableDataFromParticipant() {
    const data = this.participant;
    const emptyArr: any = [];

    data.forEach((x: any) => {
      emptyArr.push({ ...x.form_values });
    });
    return emptyArr;
  }
  filterEvents() {}
}
