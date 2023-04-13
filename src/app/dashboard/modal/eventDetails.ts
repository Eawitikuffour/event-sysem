export interface EventDetails {
  event_name: string;
  venue: string;
  start_date: Date;
  end_date: Date;
  number_of_participants: number;
  description: string;
}
export interface Attendance {
  name: string;
  gender: string;
  email: string;
  institution: string;
  telNumber: string;
}
