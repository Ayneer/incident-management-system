import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'dashboard-component',
    templateUrl: 'dashboard.component.html',
    imports: [],
})
export class DashboardComponent {
    
}