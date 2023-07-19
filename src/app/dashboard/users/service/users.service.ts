import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersURL = `${environment.API_URL_BASE}/admin`;

  constructor(private http: HttpClient) {}

  addUser(data: any) {
    return this.http.post(`${this.usersURL}/add`, data);
  }

  getAllUsers() {
    return this.http.get(`${this.usersURL}/all`);
  }

  getUser(id: string) {
    return this.http.get(`${this.usersURL}/id/` + id);
  }

  updateUser(data: any) {
    return this.http.put(`${this.usersURL}/update`, data);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.usersURL}/delete/` + id);
  }
}
