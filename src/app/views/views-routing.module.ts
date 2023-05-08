import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./dashboard/dashboard.component').then(
  //     (r) => r.DashboardComponent
  //   ),
  // },
  // {
  //   path: 'calendar',
  //   loadChildren: () => import('./calendar/calendar.component').then(
  //     (r) => r.CalendarComponent
  //   ),
  // },
  { path: '', component: DashboardComponent },
  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
