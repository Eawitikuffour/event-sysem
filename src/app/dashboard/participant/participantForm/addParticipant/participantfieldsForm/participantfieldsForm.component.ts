import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsComponent } from '../../validators/validators.component';
import { debounceTime } from 'rxjs';
import { DropdownComponent } from 'src/app/shared/fieldType/dropdown/dropdown.component';

@Component({
  selector: 'app-participantfieldsForm',
  templateUrl: './participantfieldsForm.component.html',
  styleUrls: ['./participantfieldsForm.component.scss'],
})
export class ParticipantfieldsFormComponent implements OnInit, AfterViewInit {
  @ViewChild('validatorsForm') validatorForm!: ValidatorsComponent;

  @ViewChild('dropdownForm') dropdownForm!: DropdownComponent;
  participantFieldsForm!: FormGroup;
  displayDropdownOptions = false;
  textFieldType: any[] = [
    { value: 'textField', viewValue: 'Text Field' },
    { value: 'inputNumber', viewValue: 'Number' },
    { value: 'dropdown', viewValue: 'Dropdown' },
    { value: 'date', viewValue: 'Date' },
  ];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createParticipantFieldForm();
  }
  ngAfterViewInit(): void {
    this.participantFieldsControl();
  }

  createParticipantFieldForm() {
    this.participantFieldsForm = this.formBuilder.group({
      fieldName: ['', Validators.required],
      fieldType: ['', Validators.required],
      dropdown: this.formBuilder.group({
        label: new FormControl(''),
        options: new FormControl(''),
      }),
    });
  }

  participantFieldsControl() {
    this.participantFieldsForm
      .get('fieldType')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((res: any) => {
        if (res.value == 'dropdown') {
          this.displayDropdownOptions = true;
        }
        console.log(res);
      });
  }

  get participantFieldsFormData() {
    const data = this.participantFieldsForm.getRawValue();
    data.fieldType = data.fieldType.value;
    return {
      ...data,
      ...this.dropdownForm.form.value,
      validators: this.validatorForm.form.value,
    };
  }

  get formIsInvalid() {
    return this.participantFieldsForm.invalid;
  }
}
