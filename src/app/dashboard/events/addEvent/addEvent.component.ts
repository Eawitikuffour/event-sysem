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

@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.scss'],
})
export class AddEventComponent implements OnInit, AfterViewInit {
  @Input()
  data!: EventDetails;
  eventForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private alert: AppAlertService
  ) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      event_name: ['', [Validators.required, Validators.minLength(5)]],
      venue: ['', [Validators.required, Validators.minLength(5)]],
      start_date: new FormControl(''),
      end_date: new FormControl(''),
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
    const data = this.eventForm.getRawValue();
    console.log(data);
    this.eventService.addEvent(data).subscribe((res: any) => {
      this.alert.showToast('event added successfully');
    });
  }
}
