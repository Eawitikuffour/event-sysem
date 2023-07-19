import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'resetpassword/token/:token',
    component: ResetPasswordComponent,
    pathMatch: 'full',
  },
];

export const LoginRoutes = RouterModule.forChild(routes);
