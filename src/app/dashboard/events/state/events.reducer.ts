import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { EventDetails } from '../../modal/eventDetails';
import { eventsListActions } from '../state/events.actions';

export interface EventsListState extends EntityState<EventDetails> {
  selectedEvent: EventDetails | null;
  SelectedEventToEdit: EventDetails | null;
  loading: boolean;
}

export const eventsEntityAdapter: EntityAdapter<EventDetails> =
  createEntityAdapter<EventDetails>({
    sortComparer: false,
  });

export const initialState: EventsListState =
  eventsEntityAdapter.getInitialState({
    selectedEvent: null,
    loading: false,
    selectedEventToEdit: null,
  });

export const eventListReducer = createReducer(
  initialState,
  on(eventsListActions.fetch, (state) => {
    return { ...state, loading: true };
  }),
  on(eventsListActions.fetchSuccessful, (state, { eventLists }) => {
    return eventsEntityAdapter.setAll(eventLists, { ...state, loading: false });
  }),
  on(eventsListActions.fetchSearchSuccessful, (state, { eventsList }) => {
    return { ...state, loading: false, searchResults: eventsList };
  }),

  // on(eventsListActions.searchEventDetails, (state) => {
  //   return { ...state, loading: true };
  // }),
  on(eventsListActions.fetchError, (state) => {
    return { ...state, loading: false };
  }),
  on(eventsListActions.selectEvent, (state, { eventDetails }) => {
    return { ...state, selectedEventDetails: eventDetails };
  }),
  on(eventsListActions.selectEventToEdit, (state, { eventDetails }) => {
    return { ...state, selectedEventDetailsToEdit: eventDetails };
  }),
  on(eventsListActions.addEventSuccessful, (state, { eventDetails }) => {
    return eventsEntityAdapter.addOne(eventDetails, state);
  }),
  on(eventsListActions.editEventSuccessful, (state, { updatedEvent }) => {
    return eventsEntityAdapter.updateOne(updatedEvent, state);
  }),
  on(eventsListActions.deleteEventsSuccessful, (state, { id }) => {
    return eventsEntityAdapter.removeOne(id, state);
  }),
  on(eventsListActions.clearSelected, (state) => {
    return {
      ...state,
      selectedEventDetailsToEdit: null,
      selectedEventDetails: null,
    };
  })
);
