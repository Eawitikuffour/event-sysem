import { Component, OnInit, ViewChild } from '@angular/core';
import { EventFormComponent } from '../event-form/event-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EventFormService } from '../service/eventForm.service';
import { catchError } from 'rxjs';
import { error } from 'console';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';

@Component({
  selector: 'app-registeredParticipantFields',
  templateUrl: './registeredParticipantFields.component.html',
  styleUrls: ['./registeredParticipantFields.component.scss'],
})
export class RegisteredParticipantFieldsComponent implements OnInit {
  @ViewChild('participantForm') participantForm!: EventFormComponent;
  participantData: any;
  participant_id!: any;
  showForm = false;
  eventData!: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventFormService,
    private alert: AppAlertService
  ) {}

  ngOnInit() {
    this.participant_id = this.route.snapshot.params['id'];

    this.getRegisteredParticipant();
  }

  getRegisteredParticipant() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.participant_id = params['participant_id'];
        this.eventService
          .getRegisteredParticipant(this.participant_id)
          .subscribe((data: any) => {
            this.eventData = data;
            this.participantData = data.form_values;
            console.log(data);

            if (this.participantData) {
              this.showForm = true;
            }
          });
      }
    });
  }
  sendDataError = false;
  submitForm() {
    const data = {
      id: this.participant_id,
      form_values: this.participantData,
      event_id: this.eventData.event_id,
      status: true,
    };
    this.eventService
      .confirmAttendance(data)
      .pipe(
        catchError((error: any) => {
          this.sendDataError = true;
          this.alert.showToast('error', PrimeNgAlerts.ERROR);
          return error;
        })
      )
      .subscribe((res: any) => {
        if (res) {
          this.alert.showToast(
            'form has been confirmed',
            PrimeNgAlerts.SUCCESS
          );
        }
        return this.router.navigate([
          `/participant/add-new/${this.eventData.event_name}`,
        ]);
      });
  }
}
