import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[criticalIncident]',
})
export class CriticalIncidenDirective implements OnInit {
  private element = inject(ElementRef);
  criticalIncident = input.required<boolean>();

  ngOnInit(): void {
    if (this.criticalIncident()) {
      this.element.nativeElement.style.borderColor = 'red';
      this.element.nativeElement.style.boxShadow = `0 0 5px ${'red'}`;
    }
  }
}
