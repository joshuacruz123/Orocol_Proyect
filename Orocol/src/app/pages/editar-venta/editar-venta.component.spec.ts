import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVentaComponent } from './editar-venta.component';

describe('EditarVentaComponent', () => {
  let component: EditarVentaComponent;
  let fixture: ComponentFixture<EditarVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarVentaComponent]
    });
    fixture = TestBed.createComponent(EditarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
