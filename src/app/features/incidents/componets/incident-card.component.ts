import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentPriority } from '../../../core/types/incident-priority.type';
import { IncidentDatePipe } from '../../../shared/pipes/incident-date.pipe';
import { Incident } from '../../../core/interfaces/incident.interface';
import { IncidentSelect } from '../../../core/types/incident-select.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'incident-card-component',
  templateUrl: 'incident-card.component.html',
  imports: [CommonModule, IncidentDatePipe],
})
export class IncidentCardComponent {
  incident = input.required<Incident>();
  onClick = output<IncidentSelect>();

  onClickCard(action: IncidentSelect){
    this.onClick.emit(action);
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
