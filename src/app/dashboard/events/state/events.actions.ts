import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Type } from '@angular/core';
import { EventDetails } from '../../modal/eventDetails';

class EventsListActions {
  readonly type = '[EventsList Actions]';
  fetch = createAction(`${this.type} Fetch`);

  fetchSuccessful = createAction(
    `${this.type} Fetch Successful`,
    props<{ eventLists: EventDetails[] }>()
  );

  fetchError = createAction(
    `${this.type} Fetch Error`,
    props<{ error: any }>()
  );

  selectEvent = createAction(
    `${this.type} Select EventDetails`,
    props<{
      eventDetails: EventDetails;
    }>()
  );

  selectEventToEdit = createAction(
    `${this.type} Select EventDetails To Edit`,
    props<{
      eventDetails: EventDetails;
    }>()
  );

  selectEventSuccess = createAction(`${this.type} Select EventDetails Success`);

  // searchEventDetails = createAction(
  //   `${this.type} Search EventDetails`,
  //   props<{
  //     searchParams: { [key: string]: any };
  //   }>()
  // );

  findAndSelectEvent = createAction(
    `${this.type} Find And Select EventDetails`,
    props<{
      searchParams: { [key: string]: any };
    }>()
  );

  findAndSelectEventById = createAction(
    `${this.type} Find And Select EventDetails By Id`,
    props<{
      id: string | number;
    }>()
  );

  // searchEventDetailsSuccess = createAction(
  //   `${this.type} Search EventDetails Success`
  // );

  fetchSearchSuccessful = createAction(
    `${this.type} Fetch Search Successful`,
    props<{ eventsList: EventDetails[] }>()
  );

  addEvent = createAction(
    `${this.type} Add EventDetails`,
    props<{ eventDetails: EventDetails }>()
  );

  addEventSuccessful = createAction(
    `${this.type} Add EventDetails Successful`,
    props<{ eventDetails: EventDetails }>()
  );

  editEvent = createAction(
    `${this.type} Edit EventDetails`,
    props<{ eventDetails: EventDetails }>()
  );

  editEventSuccessful = createAction(
    `${this.type} Edit EventDetails Successful`,
    props<{ updatedEvent: Update<EventDetails> }>()
  );

  deleteEvent = createAction(
    `${this.type} Delete EventDetails`,
    props<{ id: number }>()
  );

  deleteEventsSuccessful = createAction(
    `${this.type} Delete EventDetails Successful`,
    props<{ id: number }>()
  );

  clearSelected = createAction(`${this.type} Clear All Selected EventDetailss`);

  changePage = createAction(
    `${this.type} Change page`,
    props<{ page: number }>()
  );
}

export const eventsListActions = new EventsListActions();
