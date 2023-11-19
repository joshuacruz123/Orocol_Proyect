import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadoresFinancierosComponent } from './indicadores-financieros.component';

describe('IndicadoresFinancierosComponent', () => {
  let component: IndicadoresFinancierosComponent;
  let fixture: ComponentFixture<IndicadoresFinancierosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndicadoresFinancierosComponent]
    });
    fixture = TestBed.createComponent(IndicadoresFinancierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
