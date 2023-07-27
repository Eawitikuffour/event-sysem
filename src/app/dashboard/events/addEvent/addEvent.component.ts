import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { EventDetails } from '../../modal/eventDetails';
import { EventService } from '../service/event.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddEvents } from 'src/app/store/event/event.action';

@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.scss'],
})
export class AddEventComponent implements OnInit, AfterViewInit {
  @Input()
  data!: EventDetails;
  eventForm!: FormGroup;
  flyer!: any;
  program_outline: any | undefined;
  joiningEvent: any[] = [
    { value: 'Onsite', viewValue: 'Onsite' },
    { value: 'Virtual means', viewValue: 'Virtual means' },
  ];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private alert: AppAlertService,
    private store: Store
  ) {}

  ngOnInit() {
    this.joiningEvent;
    this.initializeForm();
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      event_name: ['', [Validators.required, Validators.minLength(5)]],
      venue: ['', [Validators.required, Validators.minLength(5)]],
      date: new FormControl(''),
      number_of_participants: new FormControl(''),
      registration_time: new FormControl(''),
      // how_to_join: new FormControl([]),
      how_to_join: new FormControl<any[] | null>(null),
      description: new FormControl(''),
      flyer: new FormControl(''),
      program_outline: new FormControl(''),
    });
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.eventForm.patchValue(this.data);
      this.eventForm.updateValueAndValidity;
    }
  }

  addEvent() {
    const data = new FormData();
    data.append('event_name', this.eventForm.value.event_name);
    data.append('venue', this.eventForm.value.venue);
    data.append('start_date', this.eventForm.value.date[0].toString());
    data.append('end_date', this.eventForm.value.date[1].toString());
    data.append('registration_time', this.eventForm.value.registration_time);

    data.append('how_to_join', this.eventForm.value.how_to_join.value);
    data.append(
      'number_of_participants',
      this.eventForm.value.number_of_participants
    );
    data.append('description', this.eventForm.value.description);

    data.append('flyer_name', this.flyer.name);
    data.append(
      'program_outline_name',

      this.program_outline.name
    );

    // this.store.dispatch(new AddEvents(data));
    // this.eventForm.reset();
    console.log(data);
  }

  onChangeFyler(event: any) {
    // if (event.target.files.length > 0) {
    this.flyer = event.target.files[0];
    // }
  }
  onChangeProgramOutline(event: any) {
    // if (event.target.files.length > 0) {
    this.program_outline = event?.target.files[0];
    // }
  }
}
