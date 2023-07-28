import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { ParticipantService } from 'src/app/dashboard/participant/service/participant.service';
import { GetParticipants } from './participant.action';
import { tap } from 'rxjs';

export class ParticipantStateModel {
  participants: any;
}

@State<ParticipantStateModel>({
  name: 'participantState',
  defaults: {
    participants: [],
  },
})
@Injectable()
export class ParticipantState {
  constructor(
    private participantService: ParticipantService,
    private alert: AppAlertService
  ) {}

  @Selector()
  static selectStateData(state: ParticipantStateModel) {
    return state.participants;
  }

  @Action(GetParticipants)
  getDataFromState(
    ctx: StateContext<ParticipantStateModel>,
    { event_id }: GetParticipants
  ) {
    return this.participantService.getEventRegisteredParticipant(event_id).pipe(
      tap((returnData) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          participants: returnData,
        });
      })
    );
  }
}
