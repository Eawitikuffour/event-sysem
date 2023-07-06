import {
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/dashboard/events/service/event.service';
import { ValidatorsComponent } from '../../validators/validators.component';
import { ParticipantFields } from '../../modal/participantsForm';
import { debounceTime } from 'rxjs';
import { ParticipantfieldsFormComponent } from '../participantfieldsForm/participantfieldsForm.component';

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
    private formBuilder: FormBuilder
  ) {
    this.participantFieldsForm = this.formBuilder.group({
      participantFieldsArray: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.getEventFromServer();
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
    this.cdref;

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
    this.participantFieldsArray.removeAt(i);
  }

  submitFields() {
    const values: any[] = [];
    this.inputFields.map((inputField) => {
      values.push(inputField.participantFieldsFormData);
    });

    console.log(values);

    const data =
      this.participantFieldsForm.value.participantFieldsArray.forEach(
        (element: any) => {
          console.log(element.fieldType.value);
        }
      );
  }
}
