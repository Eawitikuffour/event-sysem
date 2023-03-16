import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Participant } from 'src/app/dashboard/modal/participant';

@Injectable({
  providedIn: 'root',
})
export class EventFormService {
  private addParicipantURL = `${environment.API_URL_BASE}/participant/add`;
  constructor(private http: HttpClient) {}

  addParticipant(participant: Participant) {
    return this.http.post(this.addParicipantURL, participant);
  }
}
