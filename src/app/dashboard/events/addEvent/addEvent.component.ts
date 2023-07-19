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
    this.eventForm = this.fb.group({
      event_name: ['', [Validators.required, Validators.minLength(5)]],
      venue: ['', [Validators.required, Validators.minLength(5)]],
      date: new FormControl(''),
      number_of_participants: new FormControl(''),
      registration_time: new FormControl(''),
      how_to_join: new FormControl(''),
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

  // onFileChange(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];

  //     this.eventForm.patchValue({
  //       fileSource: file,
  //     });
  //   }
  // }

  addEvent(event?: any) {
    // const EventForm = this.eventForm.getRawValue();
    // const data = {
    //   event_name: EventForm.event_name,
    //   venue: EventForm.venue,
    //   start_date: EventForm.date[0].toString(),
    //   end_date: EventForm.date[1].toString(),
    //   number_of_participants: EventForm.number_of_participants.toString(),
    //   description: EventForm.description,
    //   registration_time: EventForm.registration_time,
    //   how_to_join: EventForm.how_to_join.value,
    //   flyer: EventForm.flyer,
    //   program_outline: EventForm.program_outline,
    // };

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

    this.store.dispatch(new AddEvents(data));
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
