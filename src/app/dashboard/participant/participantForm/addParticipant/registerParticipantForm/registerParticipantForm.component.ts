import { Component, OnInit } from '@angular/core';
import { ParticipantFields } from '../../modal/participantsForm';

@Component({
  selector: 'app-registerParticipantForm',
  templateUrl: './registerParticipantForm.component.html',
  styleUrls: ['./registerParticipantForm.component.scss'],
})
export class RegisterParticipantFormComponent implements OnInit {
  fields: ParticipantFields[] = [];
  constructor() {}

  ngOnInit() {
    this.fields = [
      {
        fieldName: 'Full name',
        fieldMaxLength: 15,
        fieldMinLenght: 3,
        fieldType: 'textField',
        fieldValidation: 'yes',
      },
      {
        fieldName: 'email',
        fieldMaxLength: 15,
        fieldMinLenght: 3,
        fieldType: 'textField',
        fieldValidation: 'yes',
      },
      {
        fieldName: 'organization',
        fieldMaxLength: 15,
        fieldMinLenght: 3,
        fieldType: 'textField',
        fieldValidation: 'yes',
      },
      {
        fieldName: 'gender',
        fieldMaxLength: 15,
        fieldMinLenght: 3,
        fieldType: 'dropDown',
        fieldValidation: 'yes',
      },
    ];
  }
}
