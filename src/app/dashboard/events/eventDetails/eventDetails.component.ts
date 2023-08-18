import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event.service';
import { AddEventComponent } from '../addEvent/addEvent.component';
import { Store } from '@ngxs/store';
import { DeleteEvents, UpdateEvents } from 'src/app/store/event/event.action';

@Component({
  selector: 'app-eventDetails',
  templateUrl: './eventDetails.component.html',
  styleUrls: ['./eventDetails.component.scss'],
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
    });
  }

  editEvent() {
    const EventForm = this.eventForm.eventForm.getRawValue();
    let optionsToJoin: any = [];
    const joiningEvent = Object.values(EventForm.how_to_join).forEach(
      (x: any) => {
        optionsToJoin.push(x.value);
      }
    );
    const data = {
      id: this.event_id,
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
      how_to_join: optionsToJoin.toString(),
      user_id: EventForm.user_id.id,
    };

    this.store.dispatch(new UpdateEvents(data, this.event_id, 0));
  }

  deactivateEvent() {
    this.store.dispatch(new DeleteEvents(this.event_id));
  }
}
