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
  @Input() form!: FormGroup;

  @Input() participantForm!: ParticipantFields;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.intitializeForm();
    console.log(this.form);
  }

  ngAfterViewInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    const formInputObject = {
      required: this.participantForm.required,
      email: this.participantForm.email,
      maxLength: this.participantForm.maxLength,
      minLength: this.participantForm.minLength,
      maximum: this.participantForm.maximum,
      minimum: this.participantForm.minimum,
    };

    this.form = this.formBuilder.group({
      required: '',
      email: '',
      maxLength: '',
      minLength: '',
      maximum: '',
      minimum: '',
    });
    this.form.patchValue(formInputObject);
  }
}
