// import { ParticipantFields } from './../../dashboard/participant/participantForm/modal/participantsForm';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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

import { EventDetails } from '../../dashboard/modal/eventDetails';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
// import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ParticipantService } from '../../dashboard/participant/service/participant.service';
import { ParticipantFields } from '../../dashboard/participant/participantForm/modal/participantsForm';

import { BehaviorSubject } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';
import { EventFormService } from '../service/eventForm.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit, AfterViewInit {
  // fieldsArray!: ParticipantFields[];
  fields!: any;
  fieldsArray: any;
  participantForm!: FormGroup;
  event_name!: string;
  event_id!: any;
  eventData!: any;
  showForm = false;
  flyer!: any;
  image: any;

  loading = new BehaviorSubject(false);

  constructor(
    private cdref: ChangeDetectorRef,
    private fb: FormBuilder,
    private alert: AppAlertService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private eventService: EventFormService
  ) {}
  ngAfterViewInit(): void {
    this.cdref.detectChanges();
    this.getEventDetails();
    this.getEventParticipantFields();
  }

  getEventParticipantFields() {
    this.loading.next(true);
    this.route.params.subscribe((params) => {
      if (params) {
        this.event_name = params['event_name'];
        this.eventService
          .getParticipantField(this.event_name)
          .subscribe((response: any) => {
            if (response) {
              this.event_id = response.event_id;
              console.log(this.event_id);
              this.fields = response.fields[0];

              this.fieldsArray = Object.values(this.fields);

              console.log(this.fieldsArray);

              this.getFieldArray();
            }
          });
      }
    });
  }

  getEventDetails() {
    this.eventService.getEvent(this.event_name).subscribe((data: any) => {
      console.log(data);
      this.eventData = data.flyer;
    });
  }

  getFieldArray() {
    if (this.fieldsArray) {
      console.log(this.fieldsArray);
      this.createForm(this.fieldsArray);
      this.loading.next(false);
    }
  }
  ngOnInit() {
    this.getEventParticipantFields();
    this.getEventDetails();
  }

  createForm(controls: ParticipantFields[]) {
    this.participantForm = this.fb.group({});

    for (const control of controls) {
      const fieldValidators = [];
      if (control.validators) {
        for (const [key, value] of Object.entries(control.validators)) {
          switch (key) {
            case 'required':
              fieldValidators.push(Validators.required);
              break;
            case 'email':
              fieldValidators.push(Validators.email);
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

      // this.participantForm.addControl(
      //   control.fieldName,
      //   this.fb.control(control.fieldName, fieldValidators)
      // );
    }
  }
  get controlLength() {
    return Object.keys(this.participantForm?.controls).length || 0;
  }

  submitForm() {
    const data = {
      event_id: 13,
      form_values: this.participantForm.value,
    };
    this.eventService.addParticipant(data).subscribe((res: any) => {
      this.alert.showToast('data successfully added', PrimeNgAlerts.SUCCESS);
    });
  }
}
