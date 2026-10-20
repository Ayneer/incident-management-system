import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentDatePipe } from '../../../../shared/pipes/incident-date.pipe';
import { Incident } from '../../../../core/interfaces/incident.interface';
import { IncidentSelect } from '../../../../core/types/incident-select.type';
import { FocusStyleDirective } from '../../../../shared/directives/focus/focus-style.directive';
import { CriticalIncidenDirective } from '../../../../shared/directives/critical-incident/critical-incident.directive';
import { BadgeIncidentPriorityDirective } from '../../../../shared/directives/badge-alert/badge-cart-alert.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'incident-card-component',
  templateUrl: 'incident-card.component.html',
  imports: [CommonModule, IncidentDatePipe, FocusStyleDirective, CriticalIncidenDirective, BadgeIncidentPriorityDirective],
})
export class IncidentCardComponent {
  incident = input.required<Incident>();
  onClick = output<IncidentSelect>();

  onClickCard(action: IncidentSelect){
    this.onClick.emit(action);
  }
}
