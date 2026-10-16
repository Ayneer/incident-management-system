import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'about-component',
    templateUrl: './about.component.html',
    imports: [],
})
export class AboutComponent {
    
}