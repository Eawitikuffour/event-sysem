import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Participant } from 'src/app/dashboard/modal/participant';
import { GetParticipants } from '../../store/participant/participant.action';

@Injectable({
  providedIn: 'root',
})
export class EventFormService {
  private getEventURL = `${environment.API_URL_BASE}/event/name/`;
  private particpantURl = `${environment.API_URL_BASE}/participant`;
  private participantFieldURL = `${environment.API_URL_BASE}/participantfields`;

  constructor(private http: HttpClient) {}

  addParticipant(participant: any) {
    return this.http.post(`${this.particpantURl}/add`, participant);
  }

  getEvent(event_name: string) {
    return this.http.get(this.getEventURL + event_name);
  }

  getParticipantField(event_name: string) {
    return this.http.get(
      `${this.participantFieldURL}/event_name/` + event_name
    );
  }

  GetParticipantFieldByID(event_id: any) {
    return this.http.get(`${this.participantFieldURL}/event_id/` + event_id);
  }

  searchForParticipant(data: string) {
    return this.http.get(`${this.particpantURl}/search/` + data);
  }

  getRegisteredParticipant(id: any) {
    return this.http.get(`${this.particpantURl}/id/` + id);
  }

  confirmAttendance(data: any) {
    return this.http.put(`${this.particpantURl}/confirm_attendance`, data);
  }
}
