import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  constructor(private login: LoginService,  private router: Router) { }

  ngOnInit() {}
  logout(): any {
    if (this.login.loggedOut()) {
      return this.router.navigate(['/login']);
    }
  }
}
