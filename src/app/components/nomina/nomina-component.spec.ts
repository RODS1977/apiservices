import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominaComponent } from './nomina-component';

describe('Nomina', () => {
  let component: NominaComponent;
  let fixture: ComponentFixture<NominaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NominaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
