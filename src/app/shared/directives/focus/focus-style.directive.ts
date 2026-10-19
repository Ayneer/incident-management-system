import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
    selector: '[incidentFocusStyle]',
})
export class FocusStyleDirective {
    private element = inject(ElementRef);
    color = input<string>('blue');

    @HostListener('focus') onElementFocus() {
        this.element.nativeElement.style.borderColor = this.color();
        this.element.nativeElement.style.boxShadow = this.color() ? `0 0 5px ${this.color()}` : '';
    }

    @HostListener('blur') onElementBlur() {
        this.element.nativeElement.style.borderColor = '';
    }
}