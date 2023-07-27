import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EventDetails } from '../../modal/eventDetails';
import { EditEventComponent } from '../editEvent/editEvent.component';
import { EventService } from '../service/event.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddEventComponent } from '../addEvent/addEvent.component';
import { GetEvents, DeleteEvents } from 'src/app/store/event/event.action';
import { EventState } from 'src/app/store/event/event.state';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.scss'],
  providers: [DialogService],
})
export class ShowEventsComponent implements OnInit, AfterViewInit {
  user_id: any;
  events: EventDetails[] = [];
  @Select(EventState.selectStateData) events$: Observable<any> | undefined;

  selectedEvent: any;
  constructor(public dialogService: DialogService, private store: Store) {}

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.getEvents();
  }

  ngAfterViewInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.store.dispatch(new GetEvents());
    this.events$?.subscribe((data: any) => {
      this.events = data;
      console.log(this.events);
    });
  }
  addNewEvent() {
    const ref = this.dialogService.open(AddEventComponent, {
      styleClass:
        'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
      header: 'Add New Event',
    });
  }

  // viewParticipantForm(id: number) {
  //   const ref = this.dialogService.open(ViewParticipantFormComponent, {
  //     styleClass:
  //       'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
  //     header: 'Participant Details',
  //     data: id,
  //   });
  // }
  editEvent(_event: EventDetails) {
    const ref = this.dialogService.open(EditEventComponent, {
      styleClass:
        'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
      header: 'Update Event',
      data: _event,
    });
  }
  deleteEvent(id: number) {
    this.store.dispatch(new DeleteEvents(id));
  }
}
