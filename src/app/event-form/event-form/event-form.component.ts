import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { EventFormService } from '../service/eventForm.service';
import { EventDetails } from '../../dashboard/modal/eventDetails';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

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

  joiningEvent: any[] = [
    { value: 'Onsite', viewValue: 'Onsite' },
    { value: 'Virtual means', viewValue: 'Virtual means' },
  ];
  event_name!: string;
  eventDetails: any;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private alert: AppAlertService,
    private eventService: EventFormService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.event_name = params['event_name'];
        this.eventService
          .getEvent(this.event_name)
          .subscribe((response: any) => {
            console.log(response);
            if (response && Object.keys(response).length) {
              this.eventDetails = response;
              this.showForm = true;
              this.createEventForm();
            }
          });
      }
    });
  }

  createEventForm() {
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
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      organization: new FormControl(''),
      registry_from: new FormControl(''),
    });
  }

  confirm() {
    console.log('test');
    this.confirmationService.confirm({
      message: 'Are you sure you want to submit form?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.register();
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have submitted form',
        });
        this.router.navigate(['/confirmation']);
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
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
