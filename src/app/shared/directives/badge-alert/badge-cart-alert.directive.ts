import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { IncidentPriority } from '../../../core/types/incident-priority.type';

@Directive({
  selector: '[badgeIncidentPriority]',
})
export class BadgeIncidentPriorityDirective implements OnInit {
  private element = inject(ElementRef);
  badgeIncidentPriority = input.required<IncidentPriority | string>();

  ngOnInit(): void {
    if (this.badgeIncidentPriority()) {
      this.element.nativeElement.classList.add(
        'badge-' + this.getAlertTypeByPriority(this.badgeIncidentPriority())
      );
    }
  }

  getAlertTypeByPriority(priority: IncidentPriority | string): string {
    switch (priority.toUpperCase()) {
      case 'LOW':
        return 'secondary';

      case 'MEDIUM':
        return 'info';

      case 'HIGH':
        return 'warning';

      case 'CRITICAL':
        return 'danger';

      default:
        return 'primary';
    }
  }
}
