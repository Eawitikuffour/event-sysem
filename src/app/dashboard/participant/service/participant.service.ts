import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private participantURL = `${environment.API_URL_BASE}/participant`;
  private participantFieldURL = `${environment.API_URL_BASE}/participantfields`;

  constructor(private http: HttpClient) {}

  getParticipant(id: number) {
    return this.http.get(`${this.participantURL}/id/` + id);
  }

  getAllParticpant() {
    return this.http.get(`${this.participantURL}/all`);
  }

  // searchParticipant(search: any) {
  //   return this.http.get(this.searchParticpantsURL + search);
  // }

  addParticipantsFields(data: any) {
    return this.http.post(`${this.participantFieldURL}/create`, data);
  }

  getParticipantFields(id: any) {
    return this.http.get(`${this.participantFieldURL}/id/` + id);
  }
}
