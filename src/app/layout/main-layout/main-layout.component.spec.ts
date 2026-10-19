import { TestBed } from '@angular/core/testing';
import { MainLayout } from './main-layout.component';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayout],
      providers: [
        provideRouter([]) 
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainLayout);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
