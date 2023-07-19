import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../service/login.service';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';

@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  token!: string;
  showForm = false;
  user: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private alert: AppAlertService
  ) {}

  ngOnInit() {
    this.getUser();
    this.initializeForm();
  }

  getUser() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.token = params['token'];
        this.loginService.getToken(this.token).subscribe((data: any) => {
          if (data) {
            this.user = data;
            this.showForm = true;
          }
        });
      }
    });
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  createForm() {
    const password = this.form.value.password;
    const confirmpassword = this.form.value.confirmPassword;
    const data = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      password: password,
      event_id: this.user.event_id,
    };

    if (password === confirmpassword) {
      this.loginService.resetPassword(data).subscribe((res: any) => {
        this.alert.showToast(
          'password created successfully',
          PrimeNgAlerts.SUCCESS
        );
      });
    } else {
      this.alert.showToast('password mismatch', PrimeNgAlerts.ERROR);
    }
  }
}
