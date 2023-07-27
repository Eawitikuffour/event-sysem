import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event.service';

@Component({
  selector: 'app-eventDetails',
  templateUrl: './eventDetails.component.html',
  styleUrls: ['./eventDetails.component.scss'],
})
export class EventDetailsComponent implements OnInit {
  event_id!: number;
  showForm = false;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.getEventFromServer();
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
    });
  }
}
