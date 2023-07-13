import { Routes, RouterModule } from '@angular/router';
import { ShowUsersComponent } from './showUsers/showUsers.component';

const routes: Routes = [
  { path: '', component: ShowUsersComponent, pathMatch: 'full' },
];

export const UserRoutes = RouterModule.forChild(routes);
