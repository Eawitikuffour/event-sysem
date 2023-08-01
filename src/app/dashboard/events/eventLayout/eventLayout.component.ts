import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../service/event.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-eventLayout',
  templateUrl: './eventLayout.component.html',
  styleUrls: ['./eventLayout.component.scss'],
  // providers: [DialogService],
})
export class EventLayoutComponent implements OnInit, AfterViewInit {
  event_id!: any;
  showForm = false;
  id: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.getEventFromServer();
    this.event_id = this.route.snapshot.params['event_id'];
    console.log(this.event_id);
  }

  ngAfterViewInit(): void {}

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
