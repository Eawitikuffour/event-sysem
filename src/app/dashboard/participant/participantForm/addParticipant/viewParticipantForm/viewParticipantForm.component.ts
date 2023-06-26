import { Component, Input, OnInit } from '@angular/core';
import { ParticipantFields } from '../../modal/participantsForm';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ParticipantService } from '../../../service/participant.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-registerParticipantForm',
  templateUrl: './viewParticipantForm.component.html',
  styleUrls: ['./viewParticipantForm.component.scss'],
})
export class ViewParticipantFormComponent implements OnInit {
  fieldsArray: ParticipantFields[] = [];
  fields: any;
  @Input() form: any;
  control: any;
  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    private participantService: ParticipantService
  ) {}

  data: any;
  ngOnInit() {
    this.data = this.config.data;
    this.participantService
      .getParticipantFields(this.data)
      .subscribe((response: any) => {
        if (response) {
          this.fields = response;
          console.log(this.fields);
          if (
            this.fields.field_name ||
            this.fields.field_type ||
            this.fields.field_max_length ||
            this.fields.field_min_length ||
            this.fields.field_validation
          ) {
            const fieldNameArray = this.fields.field_name.split('|');
            const fieldTypeArray = this.fields.field_type.split('|');
            const fieldMaxArray = this.fields.field_max_length.split('|');
            const fieldMixArray = this.fields.field_min_length.split('|');
            const fieldValidationArray =
              this.fields.field_validation.split('|');

            for (let index = 0; index < fieldNameArray.length; index++) {
              this.fieldsArray.push({
                field_name: fieldNameArray[index],
                field_type: fieldTypeArray[index],
                field_max_length: fieldMaxArray[index],
                field_min_length: fieldMixArray[index],
                field_validation: fieldValidationArray[index],
              });
            }
          }
        }
        console.log(this.fieldsArray);
      });
    // this.fields = [
    //   {
    //     fieldName: 'Full name',
    //     fieldMaxLength: 15,
    //     fieldMinLenght: 3,
    //     fieldType: 'textField',
    //     fieldValidation: 'yes',
    //   },
    //   {
    //     fieldName: 'email',
    //     fieldMaxLength: 15,
    //     fieldMinLenght: 3,
    //     fieldType: 'textField',
    //     fieldValidation: 'yes',
    //   },
    //   {
    //     fieldName: 'organization',
    //     fieldMaxLength: 15,
    //     fieldMinLenght: 3,
    //     fieldType: 'textField',
    //     fieldValidation: 'yes',
    //   },
    //   {
    //     fieldName: 'gender',
    //     fieldMaxLength: 15,
    //     fieldMinLenght: 3,
    //     fieldType: 'dropDown',
    //     fieldValidation: 'yes',
    //   },
    // ];

    this.fieldsArray.find((x) => {
      if (x.field_name) {
        this.control = x.field_name;
        console.log(x.field_name);
      }
    });
    this.form = this.formBuilder.group({
      formFieldControl: [this.control],
    });

    console.log(this.form.getRawValue());
  }

  findFieldName(field: string) {}
}
