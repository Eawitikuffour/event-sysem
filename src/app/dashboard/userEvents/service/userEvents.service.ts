import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserEventsService {
  private getEventURL = `${environment.API_URL_BASE}/admin/get_event/`;
  constructor(private http: HttpClient) {}

  getEvent(user_id: any) {
    return this.http.get(this.getEventURL + user_id);
  }
}
