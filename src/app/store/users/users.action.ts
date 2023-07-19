import { Users } from '../../dashboard/users/modal/users';

//Read
export class GetUsers {
  static readonly type = '[Users] Fetch';
}

//Create
export class AddUser {
  static readonly type = '[Users] Add';
  constructor(public payload: any) {}
}

//Update
export class UpdateUser {
  static readonly type = '[Users] Update';
  constructor(public payload: any, public id: number, public i: number) {}
}

//Delete
export class DeleteUser {
  static readonly type = '[Users] Delete';
  constructor(public id: number) {}
}
