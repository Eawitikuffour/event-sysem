export interface Participant {
  name: string;
  gender: string;
  phone_number: string;
  email: string;
  organization: string;
  registry_from: string;
}

export interface ParticipantDataType {
  textField: string;
  inputNumber: string;
  dropDown: string;
  date: string;
}
