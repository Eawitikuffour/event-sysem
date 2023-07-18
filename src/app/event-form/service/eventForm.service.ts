import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Participant } from 'src/app/dashboard/modal/participant';

@Injectable({
  providedIn: 'root',
})
export class EventFormService {
  private getEventURL = `${environment.API_URL_BASE}/event/getEventByName/`;
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
}
