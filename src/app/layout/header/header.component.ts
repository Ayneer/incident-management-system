import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'layout-header-navbar',
  templateUrl: './header.component.html',
  imports: [NgbCollapse, RouterLink],
})
export class HeaderComponent {
  readonly isMenuCollapsed = signal(true);
}
