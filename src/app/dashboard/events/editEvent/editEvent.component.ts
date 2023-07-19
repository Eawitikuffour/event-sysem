import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AddEventComponent } from '../addEvent/addEvent.component';
import { Store } from '@ngxs/store';
import { UpdateEvents } from 'src/app/store/event/event.action';

@Component({
  selector: 'app-editEvent',
  templateUrl: './editEvent.component.html',
  styleUrls: ['./editEvent.component.scss'],
})
export class EditEventComponent implements OnInit {
  @ViewChild('eventForm')
  eventForm!: AddEventComponent;

  data: any;
  constructor(public config: DynamicDialogConfig, private store: Store) {}

  ngOnInit() {
    this.data = this.config.data;
    console.log(this.data);
  }

  editEvent() {
    const EventForm = this.eventForm.eventForm.getRawValue();
    const data = {
      id: this.data.id,
      event_name: EventForm.event_name,
      venue: EventForm.venue,
      start_date: EventForm.date[0],
      end_date: EventForm.date[1],
      number_of_participants: EventForm.number_of_participants,
      description: EventForm.description,
    };

    this.store.dispatch(new UpdateEvents(data, this.data.id, 0));
  }
}
