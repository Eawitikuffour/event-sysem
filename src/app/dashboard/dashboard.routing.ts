
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  {path: 'participant', loadChildren: () => import('./participant/participant.module').then(
    (m) => m.ParticipantModule
  )},
  {
    path: 'event', loadChildren: () => import('./events/events.module').then((m) => m.EventsModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoute {}
