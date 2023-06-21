import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParticipantService {
  private getParticipantURL = `${environment.API_URL_BASE}/participant/`;
  private searchParticpantsURL = `${environment.API_URL_BASE}/search_participant/`;
  private addParticipantsFieldsURL = `${environment.API_URL_BASE}/participant/addParticipantFields`;
  private getParticipantFieldURL = `${environment.API_URL_BASE}/participant/getParticipantFieldByEventId/`;
  constructor(private http: HttpClient) {}

  getParticipant(id: number) {
    return this.http.get(this.getParticipantURL + id);
  }

  getAllParticpant() {
    return this.http.get(this.getParticipantURL);
  }

  searchParticipant(search: any) {
    return this.http.get(this.searchParticpantsURL + search);
  }

  addParticipantsFields(data: any) {
    return this.http.post(this.addParticipantsFieldsURL, data);
  }

  getParticipantFields(id: any) {
    return this.http.get(this.getParticipantFieldURL + id);
  }
}
