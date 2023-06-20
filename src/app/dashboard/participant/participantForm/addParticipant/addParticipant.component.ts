import { Component, OnInit } from '@angular/core';
import { ParticipantDataType } from '../../../modal/participant';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ParticipantService } from '../../service/participant.service';

@Component({
  selector: 'app-addParticipant',
  templateUrl: './addParticipant.component.html',
  styleUrls: ['./addParticipant.component.scss'],
})
export class AddParticipantComponent implements OnInit {
  public participantFieldsArray!: FormArray;
  public participantFieldsForm!: FormGroup;

  i!: number;

  textFieldType: any[] = [
    { value: 'textField', viewValue: 'Text Field' },
    { value: 'inputNumber', viewValue: 'Number' },
    { value: 'dropdown', viewValue: 'Dropdown' },
    { value: 'date', viewValue: 'Date' },
  ];

  TextFieldValidation: any[] = [
    { value: 0, viewValue: 'Yes' },
    { value: 1, viewValue: 'No' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private participantService: ParticipantService
  ) {
    this.participantFieldsForm = this.formBuilder.group({
      participantFieldsArray: this.formBuilder.array([]),
    });
  }
  data: any;
  ngOnInit() {
    this.data = this.config.data;
    console.log(this.data);
    this.participantFieldsForm = this.formBuilder.group({
      participantFieldsArray: this.formBuilder.array([]),
    });
    // this.createParticipantForm();
  }

  get participantFields() {
    return this.participantFieldsForm.controls[
      'participantFieldsArray'
    ] as FormArray;
  }

  createParticipantForm(): FormGroup {
    return this.formBuilder.group({
      fieldName: new FormControl('', Validators.required),
      fieldType: new FormControl('', Validators.required),
      fieldValidation: new FormControl('', Validators.required),
      fieldMaxLength: new FormControl(),
      fieldMinLength: new FormControl(),
    });
  }
  addNewField() {
    this.participantFieldsArray = this.participantFieldsForm.controls[
      'participantFieldsArray'
    ] as FormArray;
    this.participantFieldsArray.push(this.createParticipantForm());
  }

  deleteField(i: number) {
    this.participantFieldsArray.removeAt(i);
  }

  submitFields() {
    const data = {
      field_name: '',
      field_type: '',
      field_validation: '',
      field_max_length: '',
      field_min_length: '',
      event_id: this.data,
    };
    let next = '';

    (
      this.participantFieldsForm.get('participantFieldsArray') as FormArray
    ).controls.forEach((field) => {
      console.log(field.value);
      data.field_name += next + field.value.fieldName;
      data.field_type += next + field.value.fieldType.value;
      data.field_validation += next + field.value.fieldValidation.value;
      data.field_min_length += next + field.value.fieldMinLength;
      data.field_max_length += next + field.value.fieldMaxLength;
      next = '|';
    });
    this.participantService
      .addParticipantsFields(data)
      .subscribe((res) => console.log(res));
  }
}
