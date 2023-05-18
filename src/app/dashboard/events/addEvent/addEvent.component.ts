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
import { EventState } from '../../../store/event.state';
import { AddEvents } from 'src/app/store/event.action';

@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.scss'],
})
export class AddEventComponent implements OnInit, AfterViewInit {
  getRawValue() {
    throw new Error('Method not implemented.');
  }
  @Input()
  data!: EventDetails;
  eventForm!: FormGroup;
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
      number_of_participants: new UntypedFormControl(),
      description: new FormControl(''),
    });
  }
  ngAfterViewInit(): void {
    if (this.data) {
      this.eventForm.patchValue(this.data);
      this.eventForm.updateValueAndValidity;
    }
  }

  addEvent() {
    const EventForm = this.eventForm.getRawValue();

    // const data = this.eventForm.getRawValue();
    // data.start_date = data.end_date[0].toLocaleString().split(',')[0];
    // data.end_date = data.end_date[1].toLocaleString().split(',')[0];

    const data = {
      event_name: EventForm.event_name,
      venue: EventForm.venue,
      start_date: EventForm.date[0],
      end_date: EventForm.date[1],
      number_of_participants: EventForm.number_of_participants,
      description: EventForm.description,
    };

    this.store.dispatch(new AddEvents(data));
    this.eventForm.reset();
    console.log(data);

    // console.log(this.eventForm.getRawValue().end_date[0]);
    // console.log(this.eventForm.getRawValue().end_date[1]);
  }
}
