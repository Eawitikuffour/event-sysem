import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AddEventComponent } from '../addEvent/addEvent.component';
import { EventService } from '../service/event.service';


@Component({
  selector: 'app-editEvent',
  templateUrl: './editEvent.component.html',
  styleUrls: ['./editEvent.component.scss'],
})
export class EditEventComponent implements OnInit {
  @ViewChild('eventForm')
  eventForm!: AddEventComponent;
  data: any;
  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.data = this.config.data;
    console.log(this.eventForm);

    // this.eventForm = this.fb.group({
    //   event_name: ['', [Validators.required, Validators.minLength(5)]],
    //   venue: ['', [Validators.required, Validators.minLength(5)]],
    //   start_date: new FormControl(''),
    //   end_date: new FormControl(''),
    //   number_of_participants: new FormControl(''),
    //   description: new FormControl(''),
    // });
  }

  editEvent() {
    // const data = this.eventForm.getRawValue();
    // this.dashboardService.updateEvent(data).subscribe();
  }
}
