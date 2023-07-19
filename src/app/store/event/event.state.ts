import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap, catchError } from 'rxjs/operators';
import {
  AddEvents,
  DeleteEvents,
  GetEvents,
  UpdateEvents,
} from './event.action';

import { error } from 'console';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { EventService } from 'src/app/dashboard/events/service/event.service';

export class EventStateModel {
  events: any;
}

@State<EventStateModel>({
  name: 'appstate',
  defaults: {
    events: [],
  },
})
@Injectable()
export class EventState {
  constructor(
    private eventService: EventService,
    private alert: AppAlertService
  ) {}

  @Selector()
  static selectStateData(state: EventStateModel) {
    return state.events;
  }

  @Action(GetEvents)
  getDataFromState(ctx: StateContext<EventStateModel>) {
    return this.eventService.getAllEvents().pipe(
      tap((returnData) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          events: returnData,
        });
      })
    );
  }

  @Action(AddEvents)
  addDataToState(ctx: StateContext<EventStateModel>, { payload }: AddEvents) {
    return this.eventService.addEvent(payload).pipe(
      tap((returnData) => {
        this.alert.showToast('event added successfully', PrimeNgAlerts.SUCCESS);
        const state = ctx.getState();
        ctx.patchState({
          events: [...state.events, returnData],
        });
      })
    );
  }

  @Action(UpdateEvents)
  updateDataOfState(
    ctx: StateContext<EventStateModel>,
    { payload, id, i }: UpdateEvents
  ) {
    return this.eventService.updateEvent(payload).pipe(
      tap((returnData) => {
        const state = ctx.getState();

        let userList = [...state.events];
        userList[0] = payload;

        ctx.setState({
          ...state,
          events: userList,
        });
      })
    );
  }

  @Action(DeleteEvents)
  deleteDataFromState(
    ctx: StateContext<EventStateModel>,
    { id }: DeleteEvents
  ) {
    return this.eventService.deleteEvent(id).pipe(
      tap((returnData) => {
        const state = ctx.getState();
        const filteredArray = state.events.filter(
          (contents: any) => contents.id !== id
        );

        ctx.setState({
          ...state,
          events: filteredArray,
        });
      })
    );
  }
}
