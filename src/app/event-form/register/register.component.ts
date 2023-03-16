import { debounce, debounceTime, map, Observable, Subject } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/dashboard/service/dashboard.service';
import * as _ from 'underscore';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // data: any[] = [];
  // options = [];
  results$: Observable<any> | undefined;
  // subject = new Subject();

  constructor(
    private route: Router,
    private participantService: DashboardService,
    private fb: FormBuilder
  ) {
    this.search = _.debounce(this.search, 1000);
  }

  ngOnInit() {}

  search(event: any) {
    const searchText = event.target.value;
    this.results$ = this.participantService.searchParticipant(searchText);
    // console.log(this.results$.length);
  }

  register() {
    return this.route.navigate(['/participant/add-new']);
  }
}
