import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEventComponent } from '../addEvent/addEvent.component';
import { Store } from '@ngxs/store';
import { DeleteEvents, UpdateEvents } from 'src/app/store/event/event.action';

@Component({
  selector: 'app-eventDetails',
  templateUrl: './eventDetails.component.html',
  styleUrls: ['./eventDetails.component.scss'],
  // providers: [DialogService],
})
export class EventDetailsComponent implements OnInit {
  @ViewChild('eventForm')
  eventForm!: AddEventComponent;
  event_id!: any;
  showForm = false;
  data: any;
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private store: Store
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
        });
      }
      this.getEventDetails();
    });
  }

  getEventDetails() {
    this.eventService.getEvent(this.event_id).subscribe((res: any) => {
      this.data = res;
    });
  }

  editEvent() {
    const EventForm = this.eventForm.eventForm.getRawValue();
    const data = {
      id: this.data.id,
      event_name: EventForm.event_name,
      venue: EventForm.venue,
      start_date: EventForm.date[0].toLocaleDateString(),
      end_date: EventForm.date[1].toLocaleDateString(),
      start_time: EventForm.start_time.toLocaleTimeString('en-GB'),
      closing_time: EventForm.closing_time.toLocaleTimeString('en-GB'),
      number_of_participants: EventForm.number_of_participants,
      description: EventForm.description,
      flyer: EventForm.flyer,
      program_outline: EventForm.program_outline,
      how_to_join: EventForm.how_to_join.value,
      user_id: EventForm.user_id.id,
    };

    this.store.dispatch(new UpdateEvents(data, this.data.id, 0));
    console.log(data);
  }

  deactivateEvent() {
    this.store.dispatch(new DeleteEvents(this.event_id));
  }
}
