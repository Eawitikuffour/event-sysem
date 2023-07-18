import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventDetails } from '../../modal/eventDetails';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventURL = `${environment.API_URL_BASE}/event`;

  constructor(private http: HttpClient) {}

  addEvent(event: EventDetails) {
    return this.http.post(`${this.eventURL}/add`, event);
  }

  updateEvent(data: { event: EventDetails; id: number; i: number }) {
    return this.http.put(`${this.eventURL}/update`, data);
  }

  deleteEvent(id: number) {
    return this.http.delete(`${this.eventURL}/delete/` + id);
  }

  getEvent(id: number) {
    return this.http.get(`${this.eventURL}/id/` + id);
  }

  getAllEvents() {
    return this.http.get(`${this.eventURL}/all`);
  }
}
