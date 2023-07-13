import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../addUser/addUser.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-showUsers',
  templateUrl: './showUsers.component.html',
  styleUrls: ['./showUsers.component.scss'],
})
export class ShowUsersComponent implements OnInit {
  constructor(private dialogService: DialogService, private store: Store) {}

  ngOnInit() {
    console.log('testing');
  }

  addUser() {
    const ref = this.dialogService.open(AddUserComponent, {
      styleClass:
        'w-screen md:w-6 h-screen md:h-auto px-4 pb-4 no-dialog-header',
      header: 'Add User',
    });
  }

  editUserDetails() {}
  deleteUser() {}
}
