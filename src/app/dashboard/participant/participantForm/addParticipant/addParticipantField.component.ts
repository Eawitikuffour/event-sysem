import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { debounceTime, Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ParticipantFields } from '../modal/participantsForm';
import { ValidatorsComponent } from '../validators/validators.component';

@Component({
  selector: 'app-addParticipant',
  templateUrl: './addParticipantField.component.html',
  styleUrls: ['./addParticipantField.component.scss'],
})
export class AddParticipantFieldComponent implements OnInit, AfterViewInit {
  @ViewChild('validationForm')
  validationForm!: ValidatorsComponent;
  public participantFieldsArray!: FormArray;
  public participantFieldsForm!: FormGroup;
  showValidation = false;
  showValuesForDropdown = false;
  fieldType: any;

  // obs: Subscription;

  i!: number;
  participantForm: ParticipantFields = {} as ParticipantFields;

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

    // this.participantFieldsForm = this.formBuilder.group({
    //   participantFieldsArray: this.formBuilder.array([]),
    // });
    this.createParticipantForm();
    this.dropdownControl();
  }

  ngAfterViewInit(): void {
    this.createParticipantForm();
    // this.participantFieldsForm
    //   .get('fieldType')
    //   ?.valueChanges.pipe(debounceTime(500))
    //   .subscribe((res: any) => {
    //     console.log(res);
    //   });
    // const data = this.participantFieldsForm.value.participantFieldsArray
    //   .forEach((element: any) => {
    //     this.fieldType = element.fieldType.value;
    //   })
    //   .valueChanges.pipe(debounceTime(500))
    //   .subscribe((value: any) => console.log(value));
    // this.dropdownControl();
    // const control = this.participantFieldsForm
    //   .get('field_type')
    //   ?.valueChanges.pipe(debounceTime(500))
    //   .subscribe((value) => console.log(value));
    // this.participantFieldsForm
    //   .get('fieldType')
    //   ?.valueChanges.forEach((value: any) => {
    //     this.fieldType = value.fieldType.value;
    //   })
    console.log(this.participantForm);
  }

  get participantFields() {
    return this.participantFieldsForm.controls[
      'participantFieldsArray'
    ] as FormArray;
  }

  dropdownControl() {
    // const dropdown = this.participantFieldsForm.value.field_type;
    // dropdown?.valueChanges.pipe(debounceTime(500)).subscribe((value: any) => {
    //   console.log(value);
    //   if (value == 'dropdown') {
    //     this.showValuesForDropdown;
    //   }
    //   console.log(dropdown);
    // });
  }

  createParticipantForm(): FormGroup {
    const validators = this.validationForm.form.getRawValue();
    return this.formBuilder.group({
      fieldName: new FormControl('', Validators.required),
      fieldType: new FormControl('', Validators.required),
      dropdownValues: new FormControl(''),
      fieldValidors: this.formBuilder.group({
        required: validators.required,
        email: validators.email,
        maxLength: validators.maxLength,
        minLength: validators.minLength,
        maximum: validators.maximum,
        minimum: validators.minimum,
      }),
    });
  }
  addNewField() {
    this.dropdownControl();
    this.participantFieldsArray = this.participantFieldsForm.controls[
      'participantFieldsArray'
    ] as FormArray;
    this.participantFieldsArray.push(this.createParticipantForm());
  }

  deleteField(i: number) {
    this.participantFieldsArray.removeAt(i);
  }

  submitFields() {
    const data =
      this.participantFieldsForm.value.participantFieldsArray.forEach(
        (element: any) => {
          console.log(element.fieldType.value);
        }
      );
    console.log(this.validationForm.form.getRawValue().email);
    console.log(this.participantFieldsForm.value);
    console.log(this.participantForm);
  }
}
