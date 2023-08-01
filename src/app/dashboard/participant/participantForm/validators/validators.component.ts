import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

  @Input() data: any;

  participantForm!: ParticipantFields;

  constructor(
    private formBuilder: FormBuilder,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.intitializeForm();
    console.log(this.form);
  }

  ngAfterViewInit(): void {
    this.intitializeForm();
    if (this.data) {
      this.form.patchValue(this.data);
      this.cdref.detectChanges();
    }
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
