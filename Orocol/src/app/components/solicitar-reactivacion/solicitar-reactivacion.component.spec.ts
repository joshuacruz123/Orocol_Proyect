import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarReactivacionComponent } from './solicitar-reactivacion.component';

describe('SolicitarReactivacionComponent', () => {
  let component: SolicitarReactivacionComponent;
  let fixture: ComponentFixture<SolicitarReactivacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarReactivacionComponent]
    });
    fixture = TestBed.createComponent(SolicitarReactivacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
