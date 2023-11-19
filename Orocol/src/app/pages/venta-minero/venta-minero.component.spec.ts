import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaMineroComponent } from './venta-minero.component';

describe('VentaMineroComponent', () => {
  let component: VentaMineroComponent;
  let fixture: ComponentFixture<VentaMineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentaMineroComponent]
    });
    fixture = TestBed.createComponent(VentaMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
