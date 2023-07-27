import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap, catchError } from 'rxjs/operators';

import { error } from 'console';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { EventService } from 'src/app/dashboard/events/service/event.service';
import {
  AssignModerator,
  GetModerators,
  UnassignModerator,
} from './moderator.action';

export class ModeratorStateModel {
  moderators: any;
}

@State<ModeratorStateModel>({
  name: 'moderatorState',
  defaults: {
    moderators: [],
  },
})
@Injectable()
export class ModeratorState {
  constructor(
    private eventService: EventService,
    private alert: AppAlertService
  ) {}

  @Selector()
  static selectStateData(state: ModeratorStateModel) {
    return state.moderators;
  }

  @Action(GetModerators)
  getDataFromState(
    ctx: StateContext<ModeratorStateModel>,
    { event_id }: GetModerators
  ) {
    return this.eventService.getUsersById(event_id).pipe(
      tap((returnData) => {
        const state = ctx.getState();
        // const filteredArray = state.moderators.filter(
        //   (contents: any) => contents.id !== event_id
        // );

        ctx.setState({
          ...state,
          moderators: returnData,
          // moderators: filteredArray,
        });
      })
    );
  }

  @Action(AssignModerator)
  assignEventFromState(
    ctx: StateContext<ModeratorStateModel>,
    { id, user_id, i }: UnassignModerator
  ) {
    return this.eventService.assignModerator(id, user_id).pipe(
      tap((returnData) => {
        const state = ctx.getState();
        const moderatorList = [...state.moderators];
        moderatorList[i] = user_id;

        ctx.setState({
          ...state,
          moderators: moderatorList,
        });
      })
    );
  }

  @Action(UnassignModerator)
  unassignEventFromState(
    ctx: StateContext<ModeratorStateModel>,
    { id, user_id, i }: UnassignModerator
  ) {
    return this.eventService.UnassignModerator(id, user_id).pipe(
      tap((returnData) => {
        const state = ctx.getState();
        const moderatorList = [...state.moderators];
        moderatorList[i] = user_id;

        ctx.setState({
          ...state,
          moderators: moderatorList,
        });
      })
    );
  }
}
