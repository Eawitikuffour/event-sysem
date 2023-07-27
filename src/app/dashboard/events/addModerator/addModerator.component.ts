import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { UsersService } from '../../users/service/users.service';
import { Store } from '@ngxs/store';
import { AssignModerator } from 'src/app/store/moderator/moderator.action';

@Component({
  selector: 'app-addModerator',
  templateUrl: './addModerator.component.html',
  styleUrls: ['./addModerator.component.scss'],
})
export class AddModeratorComponent implements OnInit, AfterViewInit {
  moderators: any[] = [];
  filteredModerator: any[] = [];
  user_id: any;
  id: any;
  constructor(private userService: UsersService, private store: Store) {}

  ngOnInit() {
    this.user_id = new FormControl('');
  }

  ngAfterViewInit(): void {
    this.getAllUsers();
    this.id = localStorage.getItem('id');
  }

  filterModerator(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.moderators.length; i++) {
      let moderator = this.moderators[i];
      if (
        moderator.name.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        moderator.name.toUpperCase().indexOf(query.toUpperCase()) == 0
      ) {
        filtered.push(moderator);
      }
    }

    this.filteredModerator = filtered;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data: any) => {
      console.log(data);
      for (let x of data) {
        const users = {
          name: x.name,
          id: x.id,
        };
        this.moderators.push(users);
      }
    });
  }

  submit() {
    const user_id = this.user_id.value;
    this.store.dispatch(new AssignModerator(user_id, this.id, 0));
  }
}