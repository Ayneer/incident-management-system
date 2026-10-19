import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CriticalIncidenDirective } from './critical-incident.directive';

@Component({
  standalone: true,
  imports: [CriticalIncidenDirective],
  template: `
    <div id="incident-critical" [criticalIncident]="true">Incidente Crítico</div>
    <div id="incident-normal" [criticalIncident]="false">Incidente Normal</div>
  `
})
class TestHostComponent {}

describe('CriticalIncidenDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply boxShadow and color when criticalIncident is true', () => {
    const divCritical = fixture.debugElement.query(By.css('#incident-critical')).nativeElement;

    expect(divCritical.style.borderColor).toBe('red');
    expect(divCritical.style.boxShadow).toBe('red 0px 0px 5px');
  });

  it('should not apply boxShadow and color when criticalIncident is false', () => {
    const divNormal = fixture.debugElement.query(By.css('#incident-normal')).nativeElement;

    expect(divNormal.style.borderColor).toBe('');
    expect(divNormal.style.boxShadow).toBe('');
  });
});
