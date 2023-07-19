import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { PrimeNgAlerts } from 'src/app/common/alerts/app-config';
import { AppAlertService } from 'src/app/common/alerts/service/app-alert.service';
import { UsersService } from 'src/app/dashboard/users/service/users.service';
import { AddUser, DeleteUser, GetUsers, UpdateUser } from './users.action';

export class UserStateModel {
  users: any;
}

@State<UserStateModel>({
  name: 'userState',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UserState {
  constructor(
    private userService: UsersService,
    private alert: AppAlertService
  ) {}

  @Selector()
  static selectStateData(state: UserStateModel) {
    return state.users;
  }

  @Action(GetUsers)
  getDataFromState(ctx: StateContext<UserStateModel>) {
    return this.userService.getAllUsers().pipe(
      tap((returnData) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          users: returnData,
        });
      })
    );
  }

  @Action(AddUser)
  addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddUser) {
    return this.userService.addUser(payload).pipe(
      tap((returnData) => {
        this.alert.showToast('user added successfully', PrimeNgAlerts.SUCCESS);
        const state = ctx.getState();
        ctx.patchState({
          users: [...state.users, returnData],
        });
      })
    );
  }

  @Action(UpdateUser)
  updateDataOfState(
    ctx: StateContext<UserStateModel>,
    { payload, id, i }: UpdateUser
  ) {
    return this.userService.updateUser(payload).pipe(
      tap((returnData) => {
        const state = ctx.getState();

        let userList = [...state.users];
        userList[0] = payload;

        ctx.setState({
          ...state,
          users: userList,
        });
      })
    );
  }

  @Action(DeleteUser)
  deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteUser) {
    return this.userService.deleteUser(id).pipe(
      tap((returnData) => {
        const state = ctx.getState();
        const filteredArray = state.users.filter(
          (contents: any) => contents.id !== id
        );

        ctx.setState({
          ...state,
          users: filteredArray,
        });
      })
    );
  }
}
