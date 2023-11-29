import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVentaMinComponent } from './editar-venta-min.component';

describe('EditarVentaMinComponent', () => {
  let component: EditarVentaMinComponent;
  let fixture: ComponentFixture<EditarVentaMinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarVentaMinComponent]
    });
    fixture = TestBed.createComponent(EditarVentaMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
