import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarVentaComponent } from './insertar-venta.component';

describe('InsertarVentaComponent', () => {
  let component: InsertarVentaComponent;
  let fixture: ComponentFixture<InsertarVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertarVentaComponent]
    });
    fixture = TestBed.createComponent(InsertarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
