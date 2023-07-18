import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';
import { EventFormService } from '../service/eventForm.service';
import { ParticipantService } from 'src/app/dashboard/participant/service/participant.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  results?: Observable<any>;
  event_name!: string;
  eventDetails: any;
  showForm = false;
  data: any;

  constructor(
    private route: Router,
    private participantService: ParticipantService,
    private fb: FormBuilder,
    private eventService: EventFormService,
    private acitvatedRoute: ActivatedRoute
  ) {
    this.search = _.debounce(this.search, 1000);
  }

  ngOnInit() {
    this.acitvatedRoute.params.subscribe((params) => {
      if (params) {
        this.event_name = params['event_name'];
        this.eventService
          .getEvent(this.event_name)
          .subscribe((response: any) => {
            console.log(response);
            if (response && Object.keys(response).length) {
              this.eventDetails = response;
              this.showForm = true;
            }
          });
      }
    });
  }

  search(event: any) {
    // const searchText = event.target.value;
    // this.results = this.participantService.searchParticipant(searchText);
    // const x = this.results.subscribe((res: any) => {
    //   console.log(res);
    // });
  }

  register() {
    return this.route.navigate([
      `/participant/add-new/${this.eventDetails.event_name}`,
    ]);
  }
}
