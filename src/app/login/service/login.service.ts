import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = `${environment.API_URL_BASE}/login`;

  constructor(private http: HttpClient) {}
  loggedInUser: any;
  login = (user: any) => {
    return this.http.post<boolean>(this.loginUrl, user).pipe(
      map((user: any) => {
        // user = user.detail;
        if (user === 'Not Found') {
          this.loggedInUser = undefined;
          localStorage.removeItem('user');
          // console.log(user);
          return false;
        } else if (user.detail === 'invalid password') {
          this.loggedInUser = undefined;
          localStorage.removeItem('user');
          return false;
        } else {
          this.loggedInUser = user;
          localStorage.setItem('token', user.access_token);

          return true;
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
}
