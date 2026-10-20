import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IncidentSignalStore } from '../../core/store/incident-signal.store';
import { KeyValuePipe } from '@angular/common';
import { GetIncidentsCaseUse } from '../../core/use-cases/get-incidents.use-case';
import { BadgeIncidentPriorityDirective } from '../../shared/directives/badge-alert/badge-cart-alert.directive';
import { IncidentPriority } from '../../core/types/incident-priority.type';
import { Router } from '@angular/router';
import { IncidentStatus } from '../../core/types/incident-status.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'dashboard-component',
  templateUrl: 'dashboard.component.html',
  imports: [KeyValuePipe, BadgeIncidentPriorityDirective],
})
export class DashboardComponent implements OnInit {
  incidentSignalStore = inject(IncidentSignalStore);
  private _getIncidentUseCase = inject(GetIncidentsCaseUse);
  private _router = inject(Router);

  ngOnInit(): void {
    this._getIncidentUseCase.execute().subscribe({
      next: (incidents) => this.incidentSignalStore.setIncidents(incidents),
      error: (error) => console.log(error),
    });
  }

  onSummaryListClick(priority: string) {
    if (priority !== 'total') {
      this.incidentSignalStore.setPriorityFilter(priority.toUpperCase() as IncidentPriority);
    }
    this._router.navigate(['/incident']);
  }

  onSummaryStatusListClick(status: string) {
    if (status !== 'total') {
      const _status = status.toUpperCase() === 'INPROGRESS' ? 'IN_PROGRESS' : status.toUpperCase();
      this.incidentSignalStore.setStatusFilter(_status.toUpperCase() as IncidentStatus);
    }
    this._router.navigate(['/incident']);
  }
}
