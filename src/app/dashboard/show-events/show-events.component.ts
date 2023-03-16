import { EventDetails } from './../modal/eventDetails';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEventComponent } from '../addEvent/addEvent.component';
import { EditEventComponent } from '../editEvent/editEvent.component';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.scss'],
  providers: [DialogService],
})
export class ShowEventsComponent implements OnInit {
  events: EventDetails[] = [];

  selectedEvent: any;
  constructor(
    public dialogService: DialogService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardService.getAllEvents().subscribe((data: any) => {
      this.events = data;
      console.log(this.events);
    });
  }
  addNewEvent() {
    const ref = this.dialogService.open(AddEventComponent, {
      styleClass:
        'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
      header: 'Add New Event',
      // width: '40%',
    });
  }
  editEvent(_event: EventDetails) {
    const ref = this.dialogService.open(EditEventComponent, {
      styleClass:
        'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
      header: 'Update Event',
      // width: '40%',
    });
  }
  deleteEvent(id: number) {
    this.dashboardService.deleteEvent(id).subscribe();
  }
}
