import { EntityAdapter } from '@ngrx/entity';
import { createSelector, MemoizedSelector } from '@ngrx/store';

export class DefaultAdapterSelectors {
  constructor(
    protected entityAdapter: EntityAdapter<any>,
    protected state: MemoizedSelector<any, any, any>
  ) {}

  protected entitySelectors = this.entityAdapter.getSelectors();

  protected selectIds = this.entitySelectors.selectIds;

  // select the dictionary of user entities
  protected entities = this.entitySelectors.selectEntities;

  // select the array of users
  protected selectAll = this.entitySelectors.selectAll;

  // select the total user count
  total = this.entitySelectors.selectTotal;

  getById = (id: number) =>
    createSelector(this.all, (all: any[]) => all.find(one => one.id == id));

  getByName = (name: string) =>
    createSelector(this.all, (all: any[]) =>
      all.filter(one =>
        one?.name
          ?.replace(/\s/g, '')
          .toLowerCase()
          .includes(name.replace(/\s/g, '').toLowerCase())
      )
    );

  getBySlug = (slug: string) =>
    createSelector(this.all, (all: any[]) =>
      all.find(one => one?.slug === slug)
    );

  all = createSelector(this.state, this.selectAll);

  loading = createSelector(this.state, state => state.loading);
}
