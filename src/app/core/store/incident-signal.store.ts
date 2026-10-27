import { computed, Injectable, Signal, signal } from '@angular/core';
import { Incident } from '../interfaces/incident.interface';
import { IncidentSummary } from '../interfaces/incident-summary.interface';
import { IncidentPriority } from '../types/incident-priority.type';
import { IncidentSummaryStatus } from '../interfaces/incident-summary-status.interface';
import { IncidentStatus } from '../types/incident-status.type';

@Injectable({
  providedIn: 'root',
})
export class IncidentSignalStore {
  private _incidents = signal<Incident[]>([]);
  private _searchString = signal<string>('');
  private _priorityFilter = signal<IncidentPriority | null>(null);
  private _statusFilter = signal<IncidentStatus | null>(null);
  readonly incidents = this._incidents.asReadonly();
  readonly priorityFilter = this._priorityFilter.asReadonly();

  setIncidents(incidents: Incident[]): void {
    this._incidents.set(incidents);
  }

  addIncident(incident: Incident): void {
    this._incidents.update((incidents: Incident[]) => {
      return [...incidents, incident];
    });
  }

  updateIncident(incidentId: string, newIncident: Partial<Incident>): void {
    this._incidents.update((incidents: Incident[]) => {
      return incidents.map((incident) => {
        if (incident.id === incidentId) {
          return {
            ...incident,
            ...newIncident,
          };
        }
        return incident;
      });
    });
  }

  deleteIncident(incidentId: string): void {
    this._incidents.update((incidents: Incident[]) => {
      return incidents.filter((incident) => incident.id !== incidentId);
    });
  }

  readonly filteredIncidents: Signal<Incident[]> = computed(() => {
    const searchString = this._searchString().toLocaleLowerCase().trim();
    let incidentsResult: Incident[] = [];

    if (searchString === '') {
      incidentsResult = this._incidents();
    } else {
      incidentsResult = this._incidents().filter(
        (incident: Incident) =>
          incident.title.toLowerCase().trim().includes(searchString) ||
          incident.description.toLowerCase().trim().includes(searchString)
      );
    }

    if (this._priorityFilter() !== null) {
      incidentsResult = incidentsResult.filter(
        (incident: Incident) => incident.priority === this._priorityFilter()
      );
    }

     if (this._statusFilter() !== null) {
      incidentsResult = incidentsResult.filter(
        (incident: Incident) => incident.status === this._statusFilter()
      );
    }

    return incidentsResult;
  });

  readonly incidentSummary: Signal<IncidentSummary> = computed(() => {
    return this._incidents().reduce(
      (sumary: IncidentSummary, incident: Incident) => {
        if (incident.priority === 'LOW') sumary.low++;
        if (incident.priority === 'MEDIUM') sumary.medium++;
        if (incident.priority === 'HIGH') sumary.high++;
        if (incident.priority === 'CRITICAL') sumary.critical++;

        sumary.total++;

        return sumary;
      },
      { low: 0, medium: 0, high: 0, critical: 0, total: 0 }
    );
  });

  readonly incidentSummaryByStatus: Signal<IncidentSummaryStatus> = computed(() => {
    return this._incidents().reduce(
      (sumary: IncidentSummaryStatus, incident: Incident) => {
        if (incident.status === 'CLOSED') sumary.closed++;
        if (incident.status === 'RESOLVED') sumary.resolved++;
        if (incident.status === 'IN_PROGRESS') sumary.inProgress++;
        if (incident.status === 'OPEN') sumary.open++;

        sumary.total++;

        return sumary;
      },
      { closed: 0, resolved: 0, inProgress: 0, open: 0, total: 0 }
    );
  });

  readonly incidentTotal: Signal<number> = computed(() => this._incidents().length);

  setSearchString(searchString: string): void {
    this._searchString.set(searchString);
  }

  setPriorityFilter(priorityFilter: IncidentPriority): void {
    this._priorityFilter.set(priorityFilter);
  }

  setStatusFilter(statusFilter: IncidentStatus): void {
    this._statusFilter.set(statusFilter);
  }
}
