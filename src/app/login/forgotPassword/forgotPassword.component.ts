import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private alert: AppAlertService
  ) {}
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {}

  submitForm() {
    const data = this.email.value;
    this.loginService.forgotPassword(data).subscribe(() => {
      this.alert.showToast(
        'email submitted successfully',
        PrimeNgAlerts.SUCCESS
      );
    });
  }
}
