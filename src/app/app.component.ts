import { Component, signal } from '@angular/core';
import { MainLayout } from './layout/main-layout/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayout],
  template: '<main-layout />',
})
export class App {}