import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FocusStyleDirective } from './focus-style.directive';

@Component({
  standalone: true,
  imports: [FocusStyleDirective],
  template: ` <div tabindex="0" id="incident-focus" incidentFocusStyle>Incidente focus</div> `,
})
class TestHostComponent {}

describe('FocusStyleDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply boxShadow and blue color when div is focused', () => {
    const divFocus = fixture.debugElement.query(By.css('#incident-focus')).nativeElement;
    divFocus.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(divFocus.style.borderColor).toBe('blue');
    expect(divFocus.style.boxShadow).toBe('blue 0px 0px 5px');
  });

  it('should not apply boxShadow and blue color when div is not focused', () => {
    const div = fixture.debugElement.query(By.css('#incident-focus')).nativeElement;
    div.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(div.style.borderColor).toBe('');
    expect(div.style.boxShadow).toBe('');
  });
});
