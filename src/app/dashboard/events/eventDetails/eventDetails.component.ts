import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEventComponent } from '../addEvent/addEvent.component';

@Component({
  selector: 'app-eventDetails',
  templateUrl: './eventDetails.component.html',
  styleUrls: ['./eventDetails.component.scss'],
  // providers: [DialogService],
})
export class EventDetailsComponent implements OnInit {
  @ViewChild('eventForm')
  eventForm!: AddEventComponent;
  event_id!: number;
  showForm = false;
  data: any;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.getEventFromServer();
    // this.getEventDetails();
  }

  getEventFromServer() {
    this.route.params.subscribe((params) => {
      if (params) {
        this.event_id = params['event_id'];
        this.eventService.getEvent(this.event_id).subscribe((data: any) => {
          if (data) {
            this.showForm = true;
          }
          console.log(data);
        });
      }
      this.getEventDetails();
    });
  }

  getEventDetails() {
    this.eventService.getEvent(this.event_id).subscribe((res: any) => {
      this.data = res;
      console.log('event details from server', this.data);
    });
  }
}
