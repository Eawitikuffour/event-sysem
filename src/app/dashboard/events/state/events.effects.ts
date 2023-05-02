import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import { PrimeNgAlerts } from 'src/app/config/app-config';
// import { AppAlertService } from 'src/app/shared-ui-modules/alerts/service/app-alert.service';

import { eventsListActions } from './events.actions';
import { Store } from '@ngrx/store';
import { EventDetails } from '../../modal/eventDetails';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import {
  PrimeNgAlerts,
  DEFAULT_PAGE_SIZE,
} from 'src/app/common/alerts/app-config';
import { User } from 'src/app/login/model/user';
import { EventService } from '../service/event.service';

@Injectable()
export class UsersListEffects {
  loadEventList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsListActions.fetch),
      switchMap(() =>
        this.eventService.getAllEvents().pipe(
          map((eventLists: EventDetails[]) =>
            eventsListActions.fetchSuccessful({
              eventLists,
            })
          ),
          catchError((error) => of(eventsListActions.fetchError({ error })))
        )
      )
    )
  );

  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsListActions.addEvent),
      switchMap(({ event }) =>
        this.eventService.addEvent(event).pipe(
          map((eventDetails: EventDetails) =>
            eventsListActions.addEventSuccessful({
              eventDetails,
            })
          ),
          tap((_) =>
            this.alert.showToast(
              'User  added successfully',
              PrimeNgAlerts.SUCCESS
            )
          ),
          catchError((error) => of(eventsListActions.fetchError({ error })))
        )
      )
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsListActions.editEvent),
      switchMap(({ eventDetails }) =>
        this.eventService.updateEvent(eventDetails).pipe(
          map((updatedUser) =>
            eventsListActions.addEventSuccessful({
              eventDetails,
            })
          ),
          tap((saved) => this.showToast('User Edited Successfully')),
          catchError((error) => {
            this.showError(error);
            return of(eventsListActions.fetchError);
          })
        )
      )
    )
  );

  // searchUser$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(eventsListActions.findAndSelectUser),
  //     switchMap(({ searchParams }) =>
  //       this.eventService.searchUser(searchParams).pipe(
  //         map((usersList: User[]) =>
  //           eventsListActions.selectUser({
  //             user: usersList?.[0],
  //           })
  //         ),
  //         catchError((error) => {
  //           this.showError(error);
  //           return of(eventsListActions.fetchError);
  //         })
  //       )
  //     )
  //   )
  // );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(eventsListActions.deleteEvent),
      switchMap(({ id }) =>
        this.eventService.deleteEvent(id).pipe(
          map((user: any) =>
            eventsListActions.deleteEventsSuccessful({
              id,
            })
          ),
          tap((_) =>
            this.alert.showToast(
              'User deleted successfully',
              PrimeNgAlerts.UNOBSTRUSIVE
            )
          ),
          catchError((error) => of(eventsListActions.fetchError(error)))
        )
      )
    )
  );

  private showToast(message: string) {
    this.alert.showToast(message, PrimeNgAlerts.UNOBSTRUSIVE);
  }

  private showError(error: any) {
    this.alert.showToast(
      'An error occurred. Rest assured we will fix it',
      PrimeNgAlerts.ERROR
    );
  }

  constructor(
    private actions$: Actions,
    private eventService: EventService,
    private alert: AppAlertService,
    private store: Store
  ) {}
}
