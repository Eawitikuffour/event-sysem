import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../modal/participant';
import { environment } from 'src/environments/environment';
import { EventDetails } from '../modal/eventDetails';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private addEventURL = `${environment.API_URL_BASE}/event/add`;
  private updateEventURL = `${environment.API_URL_BASE}/event/update`;
  // private getAllEvents = `${environment.API_URL_BASE}/event`;
  private getEventURL = `${environment.API_URL_BASE}/event/`;
  private getParticipantURL = `${environment.API_URL_BASE}/participant/`;
  private searchParticpantsURL = `${environment.API_URL_BASE}/search_participant/`;

  constructor(private http: HttpClient) {}

  addEvent(event: EventDetails) {
    return this.http.post(this.addEventURL, event);
  }

  updateEvent(event: EventDetails) {
    return this.http.put(this.updateEventURL, event);
  }

  deleteEvent(id: number) {
    return this.http.delete(this.getEventURL + id);
  }

  getEvent(id: number) {
    return this.http.get(this.getEventURL + id);
  }

  getAllEvents() {
    return this.http.get(this.getEventURL);
  }

  getParticipant(id: number) {
    return this.http.get(this.getParticipantURL + id);
  }

  getAllParticpant() {
    return this.http.get(this.getParticipantURL);
  }

  searchParticipant(search: any) {
    return this.http.get(this.searchParticpantsURL + search);
  }
}
