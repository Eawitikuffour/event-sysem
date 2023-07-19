import { EventDetails } from '../../dashboard/modal/eventDetails';

//Read
export class GetEvents {
  static readonly type = '[EventDetails] Fetch';
}

//Create
export class AddEvents {
  static readonly type = '[EventDetails] Add';
  constructor(public payload: any) {}
}

//Update
export class UpdateEvents {
  static readonly type = '[EventDetails] Update';
  constructor(public payload: any, public id: number, public i: number) {}
}

//Delete
export class DeleteEvents {
  static readonly type = '[EventDetails] Delete';
  constructor(public id: number) {}
}
