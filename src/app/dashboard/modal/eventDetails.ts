export interface EventDetails {
  event_name: string;
  venue: string;
  start_date: Date;
  end_date: Date;
  number_of_participants: string;
  description: string;
  how_to_join: string;
  user_id: string;
  registration_time: string;
  flyer: any;
  program_outline: any;
}
export interface Attendance {
  name: string;
  gender: string;
  email: string;
  institution: string;
  telNumber: string;
}
