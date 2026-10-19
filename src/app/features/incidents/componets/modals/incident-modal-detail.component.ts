import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { Incident } from '../../../../core/interfaces/incident.interface';
import { IncidentDatePipe } from '../../../../shared/pipes/incident-date.pipe';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'incident-modal-detail-component',
  templateUrl: './incident-modal-detail.component.html',
  imports: [IncidentDatePipe],
})
export class IncidentModalDetailComponent {
  constructor(public activeModal: NgbActiveModal) {}

  incident = signal<Incident | null>(null);
  closeModalEvent = output();

  closeModal(modal: NgbActiveModal) {
    modal.close();
    this.closeModalEvent.emit();
  }
}
