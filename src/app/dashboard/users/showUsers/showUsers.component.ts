import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../addUser/addUser.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Select, Store } from '@ngxs/store';
import { Users } from '../modal/users';
import { UserState } from 'src/app/store/users/users.state';
import { Observable } from 'rxjs';
import { DeleteUser, GetUsers } from 'src/app/store/users/users.action';
import { EditUserComponent } from '../editUser/editUser.component';
import { User } from 'src/app/login/model/user';

@Component({
  selector: 'app-showUsers',
  templateUrl: './showUsers.component.html',
  styleUrls: ['./showUsers.component.scss'],
})
export class ShowUsersComponent implements OnInit, AfterViewInit {
  users: Users[] = [];
  selectedUser: any;
  @Select(UserState.selectStateData) users$: Observable<any> | undefined;

  constructor(private dialogService: DialogService, private store: Store) {}

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.store.dispatch(new GetUsers());
    this.users$?.subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
    });
  }

  addUser() {
    const ref = this.dialogService.open(AddUserComponent, {
      styleClass:
        'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
      header: 'Add User',
    });
  }

  editUserDetails(user: User) {
    const ref = this.dialogService.open(EditUserComponent, {
      styleClass:
        'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
      header: 'Update User',
      data: user,
    });
  }
  deleteUser(id: any) {
    this.store.dispatch(new DeleteUser(id));
  }
}
