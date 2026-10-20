import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incident } from '../../../core/interfaces/incident.interface';
import { IncidentCardComponent } from '../componets/incident-card/incident-card.component';
import { IncidentSelect } from '../../../core/types/incident-select.type';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IncidentModalDetailComponent } from '../componets/modals/incident-modal-detail.component';
import { IncidentSignalStore } from '../../../core/store/incident-signal.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'incident-page-component',
  templateUrl: 'incident-page.component.html',
  imports: [CommonModule, IncidentCardComponent, ],
})
export class IncidentPageComponent  {
  private _incidentSignalStore = inject(IncidentSignalStore);
  private readonly modalService = inject(NgbModal);
  readonly sureModalRef = viewChild<TemplateRef<NgbActiveModal>>('sureModal');
  incidents = this._incidentSignalStore.filteredIncidents;
  selectedIncident = signal<Incident | null>(null);

  onClick(select: IncidentSelect) {
    this.selectedIncident.set(select.incident);
    switch (select.action) {
      case 'DELETE': {
        this.modalService.open(this.sureModalRef(), { centered: true });
        break;
      }

      case 'SELECT': {
        const incidentModalRef = this.modalService.open(IncidentModalDetailComponent, {
          centered: true,
          size: 'lg',
        });
        incidentModalRef.componentInstance.incident.set(select.incident);
        break;
      }

      default: {
        const incidentModalRef = this.modalService.open(IncidentModalDetailComponent, {
          centered: true,
          size: 'lg',
        });
        incidentModalRef.componentInstance.incident.set(select.incident);
        break;
      }
    }
  }

  closeModal(modal: NgbActiveModal) {
    modal.close();
  }

  dismissModal(modal: NgbActiveModal) {
    modal.dismiss();
  }
}
