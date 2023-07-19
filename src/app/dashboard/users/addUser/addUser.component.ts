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

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Input()
  data!: User;
  userForm!: FormGroup;
  filteredEvent: any;
  allEvents: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.eventsData();
  }

  initializeForm() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.minLength(10), Validators.nullValidator]],
      event_id: ['', Validators.required],
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

  filterEvent(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.allEvents.length; i++) {
      let event = this.allEvents[i];

      if (
        event.event_name.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        event.event_name.toUpperCase().indexOf(query.toUpperCase()) == 0
      ) {
        filtered.push(event);
      }
    }

    this.filteredEvent = filtered;
  }
  submitUserForm() {
    const data = this.userForm.value;
    data.event_id = Number(data.event_id.id);
    this.userService.addUser(this.userFormValue).subscribe((data: any) => {
      console.log(data);
    });
  }
}
