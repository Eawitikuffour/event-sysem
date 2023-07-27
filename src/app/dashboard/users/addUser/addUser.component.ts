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
  // filteredEvent: any;
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
      event_id: [[], Validators.required],
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

    let id;
    const x = data.event_id.forEach((element: any) => {
      id = element.id;
    });
    console.log(id);
    console.log(data);
  }
}
