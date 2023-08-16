import {
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/dashboard/events/service/event.service';
import { ParticipantfieldsFormComponent } from '../participantfieldsForm/participantfieldsForm.component';
import { ParticipantService } from '../../../service/participant.service';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';
import { GetParticipants } from '../../../../../store/participant/participant.action';
import { EventFormService } from 'src/app/event-form/service/eventForm.service';

@Component({
  selector: 'app-addNewParticipantField',
  templateUrl: './addNewParticipantField.component.html',
  styleUrls: ['./addNewParticipantField.component.scss'],
})
export class AddNewParticipantFieldComponent implements OnInit {
  @ViewChildren('pf') inputFields!: QueryList<ParticipantfieldsFormComponent>;

  event_id!: any;

  public participantFieldsArray!: FormArray;
  participantFieldsForm!: FormGroup;
  showDropdownInputField = false;
  dropdownValue!: string;
  fieldType: any;
  showForm = false;
  participantFieldsData: any[] = [];
  fields: any;
  label!: string;
  participantFieldId!: string;

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
    this.Label;
  }

  getEventFromServer() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.event_id = params['event_id'];
        this.eventService.getEvent(this.event_id).subscribe((data: any) => {
          if (data) {
            this.showForm = true;
          }
        });
      }
    });
  }

  get Label() {
    if (this.getParticipantFieldsData.length > 0) {
      return (this.label = 'Update');
    } else {
      return (this.label = 'Submit');
    }
  }
  getParticipantFieldsData() {
    this.eventFormService
      .GetParticipantFieldByID(this.event_id)
      .subscribe((data: any) => {
        console.log('participant fields', data);
        this.participantFieldId = data.id;
        // console.log('id', this.participantFieldId);
        this.fields = data.fields[0];
        this.participantFieldsData = Object.values(this.fields);
        this.initializeForm();
        if (data) {
          this.label = 'Update';
        } else {
          this.label = 'Submit';
        }
      });
  }

  initializeForm() {
    this.participantFieldsData.forEach((data, index) => {
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
      user_id: localStorage.getItem('user_id'),
      event_id: this.event_id,
    };
    const updateData = {
      id: this.participantFieldId,
      fields: values,
      user_id: localStorage.getItem('user_id'),
      event_id: this.event_id,
    };

    if (this.participantFieldsData.length > 0) {
      this.participantService
        .updateParticipantFields(updateData)
        .subscribe(() => {
          this.alert.showToast(
            'fields updated successfully',
            PrimeNgAlerts.SUCCESS
          );
        });
    } else {
      this.participantService.addParticipantsFields(formData).subscribe(() => {
        this.alert.showToast(
          'fields created successfully',
          PrimeNgAlerts.SUCCESS
        );
      });
    }

    const data =
      this.participantFieldsForm.value.participantFieldsArray.forEach(
        (element: any) => {}
      );
  }
}
