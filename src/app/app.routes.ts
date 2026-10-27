import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AboutComponent } from './features/about/about.component';
import { IncidentPageComponent } from './features/incidents/pages/incident-page.component';
import { NewIncidentPageComponent } from './features/incidents/pages/new-incident/new-incident-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'incident', component: IncidentPageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'new-incident', component: NewIncidentPageComponent },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ],
  },
];
