import { Component, OnInit } from '@angular/core';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { User } from './model/user';
import { AppAlertService } from '../common/alerts/service/app-alert.service';
import { PrimeNgAlerts } from '../common/alerts/app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [],
})
export class LoginComponent implements OnInit {
  accessToken: any;
  refreshToken: any;
  data: any;
  constructor(
    private loginService: LoginService,
    private route: Router, // public dialog: MatDialog, // private alert: AppAlertService
    private fb: FormBuilder,
    private alert: AppAlertService
  ) {}
  users!: FormGroup;
  ngOnInit(): void {
    this.users = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginError = false;
  login(): any {
    const credentials = new FormData();
    credentials.append('username', this.users.value.username);
    credentials.append('password', this.users.value.password);
    this.loginService
      .login(credentials)
      .pipe(
        catchError((error: any) => {
          this.loginError = true;
          return error;

          error;
        })
      )
      .subscribe((result: any) => {
        console.log(result);
        if (result) {
          console.log(result);
          this.alert.showToast('Log in successful', PrimeNgAlerts.UNOBSTRUSIVE);
          this.route.navigate(['/dashboard']);
        }
      });
  }
}
