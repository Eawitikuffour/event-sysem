import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorsComponent } from '../../validators/validators.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-participantfieldsForm',
  templateUrl: './participantfieldsForm.component.html',
  styleUrls: ['./participantfieldsForm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParticipantfieldsFormComponent implements OnInit, AfterViewInit {
  @ViewChild('validatorsForm') validatorForm!: ValidatorsComponent;

  participantFieldsForm!: FormGroup;
  displayDropdownOptions = false;
  textFieldType: any[] = [
    { value: 'textField', viewValue: 'Text Field' },
    { value: 'inputNumber', viewValue: 'Number' },
    { value: 'dropdown', viewValue: 'Dropdown' },
    { value: 'date', viewValue: 'Date' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.createParticipantFieldForm();
  }
  ngAfterViewInit(): void {
    this.participantFieldsControl();
    this.cdref.detectChanges;
  }

  createParticipantFieldForm() {
    this.participantFieldsForm = this.formBuilder.group({
      fieldName: ['', Validators.required],
      fieldType: ['', Validators.required],
      options: [''],
    });
  }

  participantFieldsControl() {
    this.participantFieldsForm
      .get('fieldType')
      ?.valueChanges.pipe(debounceTime(100))
      .subscribe((res: any) => {
        if (res.value == 'dropdown') {
          console.log(res);
          this.displayDropdownOptions = true;
        } else {
          this.displayDropdownOptions = false;
        }
      });
  }

  get participantFieldsFormData() {
    const data = this.participantFieldsForm.getRawValue();
    data.fieldType = data.fieldType.value;
    return {
      ...data,
      validators: this.validatorForm.form.value,
    };
  }

  get formIsInvalid() {
    return this.participantFieldsForm.invalid;
  }
}
