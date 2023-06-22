// import { ParticipantFields } from './../../dashboard/participant/participantForm/modal/participantsForm';
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
// import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ParticipantService } from '../../dashboard/participant/service/participant.service';
import { ParticipantFields } from '../../dashboard/participant/participantForm/modal/participantsForm';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  fieldsArray: ParticipantFields[] = [];
  fields: any;
  eventForm!: FormGroup;
  event_id!: any;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private alert: AppAlertService,
    private eventService: EventFormService,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    // public config: DynamicDialogConfig,
    private participantService: ParticipantService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.event_id = params['event_id'];
        console.log(this.event_id);
        this.participantService
          .getParticipantFields(this.event_id)
          .subscribe((response: any) => {
            console.log(response);
            if (response && response.length && response[0]) {
              this.fields = response[0];
              if (
                this.fields.field_name ||
                this.fields.field_type ||
                this.fields.field_max_length ||
                this.fields.field_min_length ||
                this.fields.field_validation
              ) {
                const fieldNameArray = this.fields.field_name.split('|');
                const fieldTypeArray = this.fields.field_type.split('|');
                const fieldMaxArray = this.fields.field_max_length.split('|');
                const fieldMixArray = this.fields.field_min_length.split('|');
                const fieldValidationArray =
                  this.fields.field_validation.split('|');

                for (let index = 0; index < fieldNameArray.length; index++) {
                  this.fieldsArray.push({
                    field_name: fieldNameArray[index],
                    field_type: fieldTypeArray[index],
                    field_max_length: fieldMaxArray[index],
                    field_min_length: fieldMixArray[index],
                    field_validation: fieldValidationArray[index],
                  });
                }
              }
            }
          });
      }
      this.createForm(this.fieldsArray);
    });
  }

  createForm(controls: ParticipantFields[]) {
    this.eventForm = this.fb.group({});
    for (const control of controls) {
      const fieldValidators = [];
      for (const [value] of Object.values(control)) {
        if (control.field_max_length) {
          fieldValidators.push(Validators.max(value));
        }
        if (control.field_min_length) {
          fieldValidators.push(Validators.max(value));
        }
        if (control.field_validation) {
          fieldValidators.push(Validators.required);
        }
        // else {
        //   return control;
        // }
      }
      this.eventForm.addControl(
        control.field_name,
        this.fb.control(
          {
            value: control.field_name,
            disabled: false,
          },
          fieldValidators
        )
      );
    }
  }

  submitForm() {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
    }
  }

  // confirm() {
  //   console.log('test');
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to submit form?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.register();
  //       this.messageService.add({
  //         severity: 'info',
  //         summary: 'Confirmed',
  //         detail: 'You have submitted form',
  //       });
  //       this.router.navigate(['/confirmation']);
  //     },
  //     reject: (type: any) => {
  //       switch (type) {
  //         case ConfirmEventType.REJECT:
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Rejected',
  //             detail: 'You have rejected',
  //           });
  //           break;
  //         case ConfirmEventType.CANCEL:
  //           this.messageService.add({
  //             severity: 'warn',
  //             summary: 'Cancelled',
  //             detail: 'You have cancelled',
  //           });
  //           break;
  //       }
  //     },
  //   });
  // }
  // register() {
  //   const data = this.eventForm.getRawValue();
  //   data.gender = data.gender.value;

  //   this.eventService.addParticipant(data).subscribe((res: any) => {
  //     this.alert.showToast('data added successfully');
  //   });
  // }

  // get formData() {
  //   return this.eventForm.controls;
  // }
}
