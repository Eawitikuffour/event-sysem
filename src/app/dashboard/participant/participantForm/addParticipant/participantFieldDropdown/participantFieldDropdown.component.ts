import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-participantFieldDropdown',
  templateUrl: './participantFieldDropdown.component.html',
  styleUrls: ['./participantFieldDropdown.component.scss'],
})
export class ParticipantFieldDropdownComponent
  implements OnInit, AfterViewInit
{
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.intitializeForm();
  }

  ngAfterViewInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.form = this.formBuilder.group({
      options: ['', Validators.required],
    });
  }

  get dropdownFormData() {
    return this.form.getRawValue();
  }
}
