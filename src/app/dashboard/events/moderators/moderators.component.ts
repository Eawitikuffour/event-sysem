import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ShowUsersComponent } from '../../users/showUsers/showUsers.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ModeratorState } from 'src/app/store/moderator/moderator.state';
import {
  GetModerators,
  UnassignModerator,
} from 'src/app/store/moderator/moderator.action';
import { EventService } from '../service/event.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddModeratorComponent } from '../addModerator/addModerator.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.scss'],
})
export class ModeratorsComponent implements OnInit, AfterViewInit {
  moderators: any[] = [];

  selectedModetator: any;
  @Select(ModeratorState.selectStateData) moderators$:
    | Observable<any>
    | undefined;
  user_id: any;
  event_id: any;

  constructor(
    private store: Store,
    private eventService: EventService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user_id = localStorage.getItem('user_id');
    this.event_id = this.route.snapshot.params['event_id'];

    this.getModerator();
  }

  ngAfterViewInit(): void {
    this.getModerator();
    this.cdref.detectChanges();
  }

  getModerator() {
    this.store.dispatch(new GetModerators(this.event_id));
    this.moderators$?.subscribe((data: any) => {
      this.moderators = data;
    });
  }

  getEvent() {
    this.eventService.getEventByUser;
  }

  unassignModerator() {
    const data = {
      id: this.event_id,
      user_id: this.user_id,
    };
    this.store.dispatch(new UnassignModerator(data, this.event_id, 0));
    this.cdref.detectChanges();
  }

  addModerator() {
    const ref = this.dialogService.open(AddModeratorComponent, {
      styleClass:
        'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
      header: 'Assign Moderator',
      data: this.event_id,
    });
  }
}
