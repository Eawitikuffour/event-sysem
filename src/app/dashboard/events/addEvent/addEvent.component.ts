import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { EventDetails } from '../../modal/eventDetails';
import { EventService } from '../service/event.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddEvents } from 'src/app/store/event/event.action';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users/service/users.service';

@Component({
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.scss'],
})
export class AddEventComponent implements OnInit, AfterViewInit {
  @Input()
  data!: EventDetails;
  eventForm!: FormGroup;

  flyer!: any;
  program_outline: any | undefined;
  joiningEventOptions: any[] = [
    { value: 'Onsite', viewValue: 'Onsite' },
    { value: 'Virtual means', viewValue: 'Virtual means' },
  ];
  filteredjoiningEventOptions!: any[];
  event_id: any;
  moderators: any[] = [];
  filteredModerator: any[] = [];

  @Output()
  selectedEvent = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private alert: AppAlertService,
    private store: Store,
    private route: ActivatedRoute,
    private userService: UsersService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.joiningEventOptions;
    this.initializeForm();

    this.event_id = this.route.snapshot.params['event_id'];
    this.getEventDetails();
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      event_name: ['', [Validators.required, Validators.minLength(5)]],
      venue: ['', [Validators.required, Validators.minLength(5)]],
      date: new FormControl(''),
      number_of_participants: new FormControl(''),
      registration_time: new FormControl('', Validators.required),
      start_time: new FormControl('', Validators.required),
      closing_time: new FormControl('', Validators.required),
      how_to_join: new FormControl('', Validators.required),
      description: new FormControl(''),
      user_id: new FormControl(''),
      flyer: new FormControl(''),
      program_outline: new FormControl(''),
    });
  }

  ngAfterViewInit(): void {
    this.joiningEventOptions;
    this.initializeForm();
    this.getAllUsers();
  }

  getEventDetails() {
    this.eventService.getEvent(this.event_id).subscribe((res: any) => {
      this.data = res;
      console.log(this.data.how_to_join);
      if (this.data) {
        console.log('data exits', this.data);
        this.eventForm.patchValue({
          ...this.data,
          date: [
            new Date(Date.parse(res.start_date)),
            new Date(Date.parse(res.end_date)),
          ],
        });
        this.cdref.detectChanges;
        this.eventForm.updateValueAndValidity;
      }
    });
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      console.log(data);
      for (let x of data) {
        const users = {
          name: x.name,
          id: x.id,
        };
        this.moderators.push(users);
      }
    });
  }
  filterOptions(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.joiningEventOptions.length; i++) {
      let options = this.joiningEventOptions[i];
      if (
        options.value.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        options.value.toUpperCase().indexOf(query.toUpperCase()) == 0
      ) {
        filtered.push(options);
      }
    }

    this.filteredjoiningEventOptions = filtered;
  }

  filterModerator(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.moderators.length; i++) {
      let moderator = this.moderators[i];
      if (
        moderator.name.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        moderator.name.toUpperCase().indexOf(query.toUpperCase()) == 0
      ) {
        filtered.push(moderator);
      }
    }

    this.filteredModerator = filtered;
  }

  addEvent() {
    const data = new FormData();
    const formData = this.eventForm.value;
    let optionsToJoin: any = [];
    const joiningEvent = Object.values(formData.how_to_join).forEach(
      (x: any) => {
        optionsToJoin.push(x.value);
      }
    );

    data.append('event_name', formData.event_name);
    data.append('venue', formData.venue);
    data.append('start_date', formData.date[0].toLocaleDateString());
    data.append('end_date', formData.date[1].toLocaleDateString());
    data.append('start_time', formData.start_time.toLocaleTimeString('en-GB'));
    data.append(
      'closing_time',
      formData.closing_time.toLocaleTimeString('en-GB')
    );
    data.append('how_to_join', optionsToJoin);
    data.append('number_of_participants', formData.number_of_participants);
    data.append('description', formData.description);

    data.append('flyer_name', formData.flyer.name);
    data.append(
      'program_outline_name',

      formData.program_outline.name
    );
    data.append('user_id', formData.user_id.id);

    this.store.dispatch(new AddEvents(data));
    // console.log(data);
    // console.log(joiningEvent);
    this.eventForm.reset();
  }

  onChangeFyler(event: any) {
    // if (event.target.files.length > 0) {
    this.flyer = event.target.files[0];
    // }
  }
  onChangeProgramOutline(event: any) {
    // if (event.target.files.length > 0) {
    this.program_outline = event?.target.files[0];
    // }
  }
  selected(event: any) {
    this.selectedEvent.next(event);
  }
}
