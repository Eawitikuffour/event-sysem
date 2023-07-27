export class GetModerators {
  static readonly type = '[] Fetch';
  constructor(public event_id: any) {}
}

export class AssignModerator {
  static readonly type = '[] Update';
  constructor(public id: number, public user_id: number, public i: number) {}
}

export class UnassignModerator {
  static readonly type = '[] Add';
  constructor(public id: number, public user_id: number, public i: number) {}
}
