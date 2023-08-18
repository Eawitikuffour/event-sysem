import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventFormService } from '../service/eventForm.service';
import { catchError } from 'rxjs/operators';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  event_name!: string;
  eventDetails: any;
  showForm = false;
  data: any;
  searchParticipant!: FormControl;

  constructor(
    private route: Router,
    private alert: AppAlertService,
    private eventService: EventFormService,
    private acitvatedRoute: ActivatedRoute
  ) {
    this.searchParticipant = new FormControl('');
  }

  ngOnInit() {
    this.getEventDetails();
  }

  getEventDetails() {
    this.acitvatedRoute.params.subscribe((params) => {
      if (params) {
        this.event_name = params['event_name'];
        this.eventService.getEvent(this.event_name).subscribe((data: any) => {
          if (data) {
            this.eventDetails = data;
            this.showForm = true;
          }
          console.log(data);
        });
      }
    });
  }

  searchError: any;
  submitSearchData() {
    const search = this.searchParticipant.value;

    this.eventService
      .searchForParticipant(search)
      .pipe(
        catchError((error: any) => {
          this.searchError = this.alert.showToast(
            `${search} does not exist`,
            PrimeNgAlerts.ERROR
          );
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          const id = res.id;
          this.route.navigate([
            `participant/confirm-data/${this.event_name}/${id}`,
          ]);
        }
      });
  }

  register() {
    return this.route.navigate([
      `/participant/add-new/${this.eventDetails.event_name}`,
    ]);
  }
}
