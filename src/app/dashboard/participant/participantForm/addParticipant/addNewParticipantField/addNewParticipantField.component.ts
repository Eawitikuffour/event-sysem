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

  constructor(
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService
  ) {
    this.participantFieldsForm = this.formBuilder.group({
      participantFieldsArray: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.getEventFromServer();
    this.createParticipantForm();
    this.cdref.detectChanges();
  }

  getEventFromServer() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.event_id = params['event_id'];
        this.eventService.getEvent(this.event_id).subscribe((data: any) => {
          if (data) {
            this.showForm = true;
          }
          console.log(data);
        });
      }
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
      event_id: Number(this.event_id),
    };

    this.participantService
      .addParticipantsFields(formData)
      .subscribe((data: any) => {
        console.log(data);
      });

    console.log(formData);

    const data =
      this.participantFieldsForm.value.participantFieldsArray.forEach(
        (element: any) => {
          console.log(element.fieldType.value);
        }
      );
  }
}
