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
import { EventFormService } from '../service/eventForm.service';
import { EventDetails } from '../../dashboard/modal/eventDetails';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
// import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ParticipantService } from '../../dashboard/participant/service/participant.service';
import { ParticipantFields } from '../../dashboard/participant/participantForm/modal/participantsForm';
import { mockData } from './data';
import { BehaviorSubject } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit, AfterViewInit {
  fieldsArray!: ParticipantFields[];
  fields!: any;
  eventForm!: FormGroup;
  event_name!: string;
  eventData!: any;
  showForm = false;
  flyer!: any;
  image: any;

  loading = new BehaviorSubject(false);

  constructor(
    private cdref: ChangeDetectorRef,
    private fb: FormBuilder,
    private alert: AppAlertService,
    private eventService: EventFormService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngAfterViewInit(): void {
    this.cdref.detectChanges();
    this.getEventDetails();
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
              this.fields = response;
              console.log(this.fields);
              this.getFieldArray();
            }
          });
      }
    });
  }

  getEventDetails() {
    this.eventService.getEvent(this.event_name).subscribe((data: any) => {
      this.eventData = data.flyer;

      console.log(this.eventData);
    });
  }

  getFieldArray() {
    let fieldArray: any = [];

    const fieldNameArray = this.fields.field_name.split('|');
    const fieldTypeArray = this.fields.field_type.split('|');
    const fieldMaxArray = this.fields.field_max_length.split('|');
    const fieldMixArray = this.fields.field_min_length.split('|');
    const fieldValidationArray = this.fields.field_validation.split('|');

    for (let index = 0; index < fieldNameArray.length; index++) {
      fieldArray.push({
        field_name: fieldNameArray[index],
        field_type: fieldTypeArray[index],
        field_max_length: parseInt(fieldMaxArray[index], 10),
        field_min_length: parseInt(fieldMixArray[index]),
        field_validation: fieldValidationArray[index],
      });
    }
    console.log(fieldNameArray);

    this.fieldsArray = fieldArray;
    if (fieldArray) {
      this.createForm(fieldArray);
      this.loading.next(false);
    }
  }
  ngOnInit() {
    this.getEventParticipantFields();
    this.getEventDetails();
  }

  createForm(controls: ParticipantFields[]) {
    this.eventForm = this.fb.group({});

    for (const control of controls) {
      const fieldValidators = [];
      if (control.field_max_length) {
        fieldValidators.push(Validators.max(control.field_max_length));
      }
      if (control.field_min_length) {
        fieldValidators.push(Validators.min(control.field_min_length));
      }
      if (control.field_validation) {
        fieldValidators.push(Validators.required);
      }
      const formControl = new FormControl(control.field_name, fieldValidators);

      this.eventForm.addControl(control.field_name, formControl);
      console.log(this.eventForm);
      // this.eventForm.addControl(control.field_name, this.fb.control(''));
    }
  }
  get controlLength() {
    return Object.keys(this.eventForm?.controls).length || 0;
  }

  submitForm() {
    console.log(this.eventForm.value);

    // if (this.eventForm.valid) {
    //   console.log(this.eventForm.value);
    // }
  }
}
