import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Incident } from '../../../../core/interfaces/incident.interface';
import { CATEGORIES, IncidentCategory } from '../../../../core/types/incident-category.type';
import { IncidentPriority, PRIORITIES } from '../../../../core/types/incident-priority.type';
import { IncidentStatus, STATUS } from '../../../../core/types/incident-status.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'new-incident-form',
  templateUrl: './new-incident-form.component.html',
  styleUrl: 'new-incident-form.component.scss',
  imports: [ReactiveFormsModule],
})
export class NewIncidentFormComponent {
  private _formBuilder = inject(FormBuilder);
  form = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: this._formBuilder.control<IncidentCategory>('OTHER', Validators.required),
    priority: this._formBuilder.control<IncidentPriority>('LOW', Validators.required),
    status: this._formBuilder.control<IncidentStatus>('OPEN', Validators.required),
    tag: this._formBuilder.array([]) as FormArray,
  });
  newIncidentEvent = output<Partial<Incident>>();
  categories = CATEGORIES;
  priorities = PRIORITIES;
  status = STATUS;

  createIncident() {
    if (this.form.valid) {
      this.newIncidentEvent.emit({
        title: this.form.value.title ?? '',
        description: this.form.value.description ?? '',
        category: this.form.value.category ?? 'UNDEFINED',
        priority: this.form.value.priority ?? 'UNDEFINED',
        status: this.form.value.status ?? 'OPEN',
        assignedAgentId: undefined,
      });
    }
  }

  cleanForm(){
    this.form.reset();
  }
}
