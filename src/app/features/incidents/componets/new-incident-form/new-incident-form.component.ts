import { ChangeDetectionStrategy, Component, inject, OnInit, output, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Incident } from '../../../../core/interfaces/incident.interface';
import { CATEGORIES, IncidentCategory } from '../../../../core/types/incident-category.type';
import { IncidentPriority, PRIORITIES } from '../../../../core/types/incident-priority.type';
import { IncidentStatus, STATUS } from '../../../../core/types/incident-status.type';
import { from, map, switchMap } from 'rxjs';
import { validatorNoDuplicated } from '../../../../shared/validators/duplicated-form-array.validator';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'new-incident-form',
  templateUrl: './new-incident-form.component.html',
  styleUrl: 'new-incident-form.component.scss',
  imports: [ReactiveFormsModule],
})
export class NewIncidentFormComponent {
  private MAX_TAG = 4;
  private _formBuilder = inject(FormBuilder);
  form = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: this._formBuilder.control<IncidentCategory>('OTHER', Validators.required),
    priority: this._formBuilder.control<IncidentPriority>('LOW', Validators.required),
    status: this._formBuilder.control<IncidentStatus>('OPEN', Validators.required),
    tag: this._formBuilder.array(
      [],
      [validatorNoDuplicated(), Validators.nullValidator]
    ) as FormArray,
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

  cleanForm() {
    this.form.reset();
  }

  get tagFormArray(): FormArray {
    return this.form.controls.tag as FormArray;
  }

  get isFullTag(): boolean {
    return (
      this.tagFormArray.controls.length === this.MAX_TAG ||
      (this.tagFormArray.length > 0 &&
        this.tagFormArray.controls[this.tagFormArray.length - 1].invalid)
    );
  }

  addTag() {
    if (this.tagFormArray.controls.length <= this.MAX_TAG) {
      this.tagFormArray.push(this._formBuilder.control<string>('', [Validators.required]));
    }
  }

  deleteTag(index: number) {
    console.log(index);
    this.tagFormArray.removeAt(index);
  }
}
