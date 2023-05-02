import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeatureNamesForStore } from 'src/app/config/app-config';

import { DefaultAdapterSelectors } from './default.adapter.selectors';
import { eventsEntityAdapter, EventsListState } from './events.reducer';

const usersListFeatureSelector = createFeatureSelector(
  FeatureNamesForStore.EventsList
);

class UsersListSelectors extends DefaultAdapterSelectors {
  constructor() {
    super(eventsEntityAdapter, usersListFeatureSelector);
  }

  alll = createSelector(this.state, (state) => state);
  filtered = createSelector(this.state, (state) => state);
  selectedUser = createSelector(this.state, (state) => state.selectedUser);
  selectedUserToEdit = createSelector(
    this.state,
    (state) => state.selectedUserToEdit
  );

  searchResults = createSelector(
    this.state,
    (state: EventsListState) => state.searchResults
  );
}

export const usersListSelectors = new UsersListSelectors();
