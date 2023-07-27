import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EventDetails } from '../../modal/eventDetails';
import { UnassignModerator } from '../../../store/moderator/moderator.action';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventURL = `${environment.API_URL_BASE}/event`;
  private adminURL = `${environment.API_URL_BASE}/admin`;

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

  getEventByUser(user_id: any) {
    return this.http.get(`${this.adminURL}/get_event/` + user_id);
  }

  getUsersById(event_id: any) {
    return this.http.get(`${this.eventURL}/event_id/` + event_id);
  }

  assignModerator(id: any, user_id: any) {
    return this.http.put(`${this.eventURL}/assign-event`, id, user_id);
  }

  UnassignModerator(id: any, user_id: any) {
    return this.http.put(`${this.eventURL}/unassign-event`, id, user_id);
  }
}
