import {
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/dashboard/events/service/event.service';
import { ParticipantfieldsFormComponent } from '../participantfieldsForm/participantfieldsForm.component';
import { ParticipantService } from '../../../service/participant.service';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';
import { GetParticipants } from '../../../../../store/participant/participant.action';
import { EventFormService } from 'src/app/event-form/service/eventForm.service';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-addNewParticipantField',
  templateUrl: './addNewParticipantField.component.html',
  styleUrls: ['./addNewParticipantField.component.scss'],
})
export class AddNewParticipantFieldComponent implements OnInit {
  @ViewChildren('pf') inputFields!: QueryList<ParticipantfieldsFormComponent>;

  event_id!: number;

  public participantFieldsArray!: FormArray;
  participantFieldsForm!: FormGroup;
  showDropdownInputField = false;
  dropdownValue!: string;
  fieldType: any;
  showForm = false;
  participantFieldsData: any[] = [];
  fields: any;

  constructor(
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    private alert: AppAlertService,
    private eventFormService: EventFormService
  ) {
    this.participantFieldsForm = this.formBuilder.group({
      participantFieldsArray: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.getEventFromServer();
    this.getParticipantFieldsData();
    this.event_id = this.route.snapshot.params['event_id'];
    //console.log('event id is', this.event_id);
  }

  getEventFromServer() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.event_id = params['event_id'];
        this.eventService.getEvent(this.event_id).subscribe((data: any) => {
          if (data) {
            this.showForm = true;
          }
          //console.log(data);
        });
      }
    });
  }

  getParticipantFieldsData() {
    // this.addNewField();
    this.eventFormService
      .GetParticipantFieldByID(this.event_id)
      .subscribe((data: any) => {
        this.fields = data.fields[0];
        this.participantFieldsData = Object.values(this.fields);
        this.initializeForm();
      });
  }

  initializeForm() {
    this.participantFieldsData.forEach((data, index) => {
      //console.log('fields', data);
      // if (index > 0 && this.participantFieldsData.length > 1) {
      //   this.addNewField();
      // }
      this.participantFields.push(this.formBuilder.control({}));
    });
  }

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
    this.createParticipantForm();
  }

  get participantFields() {
    return this.participantFieldsForm.controls[
      'participantFieldsArray'
    ] as FormArray;
  }

  get formValid() {
    let valid = true;

    if (!this.inputFields || this.inputFields.length == 0) {
      return false;
    }
    this.inputFields.forEach((inputField) => {
      if (inputField.formIsInvalid) {
        valid = false;
      }
    });

    return valid;
  }

  createParticipantForm(): FormGroup {
    return this.formBuilder.group({});
  }

  addNewField() {
    this.participantFields.push(this.createParticipantForm());
  }

  deleteField(i: number) {
    this.participantFields.removeAt(i);
  }

  submitFields() {
    const values: any[] = [];
    this.inputFields.map((inputField) => {
      values.push(inputField.participantFieldsFormData);
    });

    const formData = {
      fields: values,
      user_id: Number(localStorage.getItem('user_id')),
      event_id: Number(this.event_id),
    };

    this.participantService.addParticipantsFields(formData).subscribe(() => {
      this.alert.showToast(
        'fields created successfully',
        PrimeNgAlerts.SUCCESS
      );
    });

    const data =
      this.participantFieldsForm.value.participantFieldsArray.forEach(
        (element: any) => {
          //console.log(element.fieldType.value);
        }
      );
  }
}
