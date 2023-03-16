import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { EventFormService } from '../service/eventForm.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  gender: any[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  constructor(
    private fb: FormBuilder,
    private eventService: EventFormService,
    private alert: AppAlertService
  ) {}
  ngOnInit() {
    this.eventForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
          Validators.minLength(5),
        ],
      ],
      gender: new FormControl('', Validators.required),
      phone_number: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      organization: new FormControl(''),
      registry_from: new FormControl(''),
    });
  }

  register() {
    const data = this.eventForm.getRawValue();
    data.gender = data.gender.value;

    this.eventService.addParticipant(data).subscribe((res: any) => {
      this.alert.showToast('data added successfully');
    });
  }

  get formData() {
    return this.eventForm.controls;
  }
}
