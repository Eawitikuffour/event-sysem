import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventDetails } from '../../modal/eventDetails';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private addEventURL = `${environment.API_URL_BASE}/event/addEventWithFile`;
  private updateEventURL = `${environment.API_URL_BASE}/event/update`;
  private deleteEventURL = `${environment.API_URL_BASE}/event/delete/`;
  private getEventURL = `${environment.API_URL_BASE}/event/getAllEvents`;

  constructor(private http: HttpClient) {}

  addEvent(event: EventDetails) {
    return this.http.post(this.addEventURL, event);
  }

  updateEvent(data: { event: EventDetails; id: number; i: number }) {
    return this.http.put(this.updateEventURL, data);
  }

  deleteEvent(id: number) {
    return this.http.delete(this.deleteEventURL + id);
  }

  getEvent(id: number) {
    return this.http.get(this.getEventURL + id);
  }

  getAllEvents() {
    return this.http.get(this.getEventURL);
  }
}
