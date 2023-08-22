import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = `${environment.API_URL_BASE}/admin`;

  constructor(private http: HttpClient) {}
  loggedInUser: any;
  login = (user: any) => {
    return this.http.post<boolean>(`${this.loginUrl}/token`, user).pipe(
      map((user: any) => {
        if (user === 'Not Found') {
          this.loggedInUser = undefined;
          localStorage.removeItem('user');
          return false;
        } else if (user.detail === 'invalid password') {
          this.loggedInUser = undefined;
          localStorage.removeItem('user');
          return false;
        } else {
          this.loggedInUser = user;
          localStorage.setItem('token', user.access_token);
          localStorage.setItem('user_id', user.user.id);

          return user;
        }
      })
    );
  };

  loggedOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    return true;
  };

  getToken(token: string) {
    return this.http.get(`${this.loginUrl}/token/` + token);
  }

  resetPassword(data: any) {
    return this.http.put(`${this.loginUrl}/reset-password`, data);
  }

  forgotPassword(email: any) {
    return this.http.get(`${this.loginUrl}/email/` + email);
  }
}
