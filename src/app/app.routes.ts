import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AboutComponent } from './features/about/about.component';
import { IncidentPageComponent } from './features/incidents/pages/incident-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'incident', component: IncidentPageComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
];
