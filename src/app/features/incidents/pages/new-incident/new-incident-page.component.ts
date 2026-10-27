import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { NewIncidentFormComponent } from '../../componets/new-incident-form/new-incident-form.component';
import { Router } from '@angular/router';
import { IncidentSignalStore } from '../../../../core/store/incident-signal.store';
import { Incident } from '../../../../core/interfaces/incident.interface';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { authMockUser } from '../../../../core/services/mocks/auth.mock';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'new-incident-page',
  templateUrl: './new-incident-page.component.html',
  imports: [NewIncidentFormComponent, NgbAlert],
})
export class NewIncidentPageComponent {
  private _route = inject(Router);
  private _incidentSignalStore = inject(IncidentSignalStore);
  private _newIncidentForm = viewChild(NewIncidentFormComponent);
  alert = signal<{
    type: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';
    message: string;
  } | null>(null);

  goToMyIncdents() {
    this._route.navigate(['/incident']);
  }

  createIncident(incident: Partial<Incident>) {
    const currentDate = new Date();

    this._incidentSignalStore.addIncident({
      id:
        'INC-' +
        currentDate.getFullYear() +
        '-' +
        (this._incidentSignalStore.incidentTotal() + 1).toString().padStart(3, '0'),
      reporterId: authMockUser.user.id,
      title: incident.title ?? '',
      description: incident.description ?? '',
      category: incident?.category ?? 'CIBE',
      priority: incident?.priority ?? 'CRITICAL',
      status: incident?.status ?? 'CLOSED',
      assignedAgentId: undefined,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    });
    this.alert.set({ type: 'success', message: 'incident created successfuly.' });
    this._newIncidentForm()?.cleanForm();
  }

  close() {
    this.alert.set(null);
  }
}
