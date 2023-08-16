import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from '../service/users.service';
import { EventService } from '../../events/service/event.service';
import { User } from 'src/app/login/model/user';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Input()
  data!: User;
  userForm!: FormGroup;
  filteredEvent!: any[];
  allEvents: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private eventService: EventService,
    private alert: AppAlertService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.eventsData();
    console.log(this.allEvents);
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.minLength(10), Validators.nullValidator]],
      event_id: [<object | null>null, Validators.required],
    });
  }

  eventsData() {
    this.eventService.getAllEvents().subscribe((data: any) => {
      data.forEach((element: any) => {
        const events = {
          event_name: element.event_name,
          id: element.id,
        };
        this.allEvents.push(events);
      });
    });
  }

  get userFormValue() {
    return this.userForm.value;
  }

  submitUserForm() {
    const data = this.userForm.value;
    let events: any = [];
    Object.values(data.event_id).forEach((x: any) => {
      events.push(x.id);
    });
    data.event_id = events;
    console.log(events);
    console.log(data);
    this.userService.addUser(data).subscribe((res: any) => {
      console.log(res);
    });
  }

  filterOptions(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.allEvents.length; i++) {
      let options = this.allEvents[i];
      if (
        options.event_name.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        options.event_name.toUpperCase().indexOf(query.toUpperCase()) == 0
      ) {
        filtered.push(options);
      }
    }

    this.filteredEvent = filtered;
  }
}
