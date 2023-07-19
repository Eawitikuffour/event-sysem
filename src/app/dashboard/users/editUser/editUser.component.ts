import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AddUserComponent } from '../addUser/addUser.component';
import { UpdateUser } from 'src/app/store/users/users.action';

@Component({
  selector: 'app-editUser',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.scss'],
})
export class EditUserComponent implements OnInit {
  @ViewChild('user')
  user!: AddUserComponent;
  data: any;
  constructor(public config: DynamicDialogConfig, private store: Store) {}

  ngOnInit() {
    this.data = this.config.data;
    console.log(this.data);
  }

  editUser() {
    const formData = this.user.userForm.value;
    const data = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      event_id: formData.event_id,
    };
    this.store.dispatch(new UpdateUser(data, this.data.id, 0));
  }
}
