import { Component, OnInit } from '@angular/core';
import { ParticipantDataType } from '../../modal/participant';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addParticipant',
  templateUrl: './addParticipant.component.html',
  styleUrls: ['./addParticipant.component.scss'],
})
export class AddParticipantComponent implements OnInit {
  participantFieldsForm = this.formBuilder.group({
    participantFields: this.formBuilder.array([]),
  });
  i!: number;
  // participantFieldsArray!: FormArray;

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    // this.createParticipantForm();
  }

  get participantFields() {
    return this.participantFieldsForm.controls[
      'participantFields'
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
    const fieldsForm = this.formBuilder.group({
      fieldName: ['', Validators.required],
      fieldType: ['', Validators.required],
      fieldValidation: ['', Validators.required],
      fieldMaxLength: [],
      fieldMinLength: [],
    });
    this.participantFields.push(fieldsForm);
  }

  deleteField(i: number) {
    this.participantFields.removeAt(i);
  }

  submitFields() {
    console.log(this.participantFieldsForm.getRawValue());
  }
}
