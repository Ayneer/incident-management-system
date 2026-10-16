import { Routes } from '@angular/router';
import { IncidentComponent } from './features/incidents/componets/incident.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AboutComponent } from './features/about/about.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'incident', component: IncidentComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
];
