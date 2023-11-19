import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarVentaComponent } from './gestionar-venta.component';

describe('GestionarVentaComponent', () => {
  let component: GestionarVentaComponent;
  let fixture: ComponentFixture<GestionarVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionarVentaComponent]
    });
    fixture = TestBed.createComponent(GestionarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
