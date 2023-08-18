import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ParticipantFields } from '../../dashboard/participant/participantForm/modal/participantsForm';

import { BehaviorSubject, catchError, Subscription } from 'rxjs';
import { EventFormService } from '../service/eventForm.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit, AfterViewInit {
  @Input() registeredParticipantDetails!: any;
  fields!: any;
  fieldsArray: any;
  participantForm!: FormGroup;
  event_name!: string;
  event_id!: any;
  eventData!: any;
  showForm = false;
  flyer!: any;
  image: any;
  subcription!: Subscription;
  joiningEventOptions: any[] = [];
  joiningEvent!: any;
  loading = new BehaviorSubject(false);

  constructor(
    private cdref: ChangeDetectorRef,
    private fb: FormBuilder,
    private alert: AppAlertService,
    private route: ActivatedRoute,

    private eventService: EventFormService
  ) {
    this.participantForm = this.fb.group({});
  }
  ngAfterViewInit() {
    this.getEventDetails();

    this.subcription.add(this.getEventParticipantFields());

    this.cdref.detectChanges();
  }
  ngOnInit(): void {
    this.subcription = this.getEventParticipantFields();

    this.cdref.detectChanges();
  }

  getEventParticipantFields() {
    this.loading.next(true);
    return this.route.params.subscribe((params) => {
      if (params) {
        this.event_name = params['event_name'];
        this.eventService
          .getParticipantField(this.event_name)
          .subscribe((response: any) => {
            if (response) {
              this.showForm = true;
              this.getEventDetails();
              this.event_id = response.event_id;

              this.fields = response.fields[0];

              this.fieldsArray = Object.values(this.fields);

              this.getFieldArray();
            }
          });
      }
    });
  }

  getEventDetails() {
    this.eventService.getEvent(this.event_name).subscribe((data: any) => {
      this.joiningEventOptions = data?.how_to_join.split(',');
      this.joiningEvent = this.joiningEventOptions[0];
      this.eventData = data.flyer;
    });
  }

  initializeParticipantForm() {
    if (this.registeredParticipantDetails) {
      this.participantForm.patchValue({
        ...this.registeredParticipantDetails,
      });

      this.participantForm.updateValueAndValidity;
    }
  }

  getFieldArray() {
    if (this.fieldsArray) {
      this.createForm(this.fieldsArray);
      this.loading.next(false);
    }
  }

  createForm(controls: ParticipantFields[]) {
    // this.participantForm = this.fb.group({});

    for (const control of controls) {
      const fieldValidators = [];
      if (control.validators) {
        for (const [key, value] of Object.entries(control.validators)) {
          switch (key) {
            case 'required':
              if (value) {
                fieldValidators.push(Validators.required);
              }

              break;
            case 'email':
              if (value) {
                fieldValidators.push(Validators.email);
              }

              break;
            case 'maxLength':
              fieldValidators.push(Validators.maxLength(value.maxLength));
              break;
            case 'minLength':
              fieldValidators.push(Validators.minLength(value.minLength));
              break;
            case 'maximum':
              fieldValidators.push(Validators.max(value.maximum));
              break;
            case 'minimum':
              fieldValidators.push(Validators.min(value.minimum));
          }
        }
      }

      const formControl = new FormControl(control.fieldName, fieldValidators);

      this.participantForm.addControl(control.fieldName, formControl);
      this.participantForm.addControl(
        'Means Of Joining Event',
        new FormControl('', Validators.required)
      );

      this.initializeParticipantForm();
    }
  }
  get controlLength() {
    return Object.keys(this.participantForm?.controls).length || 0;
  }
  sendDataError = false;
  submitForm() {
    if (this.joiningEventOptions.length < 2) {
      const specificiedMeansOfJoiningEvent = this.participantForm.value;
      specificiedMeansOfJoiningEvent.meansOfJoiningEvent = this.joiningEvent;

      const data = {
        event_id: this.event_id,
        form_values: this.participantForm.value,
      };
      this.eventService.addParticipant(data).subscribe((res: any) => {
        this.alert.showToast('data successfully added', PrimeNgAlerts.SUCCESS);
        this.participantForm.reset();
      });
    } else {
      const data = {
        event_id: this.event_id,
        form_values: this.participantForm.value,
      };

      this.eventService
        .addParticipant(data)
        .pipe(
          catchError((error: any) => {
            this.sendDataError = true;
            this.alert.showToast('Error', PrimeNgAlerts.ERROR);
            return error;
          })
        )
        .subscribe((res: any) => {
          if (res) {
            this.alert.showToast(
              'data successfully added',
              PrimeNgAlerts.SUCCESS
            );
            this.participantForm.reset();
          }
        });
    }
  }
}
