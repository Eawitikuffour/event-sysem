import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ParticipantFields } from '../modal/participantsForm';

@Component({
  selector: 'app-validators',
  templateUrl: './validators.component.html',
  styleUrls: ['./validators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidatorsComponent implements OnInit, AfterViewInit {
  form!: FormGroup;

  participantForm!: ParticipantFields;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.intitializeForm();
    console.log(this.form);
  }

  ngAfterViewInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.form = this.formBuilder.group({
      required: [''],
      email: [''],
      maxLength: [''],
      minLength: [''],
      maximum: [''],
      minimum: [''],
    });
  }

  get validatorsFormData() {
    return this.form.getRawValue();
  }
}
