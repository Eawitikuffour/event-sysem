import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventDetails } from '../../modal/eventDetails';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private addEventURL = `${environment.API_URL_BASE}/event/add`;
  private updateEventURL = `${environment.API_URL_BASE}/event/update`;
  // private getAllEvents = `${environment.API_URL_BASE}/event`;
  private getEventURL = `${environment.API_URL_BASE}/event/`;

  constructor(private http: HttpClient) {}

  addEvent(event: EventDetails) {
    return this.http.post(this.addEventURL, event);
  }

  updateEvent(data: { event: EventDetails; id: number; i: number }) {
    return this.http.put(this.updateEventURL, data);
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
}
