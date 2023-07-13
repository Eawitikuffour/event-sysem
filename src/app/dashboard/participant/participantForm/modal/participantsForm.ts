export interface ParticipantFields {
  fieldName: string;
  fieldType: any;
  fieldValidation: any;
  required: any;
  valuesForDropdown: string[];
  validators: FieldValidators;
}

export interface FieldValidators {
  email: any;
  maxLength: number;
  minLength: number;
  maximum: any;
  minimum: any;
}
