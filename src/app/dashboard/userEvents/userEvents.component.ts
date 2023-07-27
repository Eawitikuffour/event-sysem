import { Component, OnInit } from '@angular/core';
import { UserEventsService } from './service/userEvents.service';

@Component({
  selector: 'app-userEvents',
  templateUrl: './userEvents.component.html',
  styleUrls: ['./userEvents.component.scss'],
})
export class UserEventsComponent implements OnInit {
  layout: string = 'list';
  events: any;
  constructor(private userEvents: UserEventsService) {}

  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    const user_id = localStorage.getItem('user_id');
    this.userEvents.getEvent(user_id).subscribe((res: any) => {
      this.events = [...res];
      console.log(this.events);
    });
  }
}
