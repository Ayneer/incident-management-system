import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { mockIncidents } from '../../../core/services/mocks/incident.mock';
import { CommonModule } from '@angular/common';
import { IncidentPriority } from '../../../core/types/incident-priority.type';
import { IncidentDatePipe } from '../../../shared/pipes/incident-date.pipe';
import { GetIncidentsCaseUse } from '../../../core/use-cases/get-incidents.use-case';
import { Incident } from '../../../core/interfaces/incident.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'incident-component',
  templateUrl: 'incident.component.html',
  imports: [CommonModule, IncidentDatePipe],
})
export class IncidentComponent implements OnInit {
  private _getIncidentsUseCase = inject(GetIncidentsCaseUse);
  incidents = signal<Incident[]>([]);

  ngOnInit(): void {
    this._getIncidentsUseCase.execute().subscribe({
      next: (incidents: Incident[]) => this.incidents.set(incidents),
      error: (error) => console.log('error: ', error),
    });
  }

  getAlertTypeByPriority(priority: IncidentPriority): string {
    switch (priority) {
      case 'LOW':
        return 'secondary';

      case 'MEDIUM':
        return 'info';

      case 'HIGH':
        return 'warning';

      case 'CRITICAL':
        return 'danger';
    }
  }
}
